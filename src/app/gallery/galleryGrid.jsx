/**
 * 
 * @returns A grid of the items listed in the gallery database
 */

export default async function GalleryGrid() {
    //TO-DO Handle filtering
      async function fetch(request, env) {
        const result = await process.env.
            vgx_feed.prepare(
                "SELECT * FROM Tags",
            ).run();
        return new Response(JSON.stringify(result));
    }
    console.log("Testing, testing")
    console.log("Hye look", fetch({}))
    return (<>

    </>)
}