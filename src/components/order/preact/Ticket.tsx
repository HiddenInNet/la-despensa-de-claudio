import { useEffect, useState } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { orderCode, orderName, orderPhone, totalPrice } from "../../../utils/nanoStores/order";
import { bussiness_name } from "../../../docs/bussiness-data.json";
import { generateOrderCode } from "../../../utils/OrderCode";
import { getProductListFromLocalStorage } from "../../../utils/ShopCartScripts";
import ListItem from "./ListItem.tsx";
import type { ShopItem } from "../../../types/shop.ts";
import { calculatePrice, priceFormatter } from "../../../utils/PriceCalculator.ts";

export default function Ticket() {
    const currentOrderCode = useStore(orderCode);
    const [itemsLS, setItemsLS] = useState<ShopItem[]>([]);
    const price = useStore(totalPrice);

    const client = useStore(orderName);
    const phone = useStore(orderPhone);

    useEffect(() => {
        const savedCode = orderCode.get();
        if (savedCode === '0' || !savedCode) {
            const newCode = generateOrderCode().toString();
            orderCode.set(newCode);
        }

        const loadedItems = getProductListFromLocalStorage();
        if (loadedItems) {
            setItemsLS(loadedItems);

            const updatePrice = async () => {
                const calculatedTotal = await calculatePrice(loadedItems);
                totalPrice.set(calculatedTotal);
            };

            updatePrice();
        }
    }, []);

    return (
        <div
            id="ticket-container"
            class="shadow-bg-neutral-500 my-4 h-fit w-5/6 min-w-80 justify-self-center border border-t-6 bg-neutral-200 shadow-[0_10px_20px] shadow-neutral-500 md:w-xl"
        >
            <section id="ticket-content" class="flex w-full flex-col items-center p-4">
                <span class="font-story-script text-3xl">{bussiness_name}</span>

                <div
                    id="order-code-container"
                    class="m-2 rounded-md border border-dashed p-4 text-center"
                >
                    <p class="mb-1 text-xs font-semibold text-neutral-500 uppercase select-none">
                        Código de Pedido
                    </p>
                    <p
                        id="order-code"
                        class="font-mono text-4xl font-black tracking-widest text-neutral-900 select-text pointer-events-none"
                    >
                        {currentOrderCode}
                    </p>
                </div>

                <div id="form-data-render" class="w-full flex flex-col gap-2 px-2 py-4">
                    <p class="w-full text-neutral-700">
                        <span class="font-bold pr-2">Cliente:</span> 
                        {client}
                    </p>
                    <p class="w-full text-neutral-700">
                        <span class="font-bold pr-2">Teléfono:</span>
                        {phone}
                    </p>
                </div>

                <span class="font-bold uppercase">Productos</span>

                <hr class="my-2 w-5/6 border-dashed" />

                <div id="ticket-product-list" class="flex w-full flex-col items-center gap-2">
                    {(itemsLS || []).map((i, index) => <ListItem key={i.id || index} item={i} />)}
                </div>

                <hr class="my-2 w-5/6 border-dashed" />

                <div class="flex w-full justify-between p-2 text-xl font-bold">
                    <span class="uppercase">Total</span>
                    <span id="ticket-total">{priceFormatter.format(price / 100)}</span>
                </div>
            </section>
        </div>
    );
}