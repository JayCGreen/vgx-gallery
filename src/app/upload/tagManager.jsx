/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import AddTag from "./addTagButton"

export default async function TagManager(){
    var tags = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Tags").run();
    console.log("yoooo", tags)
    return (<div className="groupDataInput">
        <select multiple>
            {tags.results.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            ))}

        </select>
        <AddTag></AddTag>
    </div>)
}