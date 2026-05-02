// Asignamos las clases de color de Tailwind a cada tipo de mensaje
export const enum MessageType {
  OK = "bg-green-900",
  ALERT = "bg-yellow-500",
  ERROR = "bg-red-600",
}

export function showToast(text: string, type: MessageType, id?: string) {
  const toast = document.getElementById(id ?? "copy-toast");
  if (!toast) return;

  const textElement = toast.querySelector("span") || toast;
  textElement.innerText = text;

  toast.classList.remove(MessageType.OK, MessageType.ALERT, MessageType.ERROR);

  toast.classList.add(type);

  toast.classList.remove("opacity-0", "translate-y-4");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-4");
  }, 2500);
}
