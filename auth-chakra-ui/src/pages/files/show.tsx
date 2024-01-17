import React from "react";
import { useShow, useOne, useMany } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";

import { Heading, Text, Spacer, List, ListItem } from "@chakra-ui/react";

import { ICategory, IPost, IRelatedItem } from "../../interfaces";

interface FileShowProps {
  postId: string;
}

// Sample data for the related items list
const hardcodedRelatedItems: IRelatedItem[] = [
  { id: "1", name: "Related Item 1" },
  { id: "2", name: "Related Item 2" },
  { id: "3", name: "Related Item 3" },
];

export const FileShow: React.FC<FileShowProps> = ({ postId }) => {
  const { queryResult } = useShow<IPost>({
    resource: "posts",
    id: postId,
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  // Use hardcoded related items data
  const relatedItemsData = { data: hardcodedRelatedItems };

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Title
     
        </Heading>
      <Text mt={2}>{record?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Status
      </Heading>
      <Text mt={2}>{record?.status}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Category
      </Heading>
      <Text mt={2}>{categoryData?.data?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      <Spacer mt={2} />
      <MarkdownField value={record?.content} />

      {/* Display the list of related items */}
      <Heading as="h5" size="sm" mt={4}>
        Related Items
      </Heading>
      <List mt={2}>
        {relatedItemsData?.data.map((relatedItem) => (
          <ListItem key={relatedItem.id}>
            {relatedItem.name} {/* Display other related item details here */}
          </ListItem>
        ))}
      </List>
    </Show>
  );
};
