import { useState, useEffect } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Link,
  ButtonGroup,
  Button,
} from "@chakra-ui/react"
import axios from "axios"

interface Tag {
  code: string
  vertical: string
  desc: string
  type: string
}

interface TagsTableProps {
  selectedTag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>
}

const TagsTable: React.FC<TagsTableProps> = ({
  selectedTag,
  setSelectedTag,
}) => {
  const [tags, setTags] = useState<Tag[]>([])

  const [currentPage, setCurrentPage] = useState(1)

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
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTags(currentPage)
  }, [currentPage])

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleTagClick = (tagCode: string) => {
    setSelectedTag(tagCode)
  }

  return (
    <Table variant="simple">
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
              <Link onClick={() => handleTagClick(tag.code)}>{tag.code}</Link>
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
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          colorScheme="linkedin"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          isDisabled={tags.length < 5}
          colorScheme="linkedin"
        >
          Next
        </Button>
      </ButtonGroup>
    </Table>
  )
}

export default TagsTable
