/**
 * 
 * @returns Input to select from existing COllections and a way to create new ones
 */
'use client'
import AddCollectionButton from "./addCollectionButton";
import { useState, useEffect } from "react";
import style from "./upload.module.css"
import PillBox from "../pillbox";

export default function CollectionManager(){
    /*
    const {env} = await getCloudflareContext({async:true});
    const collections = (await env.vgx_feed.prepare("SELECT * FROM Collections").run()).results
    */

       const [collectionSearch, setCollectionSearch] = useState("");
       const [dbCollection, setDbCollection] = useState("");
       const [collectionList, setCollectionList] = useState([])
       const [selectedCollections, setSelectedCollections] = useState([])
       useEffect(() => {
           const dbTimer = setTimeout(async () => {
               console.log("the search be", collectionSearch)
               setDbCollection(collectionSearch);
               var list = await fetch("actions/collections?search="+collectionSearch).then((res) => res.json()).then((ans) => ans)
               setCollectionList(list?.collections || []);
           }, 300);
           return () => {
               clearTimeout(dbTimer)
           }
       }, [collectionSearch])
       const collections = [];
       console.log(collectionList)

    return (<div className={style.groupDataInput}>
        <div
            onFocus={() => {
                document.getElementById("tester2").style.display = "flex"
            }
            }
            onBlur={() => {
                document.getElementById("tester2").style.display = "none"
            }}>
                <label htmlFor="collectionSearch">Collections</label>
            <input htmlFor="collectionSearch" className={style.groupSearcher} type="text" name="postCollections" value={collectionSearch} onChange={(ev) => {
                setCollectionSearch(ev.target.value)
            }
            }

            ></input>
            <div style={{ width: "100%", position: "relative" }}>
                <ul id="tester2" className={style.groupSelector}>
                    {
                        collectionList.filter((el) => !(selectedCollections.includes(el)))?.map((el) => (
                            <li key={el.collectionName} value={el.collectionId}><button onClick={() => {
                                console.log("just got hit")
                                setSelectedCollections([...selectedCollections, el])
                            }}>{el.collectionDisplay}</button></li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <PillBox editable={true} group={selectedCollections} setGroup={setSelectedCollections}></PillBox>
        <input name="postCollections" type="hidden" value={selectedCollections.map((el)=>el.collectionId).join()}></input>
        <AddCollectionButton></AddCollectionButton>
    </div>)
}