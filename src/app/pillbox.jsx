import style from "./pillbox.module.css"

export default function PillBox({ editable, group, setGroup }) {
    return (<div className={style.pillbox}>
        {group[0] && (group[0].tagName || group[0].collectionName) ?
            <h4 style={{ margin: "unset", alignContent: "center" }}>{group[0]?.tagName ? "Tags" : "Collections"}: </h4> : null
        }
        {

            group.map((el) => (
                <div key={el.tagName || el.collectionName} className={style.pill}>
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