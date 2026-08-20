/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function CollectionManager(){
    var tags = await getCloudflareContext().env.vgx_feed.exec("SELECT * FROM Collections")
    return (<div>
        <select>

        </select>
        <button >Add Collections</button>
        <dialog >
            <h3>
                Hey this works at least
            </h3>
        </dialog>
    </div>)
}