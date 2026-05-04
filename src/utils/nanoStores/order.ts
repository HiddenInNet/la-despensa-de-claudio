import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const orderCode = persistentAtom<string>("order-code", "0");

export const orderName = atom<string>("");
export const orderPhone = atom<string>("");

export const totalPrice = atom<number>(0);

export function checkOrderName(name: string): boolean {
    return name.length > 0;
}

export function checkPhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/[\s-]/g, "");

    const spanishPhoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;

    return spanishPhoneRegex.test(cleaned);
}
