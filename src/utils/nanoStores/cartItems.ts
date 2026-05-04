import { map } from "nanostores";
import type { ShopItem } from "../../types/shop";

export const cartItems = map<Record<string, ShopItem>>({});
