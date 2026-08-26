
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function FeaturedCollections() {
    //Get 3 Collections, will sort out how we get them another time
    const { env } = await getCloudflareContext({ async: true });
    const collections = (await env.vgx_feed.prepare(
        "SELECT * FROM Collections LIMIT 3"
    ).run()).results;
    console.log("colllection be",  collections)
    return (
    <>
    <h3>Collections</h3>
    <ul className="homeCollectionsList">
        {collections.map((el)=>(
            <li key={`collection${el.collectionId}`}className="homeCollectionItem" >
                <a>
                    <h4 style={{textAlign: "center"}}>{el.collectionDisplay}</h4>
                </a>
            </li>
        ))}
    </ul>
    </>)
}