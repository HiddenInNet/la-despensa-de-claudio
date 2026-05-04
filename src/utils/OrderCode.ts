export function generateOrderCode(): number {
    return Math.floor(Math.random() * 900) + 100;
}
