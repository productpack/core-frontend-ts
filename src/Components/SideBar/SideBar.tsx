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
import { Link, useNavigate } from "react-router-dom"
import { CiLogout, CiCalendar } from "react-icons/ci"
import { IoKeyOutline } from "react-icons/io5"
import { RxDiscordLogo } from "react-icons/rx"
import { FiUsers } from "react-icons/fi"
import { MdOutlineGrade } from "react-icons/md"
import { AiOutlineHome } from "react-icons/ai"

const SideBar = ({ onOpen }: { onOpen: any }) => {
  const { toggleSidebar, broken, collapseSidebar } = useProSidebar()
  let navigate = useNavigate()
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
                icon={<AiOutlineHome color="#59b4f0" size={22} />}
                className={styles.menuItem}
                onClick={() => {
                  return navigate("/user/dashboard")
                }}
              >
                {" "}
                User Dashboard
              </MenuItem>

              {localStorage.getItem("onboard_status") === "true" ? (
                <a
                  href="https://www.productpack.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MenuItem
                    icon={<RxDiscordLogo color="#59b4f0" size={22} />}
                    className={styles.menuItem}
                  >
                    {" "}
                    Goto Discord
                  </MenuItem>
                </a>
              ) : (
                <MenuItem
                  icon={<RxDiscordLogo color="#59b4f0" size={22} />}
                  className={styles.menuItem}
                  onClick={() => {
                    onOpen()
                  }}
                >
                  {" "}
                  Join Discord
                </MenuItem>
              )}

              <SubMenu
                className={styles.subHeader}
                icon={<CiCalendar color="#59b4f0" size={25} />}
                defaultOpen
                label="Events"
              >
                <MenuItem
                  onClick={() => {
                    return navigate("/user/events/upcoming")
                  }}
                  className={styles.menuItem}
                >
                  {" "}
                  Upcoming
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    return navigate("/user/events/past")
                  }}
                  className={styles.menuItem}
                >
                  {" "}
                  Past Events
                </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<CiLogout color="#59b4f0" size={25} />}
                className={styles.menuItem}
                onClick={() => {
                  localStorage.removeItem("access_token")
                  return navigate("/login")
                }}
              >
                {" "}
                Logout
              </MenuItem>
            </Menu>
          </div>
          {localStorage.getItem("is_admin") === "true" && (
            <div>
              <Menu>
                <p className={styles.menuHeader}>Admin</p>
                <SubMenu
                  className={styles.subHeader}
                  icon={<CiCalendar color="#59b4f0" size={25} />}
                  defaultOpen
                  label="Events"
                >
                  <MenuItem
                    onClick={() => {
                      return navigate("/admin/createevents")
                    }}
                    className={styles.menuItem}
                  >
                    {" "}
                    Add Events
                  </MenuItem>
                </SubMenu>
                <MenuItem
                  icon={<MdOutlineGrade color="#59b4f0" size={25} />}
                  className={styles.menuItem}
                  onClick={() => {
                    return navigate("/admin/awardpoints")
                  }}
                >
                  {" "}
                  Award Points
                </MenuItem>
                <MenuItem
                  icon={<FiUsers color="#59b4f0" size={25} />}
                  className={styles.menuItem}
                  onClick={() => {
                    return navigate("/admin/manageusers")
                  }}
                >
                  {" "}
                  Manage Users
                </MenuItem>
              </Menu>
            </div>
          )}
        </Sidebar>
      </div>
    </>
  )
}

export default SideBar
