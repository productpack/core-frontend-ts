import axios from "axios"
import React, { useEffect, useState, ReactNode } from "react"
import SideBar from "../../../Components/SideBar/SideBar"

import styles from "./UserDashboard.module.css"

import { Text, Button, useDisclosure } from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import { Badge } from "@chakra-ui/react"
import Navbar from "../../../Components/Navbar/Navbar"

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  })

  const [discordStatus, setDiscordStatus] = useState({
    discord_secret: "",
    onboard_status: false,
  })

  const [userpoints, setUserpoints] = useState({
    student_points: 0,
    mentor_points: 0,
    common_points: 0,
    total_points: 0,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [copyStatus, setCopyStatus] = useState(false)

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 0,
      slug: "",
      title: "",
      description: "",
      vertical: "",
      location: "",
      start_time: "",
      end_time: "",
      is_visible: true,
      is_past: false,
      createdAt: "",
      updatedAt: "",
    },
  ])

  useEffect(() => {
    setCopyStatus(false)
  }, [isOpen])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/detail`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        console.log(response.data.detail)
        setUserDetails(response.data.detail)
      })
      .catch(function (error) {
        console.log(error.response.status)
      })

    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/score`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        console.log(response.data.detail)
        setUserpoints(response.data.detail)
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/discord`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        console.log(response.data.data)

        if (!response.data.data.onboard_status) {
          onOpen()
        }
        setDiscordStatus(response.data.data)
        localStorage.setItem(
          "onboard_status",
          response.data.data.onboard_status
        )
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/events/upcoming`)
      .then(function (response) {
        console.log(response.data.data)
        setUpcomingEvents(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <div className={styles.main_container}>
      <SideBar onOpen={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent margin="1rem">
          <ModalHeader>Onboard Discord Server</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {" "}
              It seems like you haven't onboarded the discord server yet. Kindly
              copy the below shown key and onboard the Product Pack Discord
              Server.
            </Text>
            <br />
            <Text as="b">Discord Secret Key</Text>
            <Text>{discordStatus.discord_secret}</Text>
          </ModalBody>
          <ModalFooter>
            <a
              href="https://discord.gg/hTCsB3SC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button marginRight={"1rem"} onClick={onClose}>
                Join Discord
              </Button>
            </a>
            <Button
              marginRight={"1rem"}
              onClick={() => {
                navigator.clipboard.writeText(discordStatus.discord_secret)
                setCopyStatus(true)
              }}
            >
              {copyStatus ? "Key Copied" : "Copy Key"}
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.dashboard_container}>
        <Navbar />
        <div>
          <p className={styles.welcome_text}>
            Hi, {userDetails ? userDetails.name : ""}{" "}
            <Badge colorScheme={discordStatus.onboard_status ? "green" : "red"}>
              {discordStatus.onboard_status
                ? "Discord Onboarded"
                : "Onboarding Pending"}
            </Badge>
          </p>
          <p className={styles.text_tagline}>
            Welcome to Product Pack Dashboard
          </p>
        </div>
        <div>
          <div className={styles.points_container}>
            <div className={styles.total_coins}>
              <img
                src="/assets/user/dashboard/packcoin.png"
                alt=""
                className={styles.avatar_image}
              />
              <div className={styles.total_coins_text}>
                <p className={styles.coin_count}>{userpoints.total_points}</p>
                <p className={styles.coin_label}>Pack Coins</p>
                <p className={styles.coin_tagline}>Learn, Build & Earn</p>
              </div>
            </div>
            <div className={styles.secondary_coins}>
              <div className={styles.scoin_box}>
                <p className={styles.scoin_label}>
                  For <br /> Mentoring
                </p>
                <p className={styles.scoin_count}>{userpoints.mentor_points}</p>
                <p className={styles.scoin_tagline}>Mentor Credits</p>
              </div>
              <div className={styles.scoin_box}>
                <p className={styles.scoin_label}>
                  For <br /> Community Engagement
                </p>
                <p className={styles.scoin_count}>{userpoints.common_points}</p>
                <p className={styles.scoin_tagline}>Common Credits</p>
              </div>
              <div className={styles.scoin_box}>
                <p className={styles.scoin_label}>
                  For <br /> Learning
                </p>
                <p className={styles.scoin_count}>
                  {userpoints.student_points}
                </p>
                <p className={styles.scoin_tagline}>Student Credits</p>
              </div>
            </div>
          </div>
          <div className={styles.upcoming_events_container}>
            <p className={styles.heading_text}>Upcoming Events</p>
            <p className={styles.text_tagline}>
              Hey, It seems like we have a list of events incoming, keep a watch
              on them. Events can provide you many new knowledge and pack coin.
            </p>
            <div className={styles.upcoming_events}>
              {upcomingEvents &&
                upcomingEvents.map(
                  (event) =>
                    !event.is_past && (
                      <div className={styles.event_container}>
                        <div className={styles.event_card}>
                          <div>
                            <h2 className={styles.event_name}>{event.title}</h2>
                            <p className={styles.event_description}>
                              {event.description.slice(0, 100)} . . .
                            </p>
                            <p className={styles.event_label}>
                              Starting time:{" "}
                              {event.start_time &&
                                new Intl.DateTimeFormat("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }).format(new Date(event.start_time))}
                            </p>
                            <p className={styles.event_label}>
                              Event Vertical: {event.vertical}
                            </p>
                          </div>
                          <button className={styles.registration_button}>
                            Register
                          </button>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
          <div className={styles.learning_materials}>
            <p className={styles.heading_text}>Learning Materials</p>
            <p className={styles.text_tagline}>
              Hey, It seems like we have a list of events incoming, keep a watch
              on them. Events can provide you many new knowledge and pack coin.
            </p>
            <div className={styles.upcoming_events}>
              <div className={styles.event_container}>
                <div className={styles.event_card}>
                  <h2 className={styles.event_name}>
                    Modern Product Management 101
                  </h2>
                  <p className={styles.event_description}>
                    Learn the fundamentals of Product Management with the help
                    of carefully curated learning materials. This one is a good
                    place to start your product learning journey.
                  </p>
                  <p className={styles.event_label}>Course Type: Free Course</p>
                  <a
                    href="https://accidental-sunfish-cdf.notion.site/Modern-Product-Management-101-d8c27a04b43e402e9412e1aa5d29debb"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                  <button className={styles.registration_button}>
                    Register
                  </button>
                </div>
              </div>
              <div className={styles.event_container}>
                <div className={styles.event_card}>
                  <h2 className={styles.event_name}>
                    Product Management Advanced
                  </h2>
                  <p className={styles.event_description}>
                    Advance your conceptual understanding in Product Management
                    with the help of carefully curated learning materials.
                  </p>
                  <p className={styles.event_label}>Course Type: Paid Course</p>
                  <a
                    href="https://airtable.com/shr4aFtzwBdMnquLT"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                  <button className={styles.registration_button}>
                    Register
                  </button>
                </div>
              </div>
              <div className={styles.event_container}>
                <div className={styles.event_card}>
                  <h2 className={styles.event_name}>Lessons From Legends</h2>
                  <p className={styles.event_description}>
                    Success leaves us clues. Learn some golden wisdom nuggets
                    with the help of a curated collection of rare videos of the
                    Legends in Product.
                  </p>
                  <p className={styles.event_label}>Course Type: Free Course</p>
                  <a
                    href="https://accidental-sunfish-cdf.notion.site/Modern-Product-Management-101-d8c27a04b43e402e9412e1aa5d29debb"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                  <button className={styles.registration_button}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
