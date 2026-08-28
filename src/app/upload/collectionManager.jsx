/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
import AddCollectionButton from "./addCollectionButton";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./upload.module.css"

export default async function CollectionManager(){
    const {env} = await getCloudflareContext({async:true});
    const collections = (await env.vgx_feed.prepare("SELECT * FROM Collections").run()).results

    return (<div className={style.groupDataInput}>
        <select name="postCollections" multiple>
            {collections.map((el)=>(
                <option key={el.collectionName} value={el.collectionId}>{el.collectionDisplay}</option>
            ))}
        </select>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}