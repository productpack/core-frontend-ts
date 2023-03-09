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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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

import axios from "axios"
import Navbar from "../../../../Components/Navbar/Navbar"

const AwardPoints = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenNewTagModal,
    onOpen: onOpenNewTagModal,
    onClose: onCloseNewTagModal,
  } = useDisclosure()


  const [copyStatus, setCopyStatus] = useState(false)
  const [awardPoint, setAwardPoint] = useState(0)

  const [checkedUserIds, setCheckedUserIds] = useState<number[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)

  const [awardStatus, setAwardStatus] = useState({
    success_list: [],
    fail_list: [],
  })

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

  //Function to fetch the tags from the backend
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
    } catch (error) {}
  }

  //Function to fetch the tags from the backend(On Page Load/On Page Change)
  useEffect(() => {
    fetchTags(currentPageTag)
  }, [currentPageTag])

  //Function to handle the previous page button(For Tags)
  const handlePreviousPageTag = () => {
    setCurrentPageTag((prevPage) => prevPage - 1)
  }

  //Function to handle the next page button(For Tags)
  const handleNextPageTag = () => {
    setCurrentPageTag((prevPage) => prevPage + 1)
  }

  //Function to handle the tag click(Checkbox)
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


  //POST Request to award points to the selected users
  const awardPoints = () => {
    const body = {
      awardee_list: checkedUserIds,
      tag: selectedTag,
      category: category,
      points: awardPoint,
    }

    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/award`, body, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then(function (response) {
        setCheckedUserIds([])
        setSelectedTag("")
        setAwardPoint(0)
        setAwardStatus(response.data.data)

        if (response.data.data.success_list.length > 0) {
          console.clear()
          console.log("Success List")
          console.log("----------------")
          console.log("Tag Name:" + selectedTag)
          console.log("Category:" + category)
          console.log("Points:" + awardPoint)
          users.filter((user) => {
            response.data.data.success_list.map((successUser: String) => {
              if (user.user_id === successUser) {
                console.log("Username:" + user.name)
              }
            })
          })
        }
        if (response.data.data.fail_list.length > 0) {
          console.clear()
          console.log("Fail List")
          console.log("----------------")
          users.filter((user) => {
            response.data.data.fail_list.map((failUser: String) => {
              if (user.user_id === failUser) {
                console.log("Username:" + user.name)
              }
            })
          })
        }
      })
      .catch(function (error) {})
  }

  //GET Request to get the existing verticals, and trigger function for users lists and tags fetching
  useEffect(() => {
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

    getUsers(1)
    fetchTags(1)
  }, [])

  //GET Request to get the users list according to page number
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
        setUsers(response.data.data)
      })
      .catch(function (error) {})
  }

  //Function to handel checkbox change for users list
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

  //useEffect hook to get the users list on page change
  useEffect(() => {
    getUsers(currentPage)
  }, [currentPage])

  //Function to handle the previous page button(For Users)
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  //Function to handle the next page button(For Users)
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  //POST Request to create a new tag
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
        setTagCreated(error.response.status)
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
                    Failed! Make sure the tag code is unique.
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
          <div className={styles.alert_container}>
            {awardStatus.success_list.length > 0 ? (
              <Alert status="success" variant="left-accent">
                <AlertIcon />
                Sucessfully Awarded Points to {
                  awardStatus.success_list.length
                }{" "}
                Learners. View console.log for more details.
              </Alert>
            ) : awardStatus.fail_list.length > 0 ? (
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                Failed to Awarded Points to {awardStatus.fail_list.length}{" "}
                Learners. View console.log for more details.
              </Alert>
            ) : null}
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
