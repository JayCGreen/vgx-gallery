
import GalleryGrid from "./galleryGrid"
export default async function Gallery({ searchParams }){
    const filters = (await searchParams);
    return(<div>
                <h3 style={{textAlign:"center"}}>~ Gallery ~</h3>
        <GalleryGrid searchParams={filters}></GalleryGrid>
    </div>)
}