/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function GalleryGrid() {
    //TO-DO Handle filtering
      async function grab() {
        const result = await getCloudflareContext().env.
            vgx_feed.prepare(
                "SELECT * FROM Tags"
            ).run()
        return new Response(JSON.stringify(result));
    }
    console.log("Testing, testing")
    grab().then((el)=>console.log("see me after class"))
    return (<>

    </>)
}