import React from 'react'
import { Container, Center } from '@mantine/core';
import { AuthenticationForm } from "../../components/Login/Login"

const index = () => {
    return (
    <Center>
        <Container size="xs" px="xs">
            <AuthenticationForm />
        </Container>
    </Center>
    )
}

export default index