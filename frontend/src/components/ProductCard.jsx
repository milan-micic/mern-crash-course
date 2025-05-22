import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode"
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Dialog,
	Text,
	useDisclosure,
	VStack,
	CloseButton
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { Toaster, toaster } from "./ui/toaster";
import { Portal } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();

	const { open, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				type: "error",
				duration: 3000
			})
		} else {
			toaster.create({
				title: "Success",
				description: message,
				type: "success",
				duration: 3000
			})
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose()
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				type: "error",
				duration: 3000
			});
		} else {
			toaster.create({
				title: "Success",
				description: "Product updated successfully",
				type: "success",
				duration: 3000
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton 
            colorPalette='cyan'
            onClick={onOpen} 
          >
            <FaEdit color="black" />
          </IconButton>
					<IconButton
						onClick={() => handleDeleteProduct(product._id)}
						colorPalette='pink'
					>
            <RiDeleteBin6Fill color="black"/>
          </IconButton>
				</HStack>
			</Box>

			<Dialog.Root
			  open={open}
			  onOpenChange={onClose}
				placement={"center"}
				// size="full"
				motionPreset="slide-in-bottom"
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Dialog Title</Dialog.Title>
						</Dialog.Header>
							<Dialog.Body>
								<VStack spacing={4}>
									<Input
									placeholder='Product Name'
									name='name'
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								/>
								<Input
									placeholder='Price'
									name='price'
									type='number'
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								/>
								<Input
									placeholder='Image URL'
									name='image'
									value={updatedProduct.image}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								/>
								</VStack>
							</Dialog.Body>
							<Dialog.Footer>
								<Button
									colorPalette='cyan'
									mr={3}
									onClick={() => handleUpdateProduct(product._id, updatedProduct)}
								>
									Update
								</Button>
								<Button variant="ghost" onClick={onClose}>
									Cancel
								</Button>
								<Dialog.CloseTrigger asChild>
									<CloseButton size="sm" />
								</Dialog.CloseTrigger>
							</Dialog.Footer>
					</Dialog.Content>
					</Dialog.Positioner>
				 </Portal>
			</Dialog.Root>
			<Toaster />
		</Box>
	);
};
export default ProductCard;