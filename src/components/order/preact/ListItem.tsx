import type { ShopItem } from '../../../types/shop';
import { priceFormatter } from '../../../utils/PriceCalculator';

export default function ListItem ({item}: {item: ShopItem}) {

    const isNumericFormat = !isNaN(Number(item.format));
    const pieceWeight = Number(item.pieceWeight) / 1000;
    const weightMultiplier = isNumericFormat
        ? Number(item.format) / 1000
        : pieceWeight;

    const unitPrice = (Number(item.pricePerKg) / 100) * weightMultiplier;
    const lineTotal = unitPrice * Number(item.quantity);

    return (
        <div class="w-full px-2">
            <span class="text-base font-bold">{item.name}</span>
            <div class="flex flex-row">
                <div class="w-4/6 pl-4 text-sm">
                    <div class="flex flex-col">
                        <span>
                            {item.quantity} x {isNumericFormat ? item.format + " gr" : "Pieza entera"}
                        </span>
                        <span>
                            {priceFormatter.format(Number(item.pricePerKg) / 100)} / kg
                        </span>
                    </div>
                </div>
                <div class="flex w-2/6 items-end justify-end">
                    <span>{priceFormatter.format(lineTotal)}</span>
                </div>
            </div>
        </div>
    );

}