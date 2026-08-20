/**
 * 
 * @returns A modal with a form for the user to add Tags to the list of options
 */
'use client'
import {addCollection} from "./actions"

export default function CollectionModal() {
    var collectionFields = [
        {
            label: "Collection Id",
            id: "collectionId",
            type: "text",
        },
        {
            label: "Display Name",
            id: "collectionName",
            type: "text",
        }
    ]

    return (<div>
        <dialog id="collectionDialog">
            <form action={addCollection}>
                {
                    collectionFields.map((el) => (
                        <div key={el.id} className="uploadInput">
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