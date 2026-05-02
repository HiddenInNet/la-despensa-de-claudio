export function generateOrderCode(): string {
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  return randomNumber.toString();
}
