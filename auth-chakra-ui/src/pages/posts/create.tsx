import { Create } from "@refinedev/chakra-ui";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Collapse,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { IPost } from "../../interfaces";
import { useState } from "react";

export const PostCreate = () => {

    const { isOpen, onToggle } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [documentTypeData, setdocumentTypeData] = useState([ "LawImageModel","NoLawImageModel","Custom",]);
      
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        setValue, // Add setValue function to set the value for "categoryId"
        formState: { errors },
      } = useForm<IPost>();
    
      const { options } = useSelect({
        resource: "categories",
      });
      
    
      const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        onToggle(); // Open the Collapse when an option is selected
        setValue("categoryId", value); // Set the value for "categoryId" in the form
      };
    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps} >
          <Box padding={'7'}>
            <HStack >
            <FormControl mb="3" isInvalid={!!errors?.title}>
            
                <FormLabel>Project Name</FormLabel>
                <Input
                    id="projectName"
                    type="text"
                    {...register("projectName", { required: "Project Name is required" })}
                />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Project Location</FormLabel>
                <Select
                    id="location"
                    placeholder="Select Project Location"
                    {...register("location", {
                        required: "Location is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {`${errors.status?.message}`}
                </FormErrorMessage>
            </FormControl>
           
                    <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Document Type</FormLabel>
                <Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("categoryId", {
                    required: "Category is required",
                    })}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                   {documentTypeData?.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                    ))}
                </Select>
              
                <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
                </FormControl>
            </HStack>
           
           {/* After the document type is selected: */}
            {selectedCategory && 
                    <Box p="40px" mt="4"  rounded="md" shadow="md">
                  <Heading size={'md'}> Document Types and Field to be cloned: <span>{selectedCategory}</span></Heading>
                    {/* Add additional content based on the selected category */}
                    <Heading m={'3'} size={'sm'}> Document Types:</Heading>
                    <Accordion allowToggle>
                    {options?.map((option) => (
                   
                    <>
                    
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                {option.label}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <Heading m={'3'} size={'sm'}> Fields:<span>{selectedCategory}</span></Heading>
                            </AccordionPanel>
                        </AccordionItem>

                        </>
                        ))}
                        </Accordion>
                    </Box>
                }
                {selectedCategory == "Custom" && 
                    <Box p="40px" mt="4"  rounded="md" shadow="md">
                  <Heading size={'md'}> Custom Document Types and Field to be cloned: <span>{selectedCategory}</span></Heading>
                    {/* Add additional content based on the selected category */}
                    <Heading m={'3'} size={'sm'}> Document Types:</Heading>
                    <Accordion allowToggle>
                    {options?.map((option) => (
                   
                    <>
                    
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                {option.label}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <Heading m={'3'} size={'sm'}> Fields:<span>{selectedCategory}</span></Heading>
                            </AccordionPanel>
                        </AccordionItem>

                        </>
                        ))}
                        </Accordion>
                    </Box>
                }
               </Box>
            </Create>
    );
};
