import type { ShopItem } from "../types/shop";

export function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  try {
    const shopList = getProductListFromLocalStorage();

    const totalItems = shopList.length;

    if (totalItems > 0) {
      badge.textContent = totalItems.toString();
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  } catch (e) {
    console.error("Error leyendo el carrito:", e);
  }
}

export function initCartMenu() {
  const openBtn = document.getElementById("cart-toggle-btn");
  const closeBtn = document.getElementById("close-cart-btn");
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");

  if (!openBtn || !drawer || !openBtn.parentNode) return;

  const newOpenBtn = openBtn.cloneNode(true);
  openBtn.parentNode.replaceChild(newOpenBtn, openBtn);

  updateCartBadge();

  function openCart() {
    if (!backdrop || !drawer) return;

    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("opacity-100", "pointer-events-auto");

    drawer.classList.remove("translate-y-full");
    drawer.classList.add("translate-y-0", "md:mb-4");
  }

  function closeCart() {
    if (!backdrop || !drawer) return;

    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    backdrop.classList.add("opacity-0", "pointer-events-none");

    drawer.classList.remove("translate-y-0", "md:mb-4");
    drawer.classList.add("translate-y-full");
  }

  newOpenBtn.addEventListener("click", openCart);
  closeBtn?.addEventListener("click", closeCart);
  backdrop?.addEventListener("click", closeCart);
}

export function getProductListFromLocalStorage(): ShopItem[] {
  const contenidoString: string = localStorage.getItem("SHOP_LIST") ?? "[]";
  return JSON.parse(contenidoString) ?? [];
}

export function setProductListFromLocalStorage(value: ShopItem[]): boolean {
  const dataString = JSON.stringify(value);
  localStorage.setItem("SHOP_LIST", dataString);
  const savedData = localStorage.getItem("SHOP_LIST");
  return savedData === dataString;
}

export function removeProductListFromLocalStorage(value: string = "SHOP_LIST") {
  localStorage.removeItem(value);
}
