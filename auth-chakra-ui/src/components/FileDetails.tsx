import React from "react";
import { useParams } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Show } from "@refinedev/chakra-ui";
const colorList = [
  { color: "red", value: "#f00" },
  { color: "green", value: "#0f0" },
  { color: "blue", value: "#00f" },
  { color: "cyan", value: "#0ff" },
  { color: "magenta", value: "#f0f" },
  { color: "yellow", value: "#ff0" },
  { color: "black", value: "#000" },
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
    <Show title={fileDetails.id}>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {colorList.map((item) => (
          <Tr key={item.color}>
            {/* Use Link to make each row clickable */}
            <Td>
              <Link to={`/files/${fileDetails.id}/${item.color}`}>
                {item.value}
              </Link>
            </Td>
            <Td>
            <Link to={`/files/${fileDetails.id}/${item.color}`}>
                {item.value}
              </Link>
            </Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
    </Show>
  );
};

export default FileDetails;
