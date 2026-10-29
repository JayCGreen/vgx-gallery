
"use client"
import NavMenu from "./navMenu";
import style from "./navMenu.module.css";
import { Menu } from "@deemlol/next-icons";
import { useState } from "react";

export default function Header() {
    const [collapseMenu, setCollapseMenu] = useState(true);
    return (<div>
        <div className={style.header}>
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <a href="/" className={style.link} style={{ width: "100%", display: "flex", alignItems: "center", textDecoration: "none", justifyContent: "center" }}>
                    <img src="/logo.svg" style={{ height: "5vh" }}></img> <h2 style={{ margin: "unset" }}>VnderGraphx</h2>
                </a>
            </div>
            <button className={style.collapseButton} onClick={() => setCollapseMenu(!collapseMenu)}><Menu /></button>
            <NavMenu></NavMenu>
        </div>
        <div className={`${style.thumbMenu}`}>
            <div className={`${style.cover} ${!collapseMenu? style.showCover : ""}`}>
            <NavMenu collapse={collapseMenu} mobileMenu={true} setCollapse={setCollapseMenu}></NavMenu>
            </div>
            <button className={`${style.thumbButton} ${!collapseMenu ? style.thumbButtonActive : ""}`} onClick={() => setCollapseMenu(!collapseMenu)}><Menu /><span>Nav</span></button>
        </div>
    </div>)
}