
'use server'

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function addTag(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Tags (tagName, tagDisplay) VALUES (?, ?)").bind(formData.get("tagId"), formData.get("tagName")).run();
    console.log("Tag Uploaded")
}

export async function addCollection(formData) {
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Collections (collectionName, collectionDisplay) VALUES (?, ?)").bind(formData.get("collectionId"), formData.get("collectionName")).run();
    console.log("Collection Uploaded")
}

export async function addPost(formData) {
    try {
        //Check the key to see if it matches the passwork
        console.log("file formData looks like ", formData.get("createdDate"), formData)
        if (formData.get("postKey") == "X-Mas") {
            const { env } = getCloudflareContext()
            const db = env.vgx_feed;
            //Insert post into table
            var post = await db.prepare("INSERT INTO Posts (title, description, r2Id, contentType,  uploadDate, createdDate, active) VALUES (?, ?, ?, ?, datetime('now','localtime'), ?,  1) RETURNING *")
                .bind(
                    formData.get("postTitle"),
                    formData.get("postDesc"),
                    formData.get("postFile").name,
                    formData.get("postFile").type,
                    formData.get("createdDate")

                ).run();
            var postId = post.results[0].postId
            //Media Handling
            if (formData.get("postFile").size > 0) {
                //Insert file into R2
                const r2 = env.vgx_r2;
                r2.put(formData.get("postFile").name, formData.get("postFile"))
            }
            //Insert tag and collection relationships
            var tagList = formData.getAll("postTags")
            var tagArr = tagList[tagList.length - 1].split(",");
            if (tagArr) {
                tagArr.forEach((el) => {
                    db.prepare("INSERT INTO PostTags (post, tag) VALUES (?, ?)")
                        .bind(
                            postId,
                            el
                        ).run();
                })

            }
            var collList = formData.getAll("postCollections")
            var collArr = collList[collList.length - 1].split(",");
            if (collArr) {
                collArr.forEach((el) => {
                    db.prepare("INSERT INTO CollectionPosts (post, collection) VALUES (?, ?)")
                        .bind(
                            postId,
                            el
                        ).run();
                })

            }
            console.log("Upload Complete")
        }
        
        else {
            //Throw error

        }
    }
    catch (e) {
        console.log(e)
    }
}