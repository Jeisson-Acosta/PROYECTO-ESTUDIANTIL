import { data } from "react-router-dom";
export const registerUser =async (data) => {
    const res = await fetch (`http://localhost:3000/auth/register`,{
     method: "POST",
     headers:{ "Content-Type": "application/json"},
     body: JSON.stringify(data)   
    });
    return res.json()
}