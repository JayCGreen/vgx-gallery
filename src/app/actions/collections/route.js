import {getCloudflareContext} from "@opennextjs/cloudflare";
export async function GET(request, {params}) {
  const s = await params;
  const searchParams = request.nextUrl.searchParams;
  console.log("oi look at me", searchParams.get("search"))
  const collections = await getCloudflareContext().env.vgx_feed.prepare(`SELECT * FROM Collections WHERE collectionDisplay LIKE '${searchParams.get("search")}%'`).bind().run();
  return Response.json({collections: collections.results});
}