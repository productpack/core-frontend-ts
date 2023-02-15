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
      </div>
    </>
  )
}

export default CreateEvent
