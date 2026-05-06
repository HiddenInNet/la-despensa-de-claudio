import type { ProductDetail } from "../../../types/products";
import { products_categories, weight_options } from "../../../docs/bussiness-data.json";
import { useState } from "preact/hooks";
import type { ShopItem } from "../../../types/shop";
import { cartItems } from "../../../utils/nanoStores/cartItems";

interface Props {
    product: ProductDetail;
}

export default function ProductAdd({product}: Props) {

    const divisibleCategories = products_categories.flatMap((c) =>
        c.divisible ? [c.slug] : []
    );
    const isDivisible = divisibleCategories.includes(product.category);

    const [selectedWeight, setSelectedWeight] = useState<string>(isDivisible ? "100" : "whole");
    const [customWeight, setCustomWeight] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [isAdded, setIsAdded] = useState<boolean>(false); // Para el feedback del botón

    const weightOptions = weight_options;

    const handleAddToCart = () => {
        let finalWeight = selectedWeight;

        // Validación del peso personalizado
        if (selectedWeight === "custom") {
            const customValue = parseInt(customWeight);
            if (!customValue || customValue < 100) {
                alert("Por favor, introduce una cantidad válida (mínimo 100g)");
                return;
            }
            finalWeight = customValue.toString();
        }

        const item: ShopItem = {
            id: product.id,
            name: product.name,
            image: product.url,
            pricePerKg: product.price,
            pieceWeight: product.weight,
            format: finalWeight,
            quantity: quantity,
        };

        try {
            const localData = [...cartItems.get()]; // Clonamos el array actual
            const existingItemIndex = localData.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.format === item.format
            );

            if (existingItemIndex !== -1) {
                localData[existingItemIndex].quantity += item.quantity;
            } else {
                localData.push(item);
            }

            cartItems.set(localData);
            
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 1500);

        } catch (e) {
            console.error("Error al actualizar el carrito:", e);
        }
    };

    return (
        <div class="mt-8 flex flex-col gap-8">
            {isDivisible && (
                <div>
                    <span class="mb-4 block text-xs font-bold tracking-widest text-stone-800 uppercase">
                        Selecciona el formato:
                    </span>
                    <div class="flex flex-wrap gap-3" id="weight-selector">
                        {weightOptions.map((option) => {
                            const isSelected = selectedWeight === option.id;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setSelectedWeight(option.id)}
                                    class={`rounded-sm border-2 px-5 py-2 text-sm font-medium transition-colors hover:cursor-pointer ${
                                        isSelected
                                            ? "border-green-800 bg-green-800 text-white"
                                            : "border-stone-200 text-stone-600 hover:border-green-800 hover:text-green-800"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Input condicional de peso personalizado */}
                    {selectedWeight === "custom" && (
                        <div class="animate-fade-in mt-4 flex items-center gap-3">
                            <input
                                type="number"
                                min="100"
                                step="50"
                                placeholder="Ej: 250"
                                value={customWeight}
                                onChange={(e) => setCustomWeight((e.target as HTMLInputElement).value)}
                                class="w-28 rounded-sm border border-stone-300 p-2.5 text-stone-800 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none"
                            />
                            <span class="text-sm text-stone-500">
                                gramos (mín. 100g)
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div class="flex flex-col gap-4 sm:flex-row">
                {/* Controles de cantidad */}
                <div class="flex w-fit items-center justify-center rounded-sm border border-stone-300 bg-white py-4">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        class="h-full px-4 text-stone-500 transition-colors hover:cursor-pointer hover:text-green-800 focus:outline-none"
                        aria-label="Disminuir cantidad"
                    >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        readOnly
                        class="pointer-events-none w-12 bg-transparent text-center font-bold text-stone-800 focus:outline-none"
                    />
                    <button
                        onClick={() => setQuantity((q) => q + 1)}
                        class="h-full px-4 text-stone-500 transition-colors hover:cursor-pointer hover:text-green-800 focus:outline-none"
                        aria-label="Aumentar cantidad"
                    >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Botón de añadir al carrito dinámico */}
                <button
                    onClick={handleAddToCart}
                    class={`flex w-full items-center justify-center rounded-sm px-8 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-md transition-colors hover:cursor-pointer ${
                        isAdded ? "bg-green-600" : "bg-green-800 hover:bg-green-900"
                    }`}
                >
                    {isAdded ? "¡Añadido!" : "Añadir a la cesta"}
                </button>
            </div>
        </div>
    );
}