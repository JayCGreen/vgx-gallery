'use client'
export default function AddCollectionButton() {
    
    return (<div>
        <button type="button" onClick={() =>
            {document.getElementById("collectionDialog").showModal()}
        }>Create New Collection</button>
    </div>)
}