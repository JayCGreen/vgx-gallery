/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import AddTag from "./addTagButton"
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function TagManager(){
    async function getTags(){
        var ob = {async: true}
        var res = await getCloudflareContext(ob).env?.vgx_feed?.prepare("SELECT * FROM Tags").run();
        return res?.results || [];
    }
    return (<div className="groupDataInput">
        <select multiple>
            {getTags().then((em) => em.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            )))}

        </select>
        <AddTag></AddTag>
    </div>)
    
}