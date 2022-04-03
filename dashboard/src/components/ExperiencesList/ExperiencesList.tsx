import React, { useState, useEffect, useContext } from 'react'
import { Title, Group, Button } from '@mantine/core';
import {authContext} from '../../context/authContext'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import useExperiences from '../../query-hooks/useExperiences';
import './ExperienceList.css';

const ExperiencesList = () => {
    const {currentUser} = useContext(authContext)
    const experiences = useExperiences();

    return (
        <>
            {!currentUser && <p>Please log in</p>}
            {experiences.status === 'loading' && <p>Loading...</p>}
            {experiences.status === 'error' && <p>Could not fetch items</p>}
            {(experiences.status === 'success' && currentUser) && 
            <div className="list-container">
                <Group position='apart'>
                <Title order={3}>Experiences ({experiences.data.length})</Title>
                <Button>+ CREATE</Button>
                </Group>
                <ul className="experiences-list">
                    {experiences.data.map((item: { _id: any; photos: string[]; title: string; availableSlots: string; bookedSlots: string; level: string; location: string; }) => (
                    <li key={item._id}>
                        <ExperienceCard 
                                image={item.photos[0]}
                                title={item.title}
                                availableSlots={item.availableSlots}
                                bookedSlots={item.bookedSlots}
                                level={item.level}
                                location={item.location}
                                _id={item._id}                   
                                />
                    </li>
                    ))}
                </ul>
            </div>}
        </>
    )
}

export default ExperiencesList