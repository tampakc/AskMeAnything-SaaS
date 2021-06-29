import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("LoginToken");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken !== null) {
      localStorage.setItem("LoginToken", userToken);
      setToken(userToken?.token);

      window.location.reload();
    } else {
      localStorage.removeItem("LoginToken");

      window.location.assign("/");
    }
  };

  return { token, setToken: saveToken };
}
