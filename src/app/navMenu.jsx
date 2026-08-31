
'use client';
import {usePathname} from 'next/navigation';

export default function NavMenu(){
    //console.log("headers be", headers());
    var pathname = usePathname();
    const routes = [
        {
            route:"/",
            label: "Home"
        },
        {
            route:"/posts",
            label: "Posts"
        },
        {
            route:"/gallery",
            label: "Gallery"
        },
        {
            route:"/collections",
            label: "Collections"
        },
    ]

    return (<ul>
        {routes.map((el)=>(
            <li key={el.route}><a href={el.route} className={el.route == pathname ? "active link" : "link" }><strong>{el.label}</strong> </a></li>
        ))}
    </ul>)
}