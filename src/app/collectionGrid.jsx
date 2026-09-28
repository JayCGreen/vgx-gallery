
import style from "./collectionGrid.module.css"

export default async function CollectionGrid({ items }) {
    var count = [1, 2, 3, 4];

    return (
        <>
            <ul className={style.collectionsList}>
                {items.map((el) => (
                    <li key={`collection${el.collectionId}`} className={style.collectionItemContainer} >
                        <a href={`gallery?c=${el.collectionId}`} className={style.collectionItem}>
                            <div className={`${style.card} ${style.topCard}`} style={{ "--i": 0 }}>
                                {el.source ? <div className={style.collectionCover}>
                                    <img className={style.collectionImage} src={el.source}></img>
                                </div> : null}
                                <h4 style={{ textAlign: "center" }}>{el.collectionDisplay}</h4>
                            </div>
                            {count.map((c) => (
                                <div key={`bc${c}_collection${el.collectionId}`} className={style.card} style={{ "--i": c }}></div>
                            ))}
                        </a>
                    </li>
                ))}
            </ul>
        </>)
}