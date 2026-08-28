/**
 * 
 * @returns A modal with a form for the user to add Tags to the list of options
 */
'use client'
import {addTag} from "./actions";
import style from "./upload.module.css"


export default function TagModal() {
    var tagFields = [
        {
            label: "Tag Id",
            id: "tagId",
            type: "text",
        },
        {
            label: "Display Name",
            id: "tagName",
            type: "text",
        }
    ]

    return (<div>
        <dialog id="tagDialog">
            <form action={addTag}>
                {
                    tagFields.map((el) => (
                        <div key={el.id} className={style.uploadInput}>
                            <label htmlFor={el.id}>{el.label}</label>
                            <input name={el.id} id={el.id} type={el.type}></input>
                        </div>
                    ))
                }
                <input type="submit"></input>
            </form>
        </dialog>
    </div>)
}