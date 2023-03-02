import {
  Button,
  ButtonGroup,
  Link,
  Text,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SideBar from "../../../../Components/SideBar/SideBar"
import styles from "./AwardPoints.module.css"

import {
  Table,
  Thead,
  Tbody,
  Checkbox,
  Tr,
  Th,
  Td,
  TableContainer,
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
import axios from "axios"
import Navbar from "../../../../Components/Navbar/Navbar"

const AwardPoints = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [copyStatus, setCopyStatus] = useState(false)
  const [awardPoint, setAwardPoint] = useState(0)

  const [checkedUserIds, setCheckedUserIds] = useState<number[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)

  //For Creating New Tags
  const [newTagCode, setNewTagCode] = useState("")
  const [newTagVertical, setNewTagVertical] = useState("")
  const [newTagDescription, setNewTagDescription] = useState("")
  const [tagcreated, setTagCreated] = useState(0)

  //For Storing the existing verticals(API Call)
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

  //Tags Section Starts Here
  interface Tag {
    code: string
    vertical: string
    desc: string
    type: string
  }

  const [tags, setTags] = useState<Tag[]>([])

  const [currentPageTag, setCurrentPageTag] = useState(1)

  useEffect(() => {
    fetchTags(1)
  }, [])

  const fetchTags = async (page: number) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/admin/list/tags?limit=5&page=${page}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      setTags(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTags(currentPage)
  }, [currentPage])

  const handlePreviousPageTag = () => {
    setCurrentPageTag((prevPage) => prevPage - 1)
  }

  const handleNextPageTag = () => {
    setCurrentPageTag((prevPage) => prevPage + 1)
  }

  const handleTagClick = (tagCode: string) => {
    setSelectedTag(tagCode)
  }
  //Tags Section Ends Here

  interface User {
    user_id: string
    name: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])

  const {
    isOpen: isOpenNewTagModal,
    onOpen: onOpenNewTagModal,
    onClose: onCloseNewTagModal,
  } = useDisclosure()

  const [newTag, setNewTag] = useState({
    code: "",
    verticial: "",
    desc: "",
  })

  const getUsers = (page: number) => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/admin/list/users?limit=10&page=${page}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data)
        setUsers(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response.status)
      })
  }

  const awardPoints = () => {
    const body = {
      awardee_list: checkedUserIds,
      tag: selectedTag,
      category: category,
      points: awardPoint,
    }

    console.log(body)

    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/award`, body, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        console.log(response.data.data)
        setCheckedUserIds([])
        setSelectedTag("")
        setAwardPoint(0)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

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

    getUsers(1)
  }, [])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: number
  ) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setCheckedUserIds([...checkedUserIds, userId])
    } else {
      setCheckedUserIds(checkedUserIds.filter((id) => id !== userId))
    }
  }

  useEffect(() => {
    getUsers(currentPage)
  }, [currentPage])

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

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
        console.log(response.data)
        if (response.data.status) {
          setTagCreated(200)
        }
      })
      .catch((error) => {
        console.log(error.response)
        setTagCreated(404)
      })
  }

  return (
    <>
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
        <Modal
          isOpen={isOpenNewTagModal}
          onClose={() => {
            onCloseNewTagModal()
          }}
        >
          <ModalOverlay />
          <ModalContent margin="1rem">
            <ModalHeader>Create Tags</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              To create a vertical, enter a title and unique code. Click
              "Create". Note: title and code can't be changed once created.
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
                    console.log(e.target.value)
                    setNewTagVertical(e.target.value)
                  }}
                  className={styles.input_field}
                >
                  <option>Select Vertical</option>
                  {verticals.map((vertical) => (
                    <option value={vertical.code}>{vertical.title}</option>
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
                  // createVertical()
                }}
              >
                Create Tag
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className={styles.dashboard_container}>
          <Navbar />
          <p className={styles.main_header}>Select Users</p>
          <p className={styles.text_tagline}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            corporis fugiat amet. Veritatis, quo commodi!
          </p>
          <TableContainer marginTop="2rem">
            <Table backgroundColor="#FFFFFF">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email Address</Th>
                  <Th>Select User</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Checkbox
                        isChecked={checkedUserIds.includes(
                          parseInt(user.user_id)
                        )}
                        onChange={(event) => {
                          handleCheckboxChange(event, parseInt(user.user_id))
                          console.log(checkedUserIds)
                        }}
                        value={user.user_id}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <ButtonGroup mt={4}>
              <Button
                onClick={handlePreviousPage}
                isDisabled={currentPage === 1}
                colorScheme="linkedin"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                isDisabled={users.length < 10}
                colorScheme="linkedin"
              >
                Next
              </Button>
            </ButtonGroup>
          </TableContainer>

          <div>
            <p className={styles.main_header}>Select Tag</p>
            <p className={styles.text_tagline}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              corporis fugiat amet. Veritatis, quo commodi!
            </p>

            <TableContainer marginTop="2rem">
              <Table backgroundColor="#FFFFFF">
                <Thead>
                  <Tr>
                    <Th>Code</Th>
                    <Th>Vertical</Th>
                    <Th>Description</Th>
                    <Th>Type</Th>
                    <Th>Select Tag</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tags.map((tag) => (
                    <Tr key={tag.code}>
                      <Td>
                        <Link onClick={() => handleTagClick(tag.code)}>
                          {tag.code}
                        </Link>
                      </Td>
                      <Td>{tag.vertical}</Td>
                      <Td>{tag.desc}</Td>
                      <Td>{tag.type}</Td>
                      <Td>
                        <Checkbox
                          size="lg"
                          colorScheme="blue"
                          isChecked={selectedTag === tag.code}
                          onChange={() => handleTagClick(tag.code)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <ButtonGroup mt={4}>
                  <Button
                    onClick={handlePreviousPageTag}
                    isDisabled={currentPageTag === 1}
                    colorScheme="linkedin"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextPageTag}
                    isDisabled={tags.length < 5}
                    colorScheme="linkedin"
                  >
                    Next
                  </Button>
                  <Button
                    onClick={onOpenNewTagModal}
                    colorScheme="linkedin"
                    variant="outline"
                  >
                    Create Tags
                  </Button>
                </ButtonGroup>
              </Table>
            </TableContainer>
          </div>

          <div className={styles.award_points_container}>
            <p className={styles.main_header}>Award Points</p>
            <p className={styles.text_tagline}>
              Enter in the amount of points you wish to award along with the
              awarding category to complete the process.
            </p>
            <br />
            <RadioGroup
              className={styles.text_tagline}
              onChange={setCategory}
              value={category}
            >
              <Stack direction="row">
                <Radio value="mentor">Mentoring</Radio>
                <Radio value="communtiy">Community Engagement</Radio>
                <Radio value="student">Learning</Radio>
              </Stack>
            </RadioGroup>
            <p className={styles.fv_input_field_label}>
              Enter Amount of Points
            </p>
            <input
              onChange={(e) => {
                setAwardPoint(parseInt(e.target.value))
              }}
              type="number"
              className={styles.input_field}
            />
          </div>
          <Button
            flexShrink="0"
            marginTop="1rem"
            onClick={() => {
              awardPoints()
            }}
            colorScheme="linkedin"
          >
            Award Points
          </Button>
        </div>
      </div>
    </>
  )
}

export default AwardPoints
