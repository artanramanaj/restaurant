import type { NavigateFunction } from "react-router-dom";

export const CART_SECTION_ID = "cart";

export function scrollToCartSection() {
  document.getElementById(CART_SECTION_ID)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function goToCartSection(
  navigate: NavigateFunction,
  pathname: string,
) {
  if (pathname === "/") {
    scrollToCartSection();
  } else {
    navigate("/", { state: { scrollToCart: true } });
  }
}
