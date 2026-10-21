
import {usePathname} from 'next/navigation';
import style from "./navMenu.module.css"

export default function NavMenu({collapse, mobileMenu}){
    //console.log("headers be", headers());
    var pathname = usePathname();
    const routes = [
        {
            route:"/",
            label: "Home"
        },
        {
            route:"/gallery",
            label: "Gallery"
        },
        {
            route:"/collections",
            label: "Albums"
        },
    ]

    return (<ul className={`${collapse ? style.collapse : ""} ${mobileMenu? style.mobileMenu : style.headerMenu}`}>
        {routes.map((el)=>(
            <li key={el.route}><a href={el.route} className={`${el.route == pathname ? style.active :  ""} ${style.link} `}><strong>{el.label}</strong> </a></li>
        ))}
    </ul>)
}