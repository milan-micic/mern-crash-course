import { Box } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"

function App() {

  return (
    <Box minH={"100vh"} >
      <Navbar bg={useColorModeValue("gray.100", "gray.900")} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
