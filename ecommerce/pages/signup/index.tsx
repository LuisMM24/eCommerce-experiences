import React from 'react'
import { Container, Center } from '@mantine/core';
import SignUp from '../../components/SignUp/SignUp'

const index = () => {
    return (
    <Center>
        <Container size="xs" px="xs">
            <SignUp />
        </Container>
    </Center>
    )
}

export default index