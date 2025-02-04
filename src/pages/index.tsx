import { Login, User } from "@/util/PostLogin";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<User>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Login(data);
      //Aqui eu chamo a lib para decodificar o token...
      const jwtDecoded = jwtDecode(response.data.token);
      //Aqui dou um console.log() para acessar os dados decodificado do token...
      console.log("Token decodificado: ", jwtDecoded);

      alert("Login realizado com sucesso!");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}