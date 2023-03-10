import { useEffect, useState } from "react"

import styles from "./CreateEvent.module.css"
import axios from "axios"

import SideBar from "../../../../Components/SideBar/SideBar"
import Navbar from "../../../../Components/Navbar/Navbar"

import {
  Alert,
  AlertIcon,
  Button,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

const CreateEvent = () => {
  //For Modal Open and Close (Discord Linking)
  const { isOpen, onOpen, onClose } = useDisclosure()

  //For Modal Open and Close (Vertical Creation)
  const {
    isOpen: isOpenVerticalModal,
    onOpen: onOpenVerticalModal,
    onClose: onCloseVerticalModal,
  } = useDisclosure()

  //For Modal Open and Close (Tag Creation)
  const {
    isOpen: isOpenTagModal,
    onOpen: onOpenTagModal,
    onClose: onCloseTagModal,
  } = useDisclosure()

  //For Storing the existing verticals(API Call)
  const [verticals, setVerticals] = useState([
    {
      code: "",
      title: "",
    },
  ])

  //State Variables for Event Creation Form
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

  //For Creating New Tags
  const [newTagCode, setNewTagCode] = useState("")
  const [newTagVertical, setNewTagVertical] = useState("")
  const [newTagDescription, setNewTagDescription] = useState("")

  const [discordStatus, setDiscordStatus] = useState({
    discord_secret: "",
    onboard_status: false,
  })

  //For Checking whether the event,vertical,tag has been created.
  const [eventcreated, setEventCreated] = useState(0)
  const [verticalcreated, setVerticalCreated] = useState(0)
  const [tagcreated, setTagCreated] = useState(0)

  //For Checking whether the discord key has been copied.
  const [copyStatus, setCopyStatus] = useState(false)

  //Resetting the form after event creation
  useEffect(() => {
    if (eventcreated) {
      setSlug("")
      setTitle("")
      setDescription("")
      setVertical("")
      setLocation("")
      setStartDate("")
      setEndDate("")
      setStartTime("")
      setEndTime("")
    }
  }, [eventcreated])

  //useEffect hook for getting the existing verticals and discord status on page load(API Call)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/discord`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        setDiscordStatus(response.data.data)
      })
      .catch(function (error) {})

    axios
      .get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/admin/list/verticals?limit=100&page=1`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(function (response) {
        setVerticals(response.data.data)
      })
      .catch(function (error) {})
  }, [])

  //POST request for creating a new event
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
        if (response.data.status) {
          setEventCreated(200)
        }
      })
      .catch((error) => {
        setEventCreated(404)
      })
  }

  //POST request for creating a new vertical
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
        if (response.data.status) {
          setVerticalCreated(200)
        }
      })
      .catch((error) => {
        setVerticalCreated(404)
      })
  }

  //POST request for creating a new tag
  const createTag = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    }
    axios
      .post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/admin/tag/add`,
        {
          code: newTagCode,
          vertical: newTagVertical,
          desc: newTagDescription,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.status) {
          setTagCreated(200)
        }
      })
      .catch((error) => {
        setTagCreated(404)
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
          isCentered
        >
          <ModalOverlay />
          <ModalContent margin="1rem">
            <ModalHeader>Create Vertical</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              To create a vertical, enter a title and code, and click "Create".
              The title and code cannot be changed later.
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
              <br />
              <div className={styles.alert_container}>
                {verticalcreated === 200 ? (
                  <Alert status="success" variant="left-accent">
                    <AlertIcon />
                    Vertical created successfully.
                  </Alert>
                ) : verticalcreated === 400 ? (
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    Vertical creation failed!
                  </Alert>
                ) : null}
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
        <Modal
          isOpen={isOpenTagModal}
          onClose={() => {
            onCloseTagModal()
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent margin="1rem">
            <ModalHeader>Create Tag</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              To create a tag, enter a title and select vertical and enter tag
              description. Click "Create". Note: details can't be changed
              once created.
              <div className={styles.form_field}>
                <p className={styles.fv_input_field_label}>Tag Code</p>
                <input
                  value={newTagCode}
                  onChange={(e) => {
                    setNewTagCode(e.target.value)
                  }}
                  type="text"
                  className={styles.input_field}
                />
              </div>
              <div className={styles.form_field}>
                <div>
                  <p className={styles.fv_input_field_label}>Select Vertical</p>
                </div>

                <select
                  value={newTagVertical}
                  onChange={(e) => {
                    setNewTagVertical(e.target.value)
                  }}
                  className={styles.input_field}
                >
                  <option>Select Vertical</option>

                  {verticals.map((vertical) => (
                    <option key={vertical.code} value={vertical.code}>
                      {vertical.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.form_field}>
                <p className={styles.fv_input_field_label}>Tag Description</p>
                <input
                  value={newTagDescription}
                  onChange={(e) => {
                    setNewTagDescription(e.target.value)
                  }}
                  type="text"
                  className={styles.input_field}
                />
              </div>
              <br />
              <div className={styles.alert_container}>
                {tagcreated === 200 ? (
                  <Alert status="success" variant="left-accent">
                    <AlertIcon />
                    Tag created successfully.
                  </Alert>
                ) : tagcreated === 400 ? (
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    Tag creation failed!
                  </Alert>
                ) : null}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  createTag()
                }}
              >
                Create Tag
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent margin="1rem">
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
          <Navbar />
          <div>
            <p className={styles.main_header}>Events Create Form</p>
            <p className={styles.text_tagline}>
              To create an event fill in all the field that are give below with
              the respective data.
            </p>
          </div>
          <form className={styles.form_fields}>
            <div className={styles.form_field}>
              <div>
                <p className={styles.field_label}>Event Name</p>
                <p className={styles.field_description}>
                  This will be displayed as the card header
                </p>
              </div>
              <input
                value={title}
                required
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
                required
                value={description}
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
                value={location}
                required
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
                  This keyword will be used to identify the event and used in
                  the URL.
                </p>
              </div>
              <input
                value={slug}
                required
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
                  So, When is the event starting?
                </p>
              </div>
              <div className={styles.row}>
                <input
                  value={startdate}
                  required
                  onChange={(e) => {
                    setStartDate(e.target.value)
                  }}
                  className={styles.input_field}
                  type="date"
                />
                <input
                  value={starttime}
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
                <p className={styles.field_description}>When does it end?</p>
              </div>
              <div className={styles.row}>
                <input
                  value={enddate}
                  required
                  onChange={(e) => {
                    setEndDate(e.target.value)
                  }}
                  className={styles.input_field}
                  type="date"
                />
                <input
                  value={endtime}
                  required
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
                  To which verticial does this event belong to?. If the vertical
                  is not found create one.
                </p>
              </div>
              <div className={styles.row}>
                <select
                  value={vertical}
                  required
                  onChange={(e) => {
                    setVertical(e.target.value)
                  }}
                  className={styles.input_field}
                >
                  <option>Select Vertical</option>
                  {verticals.map((vertical) => (
                    <option key={vertical.code} value={vertical.code}>
                      {vertical.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className={styles.alert_container}>
            {eventcreated === 200 ? (
              <Alert marginTop="1rem" status="success" variant="left-accent">
                <AlertIcon />
                Event created successfully.
              </Alert>
            ) : eventcreated === 400 ? (
              <Alert marginTop="1rem" status="error" variant="left-accent">
                <AlertIcon />
                Event creation failed!
              </Alert>
            ) : null}
          </div>
          <Wrap marginTop="2rem" spacing={4}>
            <WrapItem>
              <Button
                type="submit"
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
            <WrapItem>
              <Button
                onClick={() => {
                  onOpenTagModal()
                }}
                variant="outline"
                size="md"
                colorScheme="linkedin"
              >
                Create Tags
              </Button>
            </WrapItem>
          </Wrap>
        </div>
      </div>
    </>
  )
}

export default CreateEvent
