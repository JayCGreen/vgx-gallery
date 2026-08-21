/**
 * 
 * @returns Page that handles uploads to R2 as well as creations of new Tags and Collections
 */
import TagManager from "./tagManager";
import CollectionManager from "./collectionManager"
import TagModal from "./tagModal";
import CollectionModal from "./collectionModal";
import {getTags} from "./actions"

export default function Uploader() {

    var inputFields = [
        {
            label: " Title",
            id: "title",
            type: "text",
        },
        {
            label: "File",
            id: "file",
            type: "file",
        },
        {
            label: "Description",
            id: "desc",
            type: "text",
        }
    ]

    return (
        <div className="uploadPage">
        <form className="uploadForm">
            {
                inputFields.map((el) => (
                    <div key={el.id} className="uploadInput">
                        <label htmlFor={el.id}>{el.label}</label>
                        <input id={el.id} type={el.type}></input>
                    </div>
                ))
            }
            <TagManager></TagManager>
        </form>
        <TagModal tags={getTags}></TagModal>
        <CollectionModal></CollectionModal>

        </div>
    )
}