import axios from 'axios';
import { useQuery } from 'react-query';

const fetchExperience = (id:string) => axios.get(`http://localhost:4000/experiences/${id}`).then(result => result.data)

export default function useExperience(id:string) {
    return useQuery(['experiences', id], () => fetchExperience(id));
}