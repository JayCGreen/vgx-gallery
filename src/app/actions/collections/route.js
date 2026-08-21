import {getCloudflareContext} from "@opennextjs/cloudflare";
export async function GET(request) {
  const collections = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Collections").run();
  return Response.json({collections: collections.results});
}