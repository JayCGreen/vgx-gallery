
import NavMenu from "./navMenu";

export default function Header(){
    return(<div className="header">
        <div style={{width:"100%", display: "flex", alignItems: "center"}}>
           <img src="/logo.svg" style={{height: "5vh"}}></img> <h2 style={{margin: "unset"}}>VnderGraphx</h2>
        </div>
        <NavMenu></NavMenu>
    </div>)
}