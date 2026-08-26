import PostBlock from "./postInfo"

export default async function Post({params}){
    const {id} = await params;
    return(<>
        <PostBlock postId={id}></PostBlock>
    </>)
}