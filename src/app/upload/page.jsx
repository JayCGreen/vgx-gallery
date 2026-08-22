/**
 * 
 * @returns Page that handles uploads to R2 as well as creations of new Tags and Collections
 */
import TagManager from "./tagManager";
import CollectionManager from "./collectionManager"
import TagModal from "./tagModal";
import CollectionModal from "./collectionModal";
import { addPost } from "./actions"


export default function Uploader() {

    var inputFields = [
        {
            label: " Title",
            id: "title",
            type: "text",
            name: "postTitle"
        },
        {
            label: "File",
            id: "file",
            type: "file",
            name: "postFile"
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

    return (
        <div className="uploadPage">
            <form className="uploadForm" action={addPost}>
                {
                    inputFields.map((el) => (
                        <div key={el.id} className="uploadInput">
                            <label htmlFor={el.id}>{el.label}</label>
                            {el.textArea ? <textarea name={el.name} id={el.id} style={el.style}></textarea> : <input name={el.name} id={el.id} style={el.style} type={el.type}></input>}
                        </div>
                    ))
                }
                <TagManager></TagManager>
                <CollectionManager></CollectionManager>
                <input type="submit"></input>
            </form>
            <TagModal></TagModal>
            <CollectionModal></CollectionModal>

        </div>
    )
}