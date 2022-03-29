import type { NextPage } from "next";
import { Container, Center } from "@mantine/core";
import { AuthenticationForm } from "../../components/Login/Login";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

const centerContainerHeight = {
  height: "100vh",
};

const index: NextPage = () => {
  const auth = useContext(authContext);
  return (
    <Center style={centerContainerHeight}>
      <Container size="xs" px="xs">
        <AuthenticationForm />
      </Container>
    </Center>
  );
};

export default index;
