import React, { useState, useEffect } from 'react'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import { Title, ScrollArea } from '@mantine/core';
import useExperiences from '../../query-hooks/useExperiences';
import './ExperienceList.css';

const ExperiencesList = () => {

    const experiences = useExperiences();
    
    return (
        <>
            {experiences.status === 'loading' && <p>Loading...</p>}
            {experiences.status === 'error' && <p>Could not fetch items</p>}
            {experiences.status === 'success' && 
            <div className="list-container">
                <Title order={3}>Experiences</Title>
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