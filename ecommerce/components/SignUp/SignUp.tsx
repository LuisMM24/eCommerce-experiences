import React from 'react';
import { TextInput, Checkbox, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

import { PasswordStrength } from './PasswordStrength/PasswordStrength'

const SignUp = () => {
    const form = useForm({
        initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsOfService: false,
        },

        validate: {
        firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
        lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
        
        },
    });

    return (
        <Box sx={{ maxWidth: 500 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
            required
            label="First Name"
            placeholder="First Name"
            {...form.getInputProps('firstName')}
            />
            <TextInput
            required
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
            />
            <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
            />
            <PasswordStrength />
            <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
            />

            <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <Group position="right" mt="md">
            <Button type="submit" onClick={() => form.validate()}>Submit</Button>
            </Group>
        </form>
        </Box>
    );
    }

export default SignUp