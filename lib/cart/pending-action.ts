export const PENDING_CART_ACTION_KEY = "wazni-pending-cart-action";

export type PendingCartAction = { productId: string | number; quantity: number; destination: "/bag" | "/checkout" };

export function savePendingCartAction(action: PendingCartAction) {
  window.sessionStorage.setItem(PENDING_CART_ACTION_KEY, JSON.stringify(action));
}

export function consumePendingCartAction(): PendingCartAction | null {
  try {
    const saved = window.sessionStorage.getItem(PENDING_CART_ACTION_KEY);
    window.sessionStorage.removeItem(PENDING_CART_ACTION_KEY);
    if (!saved) return null;
    const action = JSON.parse(saved) as PendingCartAction;
    if (!action.productId || !Number.isFinite(action.quantity) || action.quantity < 1) return null;
    return action;
  } catch {
    window.sessionStorage.removeItem(PENDING_CART_ACTION_KEY);
    return null;
  }
}
