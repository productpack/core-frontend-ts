import { Button, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
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

  const {
    isOpen: isOpenVerticalModal,
    onOpen: onOpenVerticalModal,
    onClose: onCloseVerticalModal,
  } = useDisclosure()

  //For Storing the existing verticals(API Call)
  const [verticals, setVerticals] = useState([
    {
      code: "",
      title: "",
    },
  ])

  //For Creating Events
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [vertical, setVertical] = useState("")
  const [location, setLocation] = useState("")
  const [startdate, setStartDate] = useState("")
  const [enddate, setEndDate] = useState("")
  const [starttime, setStartTime] = useState("")
  const [endtime, setEndTime] = useState("")

  //For Creating New Verticals
  const [newVerticalCode, setNewVericalCode] = useState("")
  const [newVerticalTitle, setNewVerticalTitle] = useState("")

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

  const createEvent = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    }

    axios
      .post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/event/add`,
        {
          slug: slug,
          title: title,
          description: description,
          vertical: vertical,
          location: location,
          start_time: new Date(`${startdate} ${starttime}`),
          end_time: new Date(`${enddate} ${endtime}`),
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const createVertical = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    }
    axios
      .post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/vertical/add`,
        {
          code: newVerticalCode,
          title: newVerticalTitle,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  return (
    <>
      <div className={styles.main_container}>
        <SideBar onOpen={onOpen} />
        <Modal
          isOpen={isOpenVerticalModal}
          onClose={() => {
            onCloseVerticalModal()
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Vertical</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              To create a vertical, enter a title and unique code. Click
              "Create". Note: title and code can't be changed once created.
              <div className={styles.form_field}>
                <p className={styles.fv_input_field_label}>Vertical Code</p>
                <input
                  value={newVerticalCode}
                  onChange={(e) => {
                    setNewVericalCode(e.target.value)
                  }}
                  type="text"
                  className={styles.input_field}
                />
              </div>
              <div className={styles.form_field}>
                <p className={styles.fv_input_field_label}>Vertical Title</p>
                <input
                  value={newVerticalTitle}
                  onChange={(e) => {
                    setNewVerticalTitle(e.target.value)
                  }}
                  type="text"
                  className={styles.input_field}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  createVertical()
                }}
              >
                Create Vertical
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
              <input
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                className={styles.input_field}
                type="text"
              />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Description</p>
                <p className={styles.field_description}>
                  This will be displayed as the event description
                </p>
              </div>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                className={styles.input_fielddesc}
              />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Location</p>
                <p className={styles.field_description}>
                  Do mention the location of the event
                </p>
              </div>
              <input
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
                className={styles.input_field}
                type="text"
              />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Create Slug</p>
                <p className={styles.field_description}>
                  Do mention the location of the event
                </p>
              </div>
              <input
                onChange={(e) => {
                  setSlug(e.target.value)
                }}
                className={styles.input_field}
                type="text"
              />
            </div>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Starting Time</p>
                <p className={styles.field_description}>
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
              <div className={styles.row}>
                <input
                  onChange={(e) => {
                    setStartDate(e.target.value)
                  }}
                  className={styles.input_field}
                  type="date"
                />
                <input
                  onChange={(e) => {
                    setStartTime(e.target.value)
                  }}
                  className={styles.input_field}
                  type="time"
                />
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
                <input
                  onChange={(e) => {
                    setEndDate(e.target.value)
                  }}
                  className={styles.input_field}
                  type="date"
                />
                <input
                  onChange={(e) => {
                    setEndTime(e.target.value)
                  }}
                  className={styles.input_field}
                  type="time"
                />
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
                <select
                  value={vertical}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setVertical(e.target.value)
                  }}
                  className={styles.input_field}
                >
                  <option>Select Vertical</option>
                  {verticals.map((vertical) => (
                    <option value={vertical.code}>{vertical.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <Wrap marginTop="2rem" spacing={4}>
            <WrapItem>
              <Button
                onClick={() => {
                  createEvent()
                }}
                size="md"
                colorScheme="linkedin"
              >
                Create Events
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                onClick={() => {
                  onOpenVerticalModal()
                }}
                variant="outline"
                size="md"
                colorScheme="linkedin"
              >
                Create Verticals
              </Button>
            </WrapItem>
          </Wrap>
        </div>
      </div>
    </>
  )
}

export default CreateEvent
