/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function GalleryGrid() {
    const {env} =  await getCloudflareContext({async:true});
    const test = await env.vgx_feed.prepare(
                "SELECT * FROM Tags"
            ).run()
    /*
    //TO-DO Handle filtering
      async function grab() {
        const result = await getCloudflareContext().env.
            vgx_feed.exec(
                "SELECT * FROM Tags"
            )
        return new Response(JSON.stringify(result));
    }
    console.log("Testing, testing")
    grab().then((el)=>console.log("see me after class"))
    */
   console.log("blinded by te light", test)
    return (<>

    </>)
}