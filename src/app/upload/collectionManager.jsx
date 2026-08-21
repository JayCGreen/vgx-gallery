/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
'use client'
import AddCollectionButton from "./addCollectionButton";
import {getCollections} from "./actions"
import { useState, useEffect } from "react"

export default function CollectionManager(){
    //var collections = await getCloudflareContext({async: true}).env.vgx_feed.prepare("SELECT * FROM Collections").run()
    const [collections, setCollections] = useState([]);
    useEffect(() => {
            fetch("/actions/collections/").then((res) => res.json()).then((ans) => {
                setCollections(ans.collections)
            });
        }, [])

    return (<div className="groupDataInput">
        <select>
            {collections.map((el)=>(
                <option key={el.collectionName}>{el.collectionDisplay}</option>
            ))}
        </select>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}