'use client'
import { Folder } from "@deemlol/next-icons";
import { useSearchParams } from 'next/navigation';
export default function GalleyrFilter({collection}){
    const searchParams = useSearchParams()
    const currColl = searchParams.get("c")
    return (
        <>
            <h4 style={{ }}> Gallery</h4>
            <h2 style={{ }}><Folder/> <select style={{fontSize: "inherit", background: "none", border: "none"}} onChange={(val)=>{console.log("value be",val);window.location.href = parseInt(val.target.value) ? `gallery?c=${val.target.value}` : `gallery`}}>
                    <option value="0" selected={!currColl}>All</option>
                    {collection.map((group)=>(
                        <option key={`coll${group.collectionId}`} value={group.collectionId} selected={currColl==group.collectionId}>{group.collectionDisplay}</option>
                    ))}
                </select></h2>
        </>
    )
}