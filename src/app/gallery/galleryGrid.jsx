/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function GalleryGrid() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Post ORDER BY julianday(postDate) DESC"
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media"
    ).run()).results;

    return (<div className="galleryGrid">
        {postList.map(async (post) => {
            var media = mediaList.filter((el)=>{
                return el.post == post.postId
            })
            //Get the media Url
            var uri;
            if(media.length > 0)
            {
                
                var mediaUrl = await env.vgx_r2?.get(media[0].r2Id);
                var contentType = mediaUrl.httpMetadata.contentType;
                uri = await mediaUrl.arrayBuffer();
            }
            return (
                <div key={`post${post.postId}`} className="gridPost">
                    {uri ? <img src={`data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`}></img> :<></>}
                </div>
            )
        })}
        </div>)
}

