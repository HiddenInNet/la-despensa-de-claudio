import { useState, useEffect } from "preact/hooks";
import type { ShopItem } from "../../types/shop";
import { priceFormatter } from "../../utils/PriceCalculator";
import { cartItems } from "../../utils/nanoStores/cartItems";
import CartResume from "./CartResume";
import Delete from "../../assets/svg/delete.svg?raw";

export default function CartDrawer() {
    // 1. Estados
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [items, setItems] = useState<readonly ShopItem[]>([]);
    const [lang, setLang] = useState<string>("es");

    // 2. Efecto para escuchar la tienda y el idioma
    useEffect(() => {
        // Obtenemos el idioma de la URL de forma segura en el cliente
        if (typeof window !== "undefined") {
            setLang(window.location.pathname.split("/")[1] || "es");
        }

        const unsubscribe = cartItems.subscribe((newItems) => {
            setItems(newItems);
        });

        return () => unsubscribe();
    }, []);

    // 3. Lógica de UI y borrado
    const toggleCart = () => setIsOpen(!isOpen);
    const closeCart = () => setIsOpen(false);

    const handleRemoveItem = (indexToRemove: number) => {
        const currentItems = cartItems.get();
        // Filtramos el array para quitar el elemento específico
        const newItems = currentItems.filter((_, index) => index !== indexToRemove);
        // Actualizamos la tienda global (Nano Stores avisará a CartResume automáticamente)
        cartItems.set(newItems); 
    };

    return (
        <>
            {/* --- BOTÓN FLOTANTE --- */}
            <button
                onClick={toggleCart}
                aria-label="Abrir carrito de compras"
                class="group fixed right-5 bottom-10 z-50 flex items-center justify-center rounded-full border border-neutral-100 bg-green-800 p-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-green-700 hover:shadow-xl focus:ring-4 focus:ring-green-800/30 focus:outline-none"
            >
                <svg class="size-7 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>

                <span class="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white shadow-sm">
                    {items.length}
                </span>
            </button>

            {/* --- FONDO OSCURO (BACKDROP) --- */}
            <div
                onClick={closeCart}
                class={`fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            ></div>

            {/* --- DRAWER (PANEL LATERAL/INFERIOR) --- */}
            <section
                class={`fixed bottom-0 left-0 z-50 flex h-[80vh] max-h-screen w-full transform flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:right-5 md:bottom-0 md:left-auto md:h-150 md:w-120 md:rounded-2xl ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div class="flex items-center justify-between border-b border-neutral-100 bg-stone-50 p-6">
                    <h2 class="font-serif text-2xl text-green-800">Tu Despensa</h2>
                    <button
                        onClick={closeCart}
                        class="rounded-full p-2 text-red-500 transition-colors hover:cursor-pointer hover:bg-stone-200 hover:text-red-400 focus:outline-none"
                        aria-label="Cerrar carrito"
                    >
                        {/* SVG Close */}
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <p class="py-10 text-center text-stone-400">Tu despensa está vacía</p>
                    ) : (
                        items.map((item, index) => {
                            // Lógica matemática (exactamente igual que tu código original)
                            const isNumericFormat = !isNaN(Number(item.format));
                            const pieceWeight = Number(item.pieceWeight) / 1000;
                            const weightMultiplier = isNumericFormat ? Number(item.format) / 1000 : pieceWeight;
                            const unitPrice = (Number(item.pricePerKg) / 100) * weightMultiplier;
                            const lineTotal = unitPrice * Number(item.quantity);

                            return (
                                <div key={index} class="group relative flex gap-4 border-b border-stone-100 pb-4">
                                    <a href={`/${lang}/products/${item.id}`} class="flex flex-1 gap-4">
                                        <div class="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-stone-200">
                                            <img
                                                src={item.image ?? "/images/no-photo.avif"}
                                                alt={item.name}
                                                class="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div class="flex flex-col justify-between py-1">
                                            <div>
                                                <h3 class="text-sm font-bold leading-tight text-stone-800 md:text-base">
                                                    {item.name}
                                                </h3>
                                                <p class="mt-1 text-xs text-stone-500">
                                                    {item.quantity} x {isNumericFormat ? `${item.format} gr` : "Pieza entera"}
                                                </p>
                                            </div>
                                            <h4 class="text-xs text-stone-400">
                                                {priceFormatter.format(Number(item.pricePerKg) / 100)} / kg
                                            </h4>
                                        </div>
                                    </a>

                                    <div class="flex flex-col items-end justify-between py-1">
                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            class="cursor-pointer p-1 text-stone-300 transition-colors hover:text-red-600"
                                            aria-label="Eliminar producto"
                                            dangerouslySetInnerHTML={{__html: Delete}}
                                        >
                                        </button>

                                        <span class="text-sm font-bold text-green-800">
                                            {priceFormatter.format(lineTotal)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Tu componente CartResume anidado */}
                <CartResume />
            </section>
        </>
    );
}