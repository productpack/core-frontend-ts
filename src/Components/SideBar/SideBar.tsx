import React from "react"
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar"
import styles from "./SideBar.module.css"

import { FaDiscord, FaCalendar, FaKey } from "react-icons/fa"
import { CiLogout, CiCalendar } from "react-icons/ci"
import { IoKeyOutline } from "react-icons/io5"
import { RxDiscordLogo } from "react-icons/rx"
import { FiUsers } from "react-icons/fi"
import { MdOutlineGrade } from "react-icons/md"

const SideBar = () => {
  const { toggleSidebar, broken } = useProSidebar()
  return (
    <>
      <div
        className={styles.sidebar_container}
        style={{
          display: "flex",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Sidebar backgroundColor="#ffffff" customBreakPoint="800px">
          <div className={styles.sidebar}>
            <Menu>
              <p className={styles.menuHeader}>General</p>
              <MenuItem
                icon={<RxDiscordLogo color="#59b4f0" size={22} />}
                className={styles.menuItem}
              >
                {" "}
                Join Discord
              </MenuItem>
              <SubMenu
                className={styles.subHeader}
                icon={<CiCalendar color="#59b4f0" size={25} />}
                defaultOpen
                label="Events"
              >
                <MenuItem className={styles.menuItem}> Upcoming</MenuItem>
                <MenuItem className={styles.menuItem}> Past Events</MenuItem>
              </SubMenu>
              <MenuItem
                icon={<IoKeyOutline color="#59b4f0" size={25} />}
                className={styles.menuItem}
              >
                {" "}
                View Discord Key
              </MenuItem>
              <MenuItem
                icon={<CiLogout color="#59b4f0" size={25} />}
                className={styles.menuItem}
              >
                {" "}
                Logout
              </MenuItem>
            </Menu>
          </div>
          <div>
            <Menu>
              <p className={styles.menuHeader}>Admin Previlages</p>
              <SubMenu
                className={styles.subHeader}
                icon={<CiCalendar color="#59b4f0" size={25} />}
                defaultOpen
                label="Events"
              >
                <MenuItem className={styles.menuItem}> Add Events</MenuItem>
                <MenuItem className={styles.menuItem}> Add Tags</MenuItem>
              </SubMenu>
              <MenuItem
                icon={<MdOutlineGrade color="#59b4f0" size={25} />}
                className={styles.menuItem}
              >
                {" "}
                Award Points
              </MenuItem>
              <MenuItem
                icon={<FiUsers color="#59b4f0" size={25} />}
                className={styles.menuItem}
              >
                {" "}
                Manage Users
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>
        <main>
          <div>
            {/* {broken && (
              <button className="sb-button" onClick={() => toggleSidebar()}>
                Toggle
              </button>
            )} */}
          </div>
        </main>
      </div>
    </>
  )
}

export default SideBar
