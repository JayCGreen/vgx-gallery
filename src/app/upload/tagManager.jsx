/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import AddTag from "./addTagButton"
import {getTags} from "./actions"

export default async function TagManager(){
    var tags = await getCloudflareContext(true).env.vgx_feed.prepare("SELECT * FROM Tags").run();
    return (<></>);
    /*
    return (<div className="groupDataInput">
        <select multiple>
            {getTags().then((em) => em.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            )))}

        </select>
        <AddTag></AddTag>
    </div>)
    */
}