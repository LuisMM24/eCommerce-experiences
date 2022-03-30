import React, { useState, useEffect } from 'react'
import { ExperienceCard } from '../ExperienceCard/ExperienceCard'

import {mockData} from '../../data/experiences';

const ExperiencesList = () => {
    // const [experiences, setExperiences] = useState([]);

    // useEffect(() => {
    //     const fetchExperiences = async () => {
    //         const result = await fetch('../../data/experience.json')
    //         const data = await result.json();
    //         setExperiences(data)
    //     }
    //     fetchExperiences();
    // }, [])
    
    return (
        <div>
            <ul>
                {mockData.map(experience => (
                <li>
                    <ExperienceCard 
                    image={experience.image} 
                    title={experience.title} 
                    description={experience.description}
                    country={experience.country}
                    />
                </li>
                ))}
            </ul>
        </div>
    )
}

export default ExperiencesList