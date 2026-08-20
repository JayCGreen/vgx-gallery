
'use server'

import {getCloudflareContext} from "@opennextjs/cloudflare";

export async function addTag(formData){
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Tags (tagName, tagDisplay) VALUES (?, ?)").bind(formData.get("tagId"), formData.get("tagName")).run();
    //var res = await getCloudflareContext().env.vgx_feed.prepare("Select * from Tags").run();
    console.log("Data Ran" + JSON.stringify(res.results))
}

export async function addCollection(formData){
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Collections (collectionName, collectionDisplay) VALUES (?, ?)").bind(formData.get("collectionId"), formData.get("collectionName")).run();
    //var res = await getCloudflareContext().env.vgx_feed.prepare("Select * from Tags").run();
    console.log("Data Ran" + JSON.stringify(res.results))
}