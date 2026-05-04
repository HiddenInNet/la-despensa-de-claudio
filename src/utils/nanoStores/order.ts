import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";


export const orderCode = persistentAtom<string>("order-code", "0");

export const orderName = atom<string>("");
export const orderPhone = atom<string>("");

export const totalPrice = atom<number>(0); 