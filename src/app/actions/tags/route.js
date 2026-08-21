import {getCloudflareContext} from "@opennextjs/cloudflare";
export async function GET(request) {
  console.log("Hey did this get hit")
  const tags = await getCloudflareContext().env.vgx_feed.prepare("SELECT * FROM Tags").run();
  console.log ("tags be ", tags.results)
  return Response.json({tags: tags.results});
}