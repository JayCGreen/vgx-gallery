/**
 * 
 * @returns Page that handles uploads to R2 as well as creations of new Tags and Collections
 */
'use client'
import TagManager from "./tagManager";
import CollectionManager from "./collectionManager"
import TagModal from "./tagModal";
import CollectionModal from "./collectionModal";
import { addPost } from "./actions"
import style from "./upload.module.css"
import {useState} from "react"


export default function Uploader() {
    const [preview, setPreview] = useState();

    var inputFields = [
        {
            label: " Title",
            id: "title",
            type: "text",
            name: "postTitle"
        },
        {
            label: "Created Date",
            id: "created",
            type: "date",
            name: "createdDate"
        },
        {
            label: "Description",
            id: "desc",
            type: "text",
            style: { height: "2rem", width: "100%" },
            textArea: true,
            name: "postDesc"
        },
        {
            label: "Key",
            id: "key",
            type: "password",
            name: "postKey"
        }
    ]
    console.log("preview is ", preview)

    return (
        <div className={style.uploadPage}>
            <form className={style.uploadForm} action={addPost}>
                <div>
                <input name="postFile" type="file" onChange={(el)=>{
                    setPreview(URL.createObjectURL(el.target.files[0]))
                }}></input>
                <img style={{width: 300,}}src={preview}></img>
                </div>
                {
                    inputFields.map((el) => (
                        <div key={el.id} className={style.uploadInput}>
                            <label htmlFor={el.id}>{el.label}</label>
                            {el.textArea ? <textarea name={el.name} id={el.id} style={el.style}></textarea> : <input name={el.name} id={el.id} style={el.style} type={el.type} autoComplete={"off"}></input>}
                            
                        </div>
                    ))
                }
                <TagManager></TagManager>
                <CollectionManager></CollectionManager>
                <input className={style.submitButton} type="submit" value="Post It!"></input>
            </form>
            <TagModal></TagModal>
            <CollectionModal></CollectionModal>

        </div>
    )
}