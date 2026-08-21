/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function GalleryGrid() {
    const {env} =  getCloudflareContext({async:true});
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
    return (<>

    </>)
}