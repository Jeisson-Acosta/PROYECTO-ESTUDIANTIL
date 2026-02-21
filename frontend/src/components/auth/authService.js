//conecta con el backend y envia los datos
export const registerUser =async (data) => {
    const res = await fetch (`http://localhost:3000/auth/register`,{
     method: "POST",
     //convierte los datos a JSON
     headers:{ "Content-Type": "application/json"},
     body: JSON.stringify(data)   
    });
    return res.json()
}