import type { NextPage } from "next";
import { Container, Center } from "@mantine/core";
import { AuthenticationForm } from "../../components/Login/Login";
import { AuthContextProvider } from "../../context/authContext";

const centerContainerHeight = {
  height: "100vh",
};

const index: NextPage = () => {
  return (
    <AuthContextProvider>
      <Center style={centerContainerHeight}>
        <Container size="xs" px="xs">
          <AuthenticationForm />
        </Container>
      </Center>
    </AuthContextProvider>
  );
};

export default index;
