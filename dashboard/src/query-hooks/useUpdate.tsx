import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const updateExperience = (id:string, data:any) => axios.patch(`http://localhost:4000/experiences/${id}`, data)

export default function useUpdate(id: string, data: any) {
    const queryClient = useQueryClient();
    return useMutation(() => updateExperience(id, data), {
        onSuccess: () => queryClient.invalidateQueries(['experiences', id]),
    });
}