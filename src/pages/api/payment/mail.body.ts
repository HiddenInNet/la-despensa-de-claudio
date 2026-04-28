import type { ShopItem } from "../../../types/shop";

export function mailHTML(items: ShopItem[]) {
    let totalCents = 0;

    const rows = items.map(item => {
        const isNumeric = !isNaN(Number(item.format));
        const weightMultiplier = isNumeric ? Number(item.format) / 1000 : Number(item.quantity); 
        const unitPrice = (Number(item.pricePerKg) / 100) * weightMultiplier;
        const lineTotal = unitPrice * Number(item.quantity);
        
        totalCents += lineTotal * 100;

        return `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #44403c;">
                    <strong>${item.name}</strong><br>
                    <span style="color: #78716c; font-size: 14px;">${item.quantity} x ${isNumeric ? item.format + ' gr' : item.format}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #14532d; font-weight: bold; text-align: right;">
                    ${lineTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </td>
            </tr>
        `;
    }).join('');

    const finalTotal = (totalCents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #14532d; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Nuevo Pedido</h1>
        </div>
        
        <div style="padding: 30px;">
            <p style="color: #44403c; font-size: 16px; margin-bottom: 24px;">Has recibido un nuevo pedido con los siguientes artículos:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                ${rows}
                <tr>
                    <td style="padding: 16px 12px; font-weight: bold; color: #44403c; text-align: right; font-size: 18px;">
                        Total Estimado:
                    </td>
                    <td style="padding: 16px 12px; font-weight: bold; color: #14532d; text-align: right; font-size: 20px;">
                        ${finalTotal}
                    </td>
                </tr>
            </table>

            <p style="color: #78716c; font-size: 14px; text-align: center; border-top: 1px solid #e5e5e5; padding-top: 20px;">
                La Despensa de Claudio
            </p>
        </div>
    </div>
    `;
}