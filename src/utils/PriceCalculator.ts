import { supabase } from "../db/supabase";
import type { ProductDetail } from "../types/products";
import type { ShopItem } from "../types/shop";
import { getProductListFromLocalStorage } from "./ShopCartScripts";

/**
 * Calcula el precio total de los elementos de la lista de compra
 * comparandolos con la base de datos para que no puedan ser
 * manipulados los precios.
 *
 * @param shopProductsLS | undefined
 * @returns totalCents
 */
export async function calculatePrice(
    // ✅ CORRECCIÓN 1: Sintaxis correcta de readonly y parámetro opcional
    shopProductsLS?: readonly ShopItem[],
): Promise<number> {
    // ✅ CORRECCIÓN 2: El array de fallback también debe aceptar el readonly
    const productsLS: readonly ShopItem[] =
        shopProductsLS ?? getProductListFromLocalStorage();

    const productsDB: ProductDetail[] =
        await getProductsOnListFromDatabase(productsLS);

    const totalCents = productsLS.reduce((acc, localItem) => {
        const dbProduct = productsDB.find((p) => p.id === localItem.id);

        if (!dbProduct) {
            console.warn(
                `Producto con ID ${localItem.id} no encontrado en la base de datos.`,
            );
            return acc;
        }

        const lineTotal = calculateProductPrice(dbProduct, localItem);

        return acc + lineTotal;
    }, 0);

    return totalCents;
}

export function calculateProductPrice(
    dbProduct: ProductDetail,
    // Aquí no es estrictamente necesario el readonly porque accedemos a sus propiedades individuales
    localProd: ShopItem | Readonly<ShopItem>,
): number {
    const quantity = Number(localProd.quantity);
    const pricePerKg = Number(dbProduct.price);
    const dbPieceWeight = Number(dbProduct.weight);

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

export async function getProductsOnListFromDatabase(
    // ✅ CORRECCIÓN 3: Propagamos el readonly aquí para que no choque con la función anterior
    shopProductsLS?: readonly ShopItem[],
): Promise<ProductDetail[]> {
    const productsLS: readonly ShopItem[] =
        shopProductsLS ?? getProductListFromLocalStorage();

    if (!Array.isArray(productsLS) || productsLS.length === 0) return [];

    const ids = productsLS.map((p) => p.id);

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("id", ids);

    if (error) {
        console.error("Error al obtener productos de la DB:", error);
        return [];
    }

    const dbProducts: ProductDetail[] = data ?? [];

    return dbProducts;
}

export const priceFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
});
