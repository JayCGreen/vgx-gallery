'use client'
export default function AddTag() {
    
    return (<div>
        <button type="button" onClick={() =>
            {document.getElementById("tagDialog").showModal()}
        }>Create New Tag</button>
    </div>)
}