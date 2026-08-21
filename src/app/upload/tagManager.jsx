/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
import AddTag from "./addTagButton"
import {getTags} from "../actions"

export default async function TagManager(){
    var tags = await getTags();
    console.log(tags)
    return (<div className="groupDataInput">
        <select multiple>
            {tags.map((el)=>(
                <option key={el.tagName}>{el.tagDisplay}</option>
            ))}

        </select>
        <AddTag></AddTag>
    </div>)
}