import { supabase } from "../db/supabase";
import type { ShopItem } from "../types/shop";
import { getProductListFromLocalStorage } from "./ShopCartScripts";

interface Prod {
    id: string;
    price: string; // Precio por Kg en céntimos (ej: 1990 para 19,90€)
    weight: string; // Peso medio de una pieza en gramos (ej: 3000 para 3kg)
}

export async function calculatePrice(): Promise<number> {
    const productList: ShopItem[] = getProductListFromLocalStorage();
    
    if (productList.length === 0) return 0;

    const ids = productList.map((p) => p.id);

    const { data, error } = await supabase
        .from("products")
        .select("id, price, weight")
        .in("id", ids);

    if (error) {
        console.error("Error al obtener productos de la DB:", error);
        return 0;
    }

    const dbProducts: Prod[] = data ?? [];

    const totalCents = productList.reduce((acc, localItem) => {
        const dbProduct = dbProducts.find((p) => p.id === localItem.id);

        if (!dbProduct) {
            console.warn(`Producto con ID ${localItem.id} no encontrado en la base de datos.`);
            return acc;
        }

        const lineTotal = calculateProductPrice(dbProduct, localItem);
        
        return acc + lineTotal;
    }, 0);

    return totalCents; 
}

function calculateProductPrice(dbProduct: Prod, localProd: ShopItem): number {
    const quantity = Number(localProd.quantity);
    const pricePerKg = Number(dbProduct.price); // Dato fiable de la DB
    const dbPieceWeight = Number(dbProduct.weight); // Dato fiable de la DB (en gramos)

    // Comprobamos si el formato es numérico (gramos) o "pieza entera"
    const isNumericFormat = !isNaN(Number(localProd.format));

    // Si es numérico (ej: 250gr), dividimos por 1000 para sacar los kilos.
    // Si es pieza entera, usamos el peso de la pieza de la DB dividido por 1000.
    const weightInKilos = isNumericFormat 
        ? Number(localProd.format) / 1000 
        : dbPieceWeight / 1000;
            
    // Precio de la unidad = (Precio/Kg) * Peso en Kg
    const unitPrice = pricePerKg * weightInKilos;
    
    // Total de la línea = Precio unidad * Cantidad
    return Math.round(unitPrice * quantity);
}