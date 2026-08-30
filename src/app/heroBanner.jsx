 import { getCloudflareContext } from "@opennextjs/cloudflare";
 import style from "./banner.module.css";

 export default async function HeroBanner({type, id}){
   
   const {env} = await getCloudflareContext({await:true});
   const banner = (await env.vgx_feed.prepare(
        "SELECT * from Banners WHERE collection = ?"
    ).bind(id).run()).results;
    if (banner.length ==0 ){
      return;
    }
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media WHERE mediaId = ?"
    ).bind(banner[0].media).run()).results;
    if (mediaList.length > 0) {
        var mediaUrl = await env.vgx_r2?.get(mediaList[0].r2Id);
        var contentType = mediaUrl?.httpMetadata.contentType;
        var uri = await mediaUrl.arrayBuffer();
    }
    return (
      <div className={style.banner}>
         <img src={`data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`}>
         </img>
      </div>
    )
 }