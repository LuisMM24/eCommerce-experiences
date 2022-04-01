import type { NextPage } from "next";
import { Container, Center } from "@mantine/core";
import { AuthenticationForm } from "../../components/Login/Login";

const centerContainerHeight = {
  height: "100vh",
};

const index: NextPage = () => {
  return (
    <Center style={centerContainerHeight}>
      <Container size="xs" px="xs">
        <AuthenticationForm />
      </Container>
    </Center>
  );
};

export default index;
