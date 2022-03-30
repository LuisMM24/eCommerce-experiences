import { getUserToken } from "../firebase/firebase";

interface IUserData {
  firstName: string;
  lastName: string;
}

export const syncUserData = async (
  type: string,
  userData?: IUserData | null
): Promise<Response> => {
  const bearerToken = await getUserToken();
  const param = type === "register" ? "sign-up" : "login";
  return fetch(`http://localhost:4000/users/${param}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${bearerToken}`,
    },
    body: userData ? JSON.stringify(userData) : null,
  });
};
