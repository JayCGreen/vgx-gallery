/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
'use client'
import AddTag from "./addTagButton";
import { useState, useEffect } from "react";
import style from "./upload.module.css"
import PillBox from "../pillbox";


export default function TagManager() {
    /*
    const { env } = await getCloudflareContext({ async: true });
    const tags = (await env.vgx_feed.prepare("SELECT * FROM Tags").run()).results
    */
    const [tagSearch, setTagSearch] = useState("");
    const [dbTag, setDbTag] = useState("");
    const [tagList, setTagList] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    useEffect(() => {
        const dbTimer = setTimeout(async () => {
            console.log("the search be", tagSearch)
            setDbTag(tagSearch);
            var list = await fetch("actions/tags").then((res) => res.json()).then((ans) => ans)
            setTagList(list?.tags || []);
        }, 300);
        return () => {
            clearTimeout(dbTimer)
        }
    }, [tagSearch])
    const tags = [];
    console.log(tagList)


    return (<div className={style.groupDataInput}>
        <div
            onFocus={() => {
                document.getElementById("tester").style.display = "flex"
            }
            }
            onBlur={() => {
                document.getElementById("tester").style.display = "none"
            }}>
                <label htmlFor="tagSearch">Tags</label>
            <input id="tagSearch" className={style.groupSearcher} type="text" name="postTags" value={tagSearch} onChange={(ev) => {
                setTagSearch(ev.target.value)
            }
            }

            ></input>
            <div style={{ width: "100%", position: "relative" }}>
                <ul id="tester" className={style.groupSelector}>
                    {
                        tagList.filter((el) => !(selectedTags.includes(el)))?.map((el) => (
                            <li key={el.tagName} value={el.tagId}><button onClick={() => {
                                console.log("just got hit")
                                setSelectedTags([...selectedTags, el])
                            }}>{el.tagDisplay}</button></li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <PillBox editable={true} group={selectedTags} setGroup={setSelectedTags}></PillBox>
        <input name="postTags" type="hidden" value={selectedTags.map((el)=>el.tagId).join()}></input>
        <AddTag></AddTag>
    </div>)

}