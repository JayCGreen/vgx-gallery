import Recents from "./recentPosts";
import FeatureCollections from "./featureCollections";
import HeroBanner from "./heroBanner";


export default function Landing(){
    //put in a check for the age, if not then redirect

    return (
        <div>
            <Recents></Recents>
            <FeatureCollections></FeatureCollections>
        </div>
    )
}