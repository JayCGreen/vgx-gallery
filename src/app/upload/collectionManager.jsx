/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
import AddCollectionButton from "./addCollectionButton";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function CollectionManager(){
    const {env} = await getCloudflareContext({async:true});
    const collections = (await env.vgx_feed.prepare("SELECT * FROM Collections").run()).results

    return (<div className="groupDataInput">
        <select>
            {collections.map((el)=>(
                <option key={el.collectionName}>{el.collectionDisplay}</option>
            ))}
        </select>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}