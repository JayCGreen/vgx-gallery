
'use server'

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function addTag(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Tags (tagName, tagDisplay) VALUES (?, ?)").bind(formData.get("tagId"), formData.get("tagName")).run();
    console.log("Tag Uploaded")
}

export async function addCollection(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Collections (collectionName, collectionDisplay) VALUES (?, ?)").bind(formData.get("collectionId"), formData.get("collectionName"), new Date()).run();
    console.log("Collection Uploaded")
}

export async function addPost(formData) {
    try {
        //Check the key to see if it matches the passwork
        console.log("file formData looks like ", formData.get("postFile"))
        if (formData.get("postKey") == "X-Mas") {
            const { env } = getCloudflareContext()
            const db = env.vgx_feed;
            //Insert post into table
            var post = await db.prepare("INSERT INTO Post (title, desc, postDate) VALUES (?, ?, datetime('now','localtime')) RETURNING *")
                .bind(
                    formData.get("postTitle"),
                    formData.get("postDesc")
                ).run();
            var postId = post.results[0].postId

            //Media Handling
            if (formData.get("postFile").size > 0) {
                //Insert file into R2
                const r2 = env.vgx_r2;
                r2.put(formData.get("postFile").name, formData.get("postFile"))
                //Insertfile into Media table
                db.prepare("INSERT INTO Media (r2Id, fileName, uploadDate, post) VALUES (?, ?, datetime('now', 'localtime'), ?)")
                    .bind(
                        formData.get("postFile").name,
                        formData.get("postFile").name,
                        postId
                    ).run();
                console.log("End of the updload")
            }
            //Insert tag and collection relationships
            if (formData.get("postTags")) {
                console.log("Tag format is ", formData.getAll("postTags"))
                formData.getAll("postTags").forEach((el) => {
                    db.prepare("INSERT INTO PostTags (post, tag) VALUES (?, ?)")
                        .bind(
                            postId,
                            el
                        ).run();
                })
            }
            if (formData.get("postCollections")) {
                console.log("Collection format is", formData.get("postCollections"))
                //Prob want that multi deal here too
                db.prepare("INSERT INTO CollectionPosts (post, collection) VALUES (?, ?)")
                    .bind(
                        postId,
                        formData.get("postCollection")
                    ).run();
                    
            }

        }
        else {
            //Throw error

        }
    }
    catch (e) {
        console.log(e)
    }
}