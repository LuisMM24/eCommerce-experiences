export const updateExperience = async ({ id, ...data }: {id: string}) => {
    const response = await fetch(
    `http://localhost:4000/experiences/${id}`,
    {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    }
);

if (!response.ok) {
    throw new Error(response.json().message);
}

return response.json();
};

export const deleteExperience = async (id: string) => {
    const response = await fetch(
        `http://localhost:4000/experiences/${id}`,
        {
        method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return true;
    };