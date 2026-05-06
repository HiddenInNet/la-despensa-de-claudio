import { persistentAtom } from "@nanostores/persistent";
import type { ShopItem } from "../../types/shop";

export const cartItems = persistentAtom<ShopItem[]>("SHOP_ITEMS", [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function removeCartItems(): boolean {
    cartItems.set([]);
    return cartItems.get().length === 0;
}
