
'use server'

import {getCloudflareContext} from "@opennextjs/cloudflare";

export async function addTag(formData){
    console.log("data be", formData);
    var res = await getCloudflareContext().env.vgx_feed.prepare("INSERT INTO Tags (tagName, tagDisplay) VALUES (?, ?)").bind(formData.tagId, formData.tagName).run();
    console.log("Data Ran")
}