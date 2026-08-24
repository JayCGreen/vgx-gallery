import PostInfo from "./postInfo"

export default async function Post({params}){
    const {id} = await params;
    return(<>
        <PostInfo postId={id}></PostInfo>
    </>)
}