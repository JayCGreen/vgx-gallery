'use server'

import {getCloudflareContext} from "@opennextjs/cloudflare";

export async function getCollections(){
    var res = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Collections").run()
    //var res = await getCloudflareContext().env.vgx_feed.prepare("Select * from Tags").run();
    return res.results;
}

export async function getTags(){
    var res = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Tags").run();
    return res.results;
}

