import { useState, useEffect } from "preact/hooks";
import { calculatePrice, priceFormatter } from "../../utils/PriceCalculator";
import { cartItems, removeCartItems } from "../../utils/nanoStores/cartItems";
import Delete from "../../assets/svg/delete.svg?raw";

export default function CartResume() {
    
    const [totalFormatted, setTotalFormatted] = useState<string>("0,00 €");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        
        const unsubscribe = cartItems.subscribe(async (items) => {
            const total = await calculatePrice(items);
            const formatted = priceFormatter.format(total / 100);
            setTotalFormatted(formatted);
        });

        
        return () => unsubscribe();
    }, []);

    const handleRemoveOrder = () => {
        removeCartItems();
    };

    const handleCheckout = async () => {
        // const items: readonly ShopItem[] = cartItems.get();

        // if (items.length === 0) {
        //     alert("El carrito está vacío");
        //     return;
        // }

        // setIsProcessing(true); // Bloqueamos el botón para evitar dobles clics

        // try {
        //     const response = await fetch("/api", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ items: items }),
        //     });

        //     if (response.ok) {
        //         removeCartItems();
        //         // De nuevo, no hace falta recalcular nada a mano. removeCartItems se encarga.
        //     } else {
        //         alert("Hubo un problema al procesar el pago.");
        //     }
        // } catch (error) {
        //     console.error("Error al enviar el pedido:", error);
        //     alert("Error de conexión al enviar el pedido.");
        // } finally {
        //     setIsProcessing(false);
        // }
    };

    return (
        <div class="border-t border-neutral-100 bg-stone-50 p-6 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
            <div class="mb-4 flex items-center justify-between">
                <span class="text-sm font-medium text-stone-500">Total estimado</span>
                <span class="text-2xl font-bold text-green-800">
                    {totalFormatted}
                </span>
            </div>
            <div class="flex flex-row gap-2">
                <button
                    onClick={handleRemoveOrder}
                    class="flex items-center justify-center rounded-md bg-red-500 px-4 text-white transition-colors hover:cursor-pointer hover:bg-red-400 focus:outline-none"
                    aria-label="Vaciar carrito"
                    disabled={isProcessing}
                    dangerouslySetInnerHTML={{ __html: Delete }}
                ></button>
                <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    class="w-full rounded-md bg-green-800 py-4 text-center text-sm font-bold tracking-widest text-white uppercase shadow-md transition-colors hover:cursor-pointer hover:bg-green-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                >
                    {/* {isProcessing ? "Procesando..." : "Hacer pedido"} */}
                    Por ahora no disponemos de esta funcionalidad
                </button>
            </div>
        </div>
    );
}