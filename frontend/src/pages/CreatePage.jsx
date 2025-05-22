import { useColorModeValue } from "@/components/ui/color-mode"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useProductStore } from "@/store/product"
import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error"
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success"
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  }

  return (
    <Container maxW={"xl"}>
      <VStack
        spacing={8}
      >

        <Heading 
          as={"h1"} 
          size={"3xl"} 
          textAlign={"center"} 
          mb={8}
          color={"cyan.400"}
        >
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white.100", "gray.900")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              colorPalette={"cyan"}
              border={"1px"}
              placeholder='Product Name'
							name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              colorPalette={"cyan"}
              border={"1px"}
              placeholder='Price'
							name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              colorPalette={"cyan"}
              border={"1px"}           
              placeholder='Image URL'
							name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            
            <Button colorPalette='cyan' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  )
}

export default CreatePage