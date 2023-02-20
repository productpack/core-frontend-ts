import { Button, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SideBar from "../../../../Components/SideBar/SideBar"
import styles from "./CreateEvent.module.css"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import axios from "axios"

const CreateEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [verticals, setVerticals] = useState([
    {
      code: "",
      title: "",
    },
  ])

  const [discordStatus, setDiscordStatus] = useState({
    discord_secret: "",
    onboard_status: false,
  })

  const [copyStatus, setCopyStatus] = useState(false)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/discord`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        console.log(response.data.data)
        setDiscordStatus(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response.status)
      })

    axios
      .get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/admin/list/verticals?limit=10&page=1`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data)
        setVerticals(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response.status)
      })
  }, [])

  return (
    <>
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
                It seems like you haven't onboarded the discord server yet.
                Kindly copy the below shown key and onboard the Product Pack
                Discord Server.
              </Text>
              <br />
              <Text as="b">Discord Secret Key</Text>
              <Text>{discordStatus.discord_secret}</Text>
            </ModalBody>
            <ModalFooter>
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
            <p className={styles.main_header}>Events Create Form</p>
            <p className={styles.text_tagline}>
              To create an event fill in all the field that are give below with
              the respective data.
            </p>
          </div>
          <div className={styles.form_fields}>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Name</p>
                <p className={styles.field_description}>
                  This will be displayed as the card header
                </p>
              </div>
              <input className={styles.input_field} type="text" />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Description</p>
                <p className={styles.field_description}>
                  This will be displayed as the event description
                </p>
              </div>
              <textarea className={styles.input_fielddesc} />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Location</p>
                <p className={styles.field_description}>
                  Do mention the location of the event
                </p>
              </div>
              <input className={styles.input_field} type="text" />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Starting Time</p>
                <p className={styles.field_description}>
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div className={styles.row}>
                <input className={styles.input_field} type="date" />
                <input className={styles.input_field} type="time" />
              </div>
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Ending Time</p>
                <p className={styles.field_description}>
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div className={styles.row}>
                <input className={styles.input_field} type="date" />
                <input className={styles.input_field} type="time" />
              </div>
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Select Vertical</p>
                <p className={styles.field_description}>
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div className={styles.row}>
                <select className={styles.input_field} name="cars" id="cars">
                  {verticals.map((vertical) => (
                    <option value={vertical.code}>{vertical.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEvent
