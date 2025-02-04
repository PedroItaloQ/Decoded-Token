import { Login, User } from "@/util/PostLogin";
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
      console.log("Login successful:", response.data);
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