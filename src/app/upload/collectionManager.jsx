/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import AddCollectionButton from "./addCollectionButton";

export default async function CollectionManager(){
    var collections = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Collections").run()
    return (<div className="groupDataInput">
        <select>
            {collections.results.map((el)=>(
                <option key={el.collectionName}>{el.collectionDisplay}</option>
            ))}
        </select>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}