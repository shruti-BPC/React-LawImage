import React from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  List,
  
} from "@refinedev/chakra-ui";
export const FileList: React.FC = () => {
  // Sample data
  const dataList = [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
  ];

  return (
    <List resource="categories" title={'Files'}>
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
    </List>
  );
};


