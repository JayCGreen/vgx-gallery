/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import AddTag from "./addTag"

export default async function TagManager(){
    var tags = await getCloudflareContext().env.vgx_feed.exec("SELECT * FROM Tags")
    return (<div>
        <select>

        </select>
        <AddTag></AddTag>
    </div>)
}