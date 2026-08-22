
'use server'

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function addTag(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Tags (tagName, tagDisplay) VALUES (?, ?)").bind(formData.get("tagId"), formData.get("tagName")).run();
    //var res = await getCloudflareContext().env.vgx_feed.prepare("Select * from Tags").run();
    console.log("Data Ran" + JSON.stringify(res.results))
}

export async function addCollection(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Collections (collectionName, collectionDisplay) VALUES (?, ?)").bind(formData.get("collectionId"), formData.get("collectionName"), new Date()).run();
    //var res = await getCloudflareContext().env.vgx_feed.prepare("Select * from Tags").run();
    console.log("Data Ran" + JSON.stringify(res.results))
}

export async function addPost(formData) {
    try {
        //Check the key to see if it matches the passwork
        console.log("file formData looks like ", formData.get("postFile"))
        if (formData.get("postKey") == "X-Mas") {
            const db = await getCloudflareContext().env.vgx_feed;
            //Insert post into table
            var post = await db.prepare("INSERT INTO Post (title, desc, postDate) VALUES (?, ?, datetime('now','localtime')) RETURNING *")
                .bind(
                    formData.get("postTitle"),
                    formData.get("postDesc")
                ).run();
            var postId = post.results[0].postId
            //Insert file into Media table
            console.log("Do I get something to work with ", post)
            if (formData.get("postFile")) {
                console.log("Do I get something to work with in the media ", formData.get("postFile"))
                //Insert file into R2
                const r2 = await getCloudflareContext().env.vgx_r2;
                var r2Upload = await r2.put(formData.get("postFile").name, formData.get("postFile").arrayBuffer())
                //
                var media = await db.prepare("INSERT INTO Media (r2Id, fileName, uploadDate, post) VALUES (?, ?, datetime('now', 'localtime'), ?)")
                    .bind(
                        formData.get("postFile").name,
                        formData.get("postFile").name,
                        postId
                    ).run();
            }
            //Insert tag and collection relationships
            if (formData.get("postTags")) {

            }
            if (formData.get("postCollection")) {

            }

        }
        else {
            //Throw error
        }
    }
    catch (e) {

    }
}