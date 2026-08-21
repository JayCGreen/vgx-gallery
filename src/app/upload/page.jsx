/**
 * 
 * @returns Page that handles uploads to R2 as well as creations of new Tags and Collections
 */
import TagManager from "./tagManager";
import CollectionManager from "./collectionManager"
import TagModal from "./tagModal";
import CollectionModal from "./collectionModal";


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
            style: {height: "2rem", width: "100%"},
            textArea: true
        }
    ]

    return (
        <div className="uploadPage">
        <form className="uploadForm">
            {
                inputFields.map((el) => (
                    <div key={el.id} className="uploadInput">
                        <label htmlFor={el.id}>{el.label}</label>
                        {el.textArea ?  <textarea id={el.id} style={el.style}></textarea> : <input id={el.id} style={el.style} type={el.type}></input>}
                    </div>
                ))
            }
            <TagManager></TagManager>
            <CollectionManager></CollectionManager>
        </form>
        <TagModal></TagModal>
        <CollectionModal></CollectionModal>

        </div>
    )
}