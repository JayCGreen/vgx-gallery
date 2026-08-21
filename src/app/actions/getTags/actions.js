import {getCloudflareContext} from "@opennextjs/cloudflare";
export default async function GET(request) {
    console.log("Hey did this get hit")
  const tags = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Tags").run();
  return new Response(tags);
}