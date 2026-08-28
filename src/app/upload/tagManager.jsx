/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */

import AddTag from "./addTagButton";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./upload.module.css"


export default async function TagManager() {
    const {env} = await getCloudflareContext({async:true});
    const tags = (await env.vgx_feed.prepare("SELECT * FROM Tags").run()).results

    return (<div className={style.groupDataInput}>
        <select name="postTags" multiple>
            {
                tags.map((el) => (
                    <option key={el.tagName} value={el.tagId}>{el.tagDisplay}</option>
                ))
            }

        </select>
        <AddTag></AddTag>
    </div>)

}