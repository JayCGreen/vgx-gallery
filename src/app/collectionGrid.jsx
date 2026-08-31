
import style from "./collectionGrid.module.css"

export default async function CollectionGrid({ items }) {

    return (
        <>
            <ul className={style.collectionsList}>
                {items.map((el) => (
                    <li key={`collection${el.collectionId}`} className={style.collectionItemContainer} >
                        <a href={`posts?c=${el.collectionId}`} className={style.collectionItem}>
                            {el.source ? <div className={style.collectionCover}>
                            <img className={style.collectionImage} src={el.source}></img>
                        </div> : null}
                            <h4 style={{ textAlign: "center" }}>{el.collectionDisplay}</h4>
                        </a>
                    </li>
                ))}
            </ul>
        </>)
}