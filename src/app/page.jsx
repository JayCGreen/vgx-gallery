import Recents from "./recentPosts";
import FeatureCollections from "./featureCollections";
import HeroBanner from "./heroBanner";
import { ArrowRightBigDash, Book, Image, MessageCircle } from "@deemlol/next-icons";

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
    function iconGrabber(button) {
        switch (button) {
            case "Gallery":
                return (<Image />)
            case "Albums":
                return (<Book />)
            case "News":
                return (<MessageCircle />)
        }
    }
    return (
        <main>
            <h3 style={{ width: "100%", textAlign: "center", color: "var(--background)" }}> - Main Menu - </h3>
            <ul className="mainMenu">
                {routes.map((el) => (
                    <li key={el.route} className="mainMenuItem">
                        <a href={el.route} style={{ whiteSpace: "pre", color: "var(--background)", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div>
                                <h3 style={{ color: "var(--accent2)", display: "flex", alignItems: "center", gap: "1%" }}>{iconGrabber(el.label)} <strong>{el.label}</strong></h3>
                                <p style={{ whiteSpace: "pre" }} className="menuItemDesc">
                                    {"\t" + el.desc}
                                </p>
                            </div>
                            <ArrowRightBigDash />
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    )
}