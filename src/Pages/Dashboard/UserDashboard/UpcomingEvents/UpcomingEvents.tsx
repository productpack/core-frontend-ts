import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Navbar from "../../../../Components/Navbar/Navbar"
import SideBar from "../../../../Components/SideBar/SideBar"
import styles from "./UpcomingEvents.module.css"

const UpcomingEvents = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [copyStatus, setCopyStatus] = useState(false)

  const [discordStatus, setDiscordStatus] = useState({
    discord_secret: "",
    onboard_status: false,
  })

  useEffect(() => {
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
        <div className={styles.upcoming_events_container}>
          <p className={styles.heading_text}>Upcoming Events</p>
          <p className={styles.text_tagline}>
            Hey, It seems like we have a list of events incoming, keep a watch
            on them. Events can provide you many new knowledge and pack coin.
          </p>
          <div className={styles.upcoming_events}>
            {upcomingEvents &&
              upcomingEvents.map((event) => (
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
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents
