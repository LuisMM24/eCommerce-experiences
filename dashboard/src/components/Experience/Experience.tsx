import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { TextInput, Checkbox, Button, Group, Box, Skeleton } from '@mantine/core';
import { useForm } from '@mantine/form';

import useExperience from '../../query-hooks/useExperience';

const Experience = () => {
    const [values, setValues] = useState({});
    const { pathname } = useLocation();
    const id = pathname.split('/')[3];
    const {isLoading, isError, isFetching, data, error } = useExperience(id) || {};

    const form = useForm({
        initialValues: {
            title:'',
            // termsOfService: false,
        },
        
        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    // console.log(form)
    useEffect(() => {
        // setValues(data)
        form.setValues({title: 'Title'})
    }, [isLoading, data])

    return (
        <>
            {isLoading && <span>Loading...</span>}
            {!isLoading && 
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                    required
                    label="Title"
                    placeholder="your@email.com"
                    {...form.getInputProps('title')}
                    />

                    {/* <Checkbox
                    mt="md"
                    label="I agree to sell my privacy"
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    /> */}

                    <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>}
        </>
);
}

export default Experience