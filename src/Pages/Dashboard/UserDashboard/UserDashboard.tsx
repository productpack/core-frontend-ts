import axios from "axios"
import React, { useEffect, useState } from "react"
import SideBar from "../../../Components/SideBar/SideBar"

import styles from "./UserDashboard.module.css"

import { TbSum, TbSchool, TbBallpen, TbPlus } from "react-icons/tb"

import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react"

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
        <ModalContent>
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
          <div>
            <p className={styles.sub_header}>Total Points Gained</p>
            <p className={styles.text_tagline}>
              Join the product pack, earn points by participating in events and
              completing learning tasks, and watch your total points grow.
            </p>
          </div>
          <div className={styles.user_points}>
            <div className={styles.user_point}>
              <TbSum color="#303030" size={30} />
              <p className={styles.points}>{userpoints.total_points}</p>
              <p className={styles.points_title}>Total Points</p>
            </div>
            <div className={styles.user_point}>
              <TbSchool color="#303030" size={30} />
              <p className={styles.points}>{userpoints.student_points}</p>
              <p className={styles.points_title}>Student Points</p>
            </div>
            <div className={styles.user_point}>
              <TbBallpen color="#303030" size={30} />
              <p className={styles.points}>{userpoints.mentor_points}</p>
              <p className={styles.points_title}>Mentor Points</p>
            </div>
            <div className={styles.user_point}>
              <TbPlus color="#303030" size={30} />
              <p className={styles.points}>{userpoints.common_points}</p>
              <p className={styles.points_title}>Common Points</p>
            </div>
          </div>
          <div>
            <p className={styles.sub_header}>Upcoming Events</p>
            <p className={styles.text_tagline}>
              Events are a great way to learn and experience new things!. Join
              in now if you haven't yet.
            </p>
          </div>
          <div className={styles.upcoming_events}>
            {upcomingEvents &&
              upcomingEvents.map((event) => (
                <div className={styles.event_container}>
                  <Card maxW="sm">
                    <CardBody>
                      <Stack mt="6" spacing="2">
                        <Heading size="md">{event.title}</Heading>
                        <Text fontSize="md" noOfLines={5}>
                          {event.description}
                        </Text>
                        <Text as="b">Event Date and Time</Text>

                        <Text>
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
                        </Text>
                      </Stack>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Register Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
