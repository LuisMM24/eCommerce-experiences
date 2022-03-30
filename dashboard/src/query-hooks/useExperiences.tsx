import axios from 'axios';
import { useQuery } from 'react-query';

const fetchExperiences = () => axios.get('http://localhost:4000/experiences').then(result => result.data)

export default function useExperiences() {
    return useQuery('experiences', fetchExperiences);
}