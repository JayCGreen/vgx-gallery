/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import AddTag from "./addTagButton"
import {getTags} from "./actions"
import {getCloudflareContext} from "@opennextjs/cloudflare";

export default async function TagManager(){
    var tags  = await getCloudflareContext(true).env.vgx_feed.prepare("SELECT * FROM Tags").run();
    return (<div className="groupDataInput">
        <select multiple>
            {tags.results?.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            ))}

        </select>
        <AddTag></AddTag>
    </div>)
    
}