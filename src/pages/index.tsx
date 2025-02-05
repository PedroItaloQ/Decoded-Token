import { Login, User } from "@/util/PostLogin";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

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

  /*
    
    //Caso não tenha backend para testar, há um site que você pode gerar um token: https://jwt.io
    //Nesse site, voce pega o token e descomente a função abaixo incluindo o token na constante "token"
    //para testar a decodificação na prática.
    
    const handleSubmitTeste = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBcG9sbG9Vc3VhcmlvIiwic3ViIjoicGVkcm9pdGFsb0BtZWlyZWxlc2VmcmVpdGFzLmFkdi5iciIsInJvbGUiOiJDT09SREVOQURPUiIsImV4cCI6MTczODc4NzcyN30.QKzSr3L77YfWVFldSnmuoVDQFxUWI-Z9hL34bodQXPk";

    const jwtDecoded = jwtDecode(token);

    console.log(jwtDecoded);
  }
  */

  //Na função abaixo eu uso o jwtDecode para decodificar o token que vem direto do backend
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