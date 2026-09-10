import style from "./pillbox.module.css"

export default function PillBox({ editable, group, setGroup }) {
    return (<div className={style.pillbox}>
        {
            group.map((el) => (
                <div key={el.tagName || el.collectionName} className={style.pill }>
                    {editable ? <button onClick={(e) => {
                        console.log(e);
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