import React from "react"

import styles from "./Navbar.module.css"

import { useProSidebar } from "react-pro-sidebar"

const Navbar = () => {
  const { toggleSidebar, broken, collapseSidebar } = useProSidebar()
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <img
          className={styles.navbar_logo}
          src="/assets/navbar/productpacklogo.png"
          alt=""
        />
        {!broken && (
          <img
            className={styles.navbar_menu}
            src="/assets/navbar/menu.png"
            alt=""
            onClick={() => collapseSidebar()}
          />
        )}
        {broken && (
          <img
            className={styles.navbar_menu}
            src="/assets/navbar/menu.png"
            alt=""
            onClick={() => toggleSidebar()}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
