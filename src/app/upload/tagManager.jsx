/**
 * 
 * @returns Input to select from existing Tags and a way to create new ones
 */
'use client'
import AddTag from "./addTagButton";
import { useState, useEffect } from "react"
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default function TagManager() {
    /*
    async function getTags(){
        var res = await process.env.vgx_feed.prepare("SELECT * FROM Tags").run();
        return res.results;
    }
    */
    const [tags, setTags] = useState([]);
    useEffect(() => {
        fetch("/actions/tags/").then((res) => res.json()).then((ans) => {
            setTags(ans.tags)
        });
    }, [])
    return (<div className="groupDataInput">
        <select multiple>
            {
                tags.map((el) => (
                    <option key={el.tagName}>{el.tagDisplay}</option>
                ))
            }

        </select>
        <AddTag></AddTag>
    </div>)

}