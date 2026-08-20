'use client'
export default function AddTag() {
    
    return (<div>
        <button type="button" onClick={() =>
            {document.getElementById("tagDialog").showModal()}
        }>Add Tag</button>
    </div>)
}