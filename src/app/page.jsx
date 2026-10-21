import Recents from "./recentPosts";
import FeatureCollections from "./featureCollections";
import HeroBanner from "./heroBanner";


export default function Landing() {
    const routes = [
        {
            route: "/gallery",
            label: "Gallery",
            desc: "Browse Works"
        },
        {
            route: "/collections",
            label: "Albums",
            desc: "Browse Categories"
        },
        {
            route: "/",
            label: "News",
            desc: "See recent news regarding Vndergraphx"
        }
    ]
    return (
        <div>
            <h3 style={{width:"100%", textAlign: "center"}}> - Main Menu - </h3>
            <ul className="mainMenu">
                {routes.map((el) => (
                    <li key={el.route} className="mainMenuItem">
                        <a href={el.route}>
                            <h3><strong>{el.label}</strong></h3>
                            <p style={{whiteSpace: "pre"}} className="menuItemDesc">
                                {"\t"+el.desc}
                            </p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}