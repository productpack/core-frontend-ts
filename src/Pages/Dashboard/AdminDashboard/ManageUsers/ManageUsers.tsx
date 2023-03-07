import {
  Button,
  ButtonGroup,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SideBar from "../../../../Components/SideBar/SideBar"

import styles from "./ManageUsers.module.css"

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

const ManageUsers = () => {
  interface User {
    user_id: string
    name: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])
  const [discordStatus, setDiscordStatus] = useState({
    discord_secret: "",
    onboard_status: false,
  })
  const [checkedUserIds, setCheckedUserIds] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

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
      .catch(function (error) {

      })
  }
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
      .catch(function (error) {
 
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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [copyStatus, setCopyStatus] = useState(false)
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
        </div>
      </div>
    </>
  )
}

export default ManageUsers
