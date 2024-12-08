import { useSetAtom } from "jotai";
import { authAtom } from "@/atoms/tokenAtom";
import Cookies from "js-cookie";

const useToken = () => {
  const setToken = useSetAtom(authAtom);

  const setTokens = (
    accessToken: string | null,
    refreshToken: string | null
  ) => {
    if (accessToken === null) {
      Cookies.remove("accessToken");
      setToken(false);
    } else {
      Cookies.set("accessToken", accessToken);
      setToken(true);
    }

    if (refreshToken === null) {
      Cookies.remove("refreshToken");
    } else {
      Cookies.set("refreshToken", refreshToken);
    }
  };

  const getAccessToken = () => Cookies.get("accessToken");
  const getRefreshToken = () => Cookies.get("refreshToken");

  return { setTokens, getAccessToken, getRefreshToken };
};

export default useToken;
