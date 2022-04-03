import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { TextInput, Checkbox, Text, Title, Textarea, Button, Group, Box, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from "react-query";
// import useUpdate from '../../query-hooks/useUpdate'
import {updateExperience} from '../../api/Api'
import useExperience from '../../query-hooks/useExperience';
import ImgDropzone from '../Dropzone/Dropzone';
import { AxiosResponse } from 'axios';
import { MutateOptions } from 'react-query';

// interface FormValues {
//     title: string,
//     location: string,
//     description: string,
//     group: string,
//     level: string,
//     dates: string,
//     price: number,
//     availableSlots: number,
//     bookedSlots: number,
// }

const Experience = () => {
    // const [id, setId] = useState(null);
    // const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { pathname } = useLocation();
    const id = pathname.split('/')[3];

    const {isLoading, isError, isSuccess, data } = useExperience(id) || {};
    const { mutateAsync, isLoading: isMutating } = useMutation(updateExperience , {
        onSuccess: () => queryClient.invalidateQueries(['experiences', id]),
    })

    const handleSubmit = async (formData: { title?: string; location?: string; description?: string; group?: string; level?: string; dates?: string; price?: string; availableSlots?: string; bookedSlots?: string; id?: string; }) => {
        await mutateAsync({id, ...formData})
        navigate("/dashboard/experiences")
    }
    
    
    const form = useForm({
        initialValues: {
            title:'',
            location:'',
            description:'',
            group:'',
            level:'',
            dates:'',
            price:'',
            availableSlots:'',
            bookedSlots:'',
            // termsOfService: false,
        },
        
        validate: {
            
        },
    });

    // const { mutate } = useUpdate();
    // const handleSubmit = async (info: MutateOptions<AxiosResponse<any, any>, unknown, void, unknown> | undefined) => {
    //     mutate(id, info);
    //     navigate('/dashboard/experiences')
    // }
    
    useEffect(() => {

        form.setValues({
            title: `${data?.title}`, 
            location: `${data?.location}`,
            description: `${data?.description}`,
            group: `${data?.group}`,
            level: `${data?.level}`,
            dates: `${data?.dates}`,
            price: `${data?.price}`,
            availableSlots: `${data?.availableSlots}`,
            bookedSlots: `${data?.bookedSlots}`,
        })
    }, [isSuccess])


    return (
        <Container p={32}>
            {isLoading && <span>Loading...</span>}
            {isError && <span>Error: there was an error loading this item. Please try again.</span>}
            {isSuccess && 
            <Box sx={{ maxWidth: 800, gap: 'md' }} mx="auto">
                <Title order={3}>{data?.title}</Title>
                <form style={{width: '500px'}}  onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput mt={10} label="Title" {...form.getInputProps('title')} required />
                    <TextInput mt={10} label="Location" {...form.getInputProps('location')} required />
                    <Textarea mt={10} label="Description" autosize minRows={5} {...form.getInputProps('description')} required/>
                    <Textarea mt={10} required autosize label="Group" {...form.getInputProps('group')} />
                    <TextInput mt={10} required label="Dates" {...form.getInputProps('dates')} />
                    <Box mt={10} style={{display: 'flex', justifyContent: 'space-between', gap: 50}}>
                        <TextInput required label="Price" {...form.getInputProps('price')} />
                        <TextInput required label="Booked" {...form.getInputProps('bookedSlots')} />
                        <TextInput required label="Available" {...form.getInputProps('availableSlots')} />
                    </Box>
                    <Title order={6} mt={10}>Images</Title>
                    <Box mt={10} sx={{border: '1px solid lightgray', borderRadius: 6, padding: 12, }}>
                        {data?.photos.map((photo:string) => <img key={photo} src={`${photo}`} style={{height: 100}}/>)}
                    </Box>
                    {/* <Group mt={20}>
                        <ImgDropzone />
                    </Group> */}
                    <Group position="right" mt="md">
                        <Button variant='outline' type="button" component={Link} to="/dashboard/experiences">Back</Button>
                        {isMutating ? <Button type="submit" loading>Submit</Button> : <Button type="submit">Submit</Button>}
                    </Group>
                </form>
            </Box>}
        </Container>
);
}

export default Experience