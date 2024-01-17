import React from "react";
import { useParams } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Create, Show } from "@refinedev/chakra-ui";
const dataList = [
  { id: 101, name: "Item 1", description: "Description 1" },
  { id: 102, name: "Item 2", description: "Description 2" },
  { id: 103, name: "Item 3", description: "Description 3" },
];

const FileDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  if (!id) {
    return <div>Invalid URL: ID parameter is missing</div>;
  }

  const getFileDetails = (itemId: string) => {
    // Assuming you have a function to fetch the file details based on the ID
    // For now, let's just display a simple message
    return {
      id: itemId,
      name: `Item ${itemId}`,
      description: `Description ${itemId}`,
    };
  };

  const fileDetails = getFileDetails(id);

  if (!fileDetails) {
    return <div>File not found</div>;
  }

  return (
    <Show resource="categories"  title={fileDetails.id}>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataList.map((item) => (
          <Tr key={item.id}>
            {/* Use Link to make each row clickable */}
            <Td>
              <Link to={`/files/${item.id}`}>
                {item.id}
              </Link>
            </Td>
            <Td>
              <Link to={`/files/${item.id}`}>
                {item.name}
              </Link>
            </Td>
            <Td>{item.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </Show>
  );
};

export default FileDetails;
