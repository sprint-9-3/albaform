import { atom } from "jotai";
import Cookies from "js-cookie";

export const authAtom = atom(Cookies.get("accessToken") !== undefined);
