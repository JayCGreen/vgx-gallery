import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    var media = await getCloudflareContext().env.vgx_r2?.get(searchParams.get("id"));
    return new Response(media.body);
}