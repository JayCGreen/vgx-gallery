/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
import AddCollectionButton from "./addCollectionButton";
import {getCollections} from "./actions"

export default async function CollectionManager(){
    //var collections = await getCloudflareContext({async: true}).env.vgx_feed.prepare("SELECT * FROM Collections").run()

    return (<div className="groupDataInput">
        <select>
            {getCollections().then((em)=>em.map((el)=>(
                <option key={el.collectionName}>{el.collectionDisplay}</option>
            )))}
        </select>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}