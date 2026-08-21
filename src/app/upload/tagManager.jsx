/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import AddTag from "./addTagButton"
import {getTags} from "./actions"

export default async function TagManager({tags}){
    //var tags = await getCloudflareContext(true).env.vgx_feed.prepare("SELECT * FROM Tags").run();
    console.log("tags be ", tags)
    //return (<></>);
    
    return (<div className="groupDataInput">
        <select multiple>
            {tags.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            ))}

        </select>
        <AddTag></AddTag>
    </div>)
    
}