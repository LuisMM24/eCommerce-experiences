import type { NextPage } from "next";
import { Container, Center } from "@mantine/core";
import { AuthenticationForm } from "../../components/Login/Login";

const backgroundUrl =
  "https://images.unsplash.com/photo-1474452926969-af7bfdb9ca39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80";

const centerContainerHeight = {
  height: "100vh",
  backgroundImage: `url(${backgroundUrl})`,
  backgrundRepeat: "no-repeat",
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
