import style from "./pillbox.module.css"

export default function PillBox({ editable, group, setGroup }) {
    return (<div className={style.pillbox}>
        <h4 style={{margin: "unset", alignContent: "center"}}>{group[0].tagName ? "Tags" : "Collections"}: </h4>
        {
            
            group.map((el) => (
                <div key={el.tagName || el.collectionName} className={style.pill }>
                    {editable ? <button onClick={(e) => {

                        setGroup(group.filter((a) => el != a))
                    }}>X</button> : null}
                    <span>
                        {el.tagDisplay || el.collectionDisplay}
                    </span>
                </div>
            ))
        }
    </div>)
}