import {test, expect} from "@playwright/test";
import {users} from "./saucedemo.data";
import {
  addAllVisibleItems,
  finishCheckout,
  goToCart,
  login,
  startCheckout,
} from "./ui.helpers";

test.describe("Scenario 1, full checkout flow", () => {
  test("Login → add all → remove 3rd in cart → checkout → confirmed", async ({page}) => {
    await test.step("Login as standard user", async () => {
      await login(page, users.standard.username, users.standard.password);
      await expect(page).toHaveURL(/inventory.html/);
    });

    let totalAdded = 0;
    await test.step("Add all items to cart", async () => {
      totalAdded = await addAllVisibleItems(page);
      const badge = page.locator(".shopping_cart_badge");
      await expect(badge).toHaveText(String(totalAdded));
    });

    await test.step("Open cart and remove 3rd item", async () => {
      await goToCart(page);
      const cartItems = page.locator(".cart_item");
      const count = await cartItems.count();
      expect(count).toBeGreaterThanOrEqual(3);
      await cartItems.nth(2).getByRole("button", {name: "Remove"}).click();
      await expect(cartItems).toHaveCount(count - 1);
    });

    await test.step("Checkout: overview contains expected count", async () => {
      await startCheckout(page);
      const overviewItems = page.locator(".cart_item");
      const overviewCount = await overviewItems.count();
      await expect(overviewCount).toBe(totalAdded - 1);
    });

    await test.step("Finish purchase and validate confirmation", async () => {
      await finishCheckout(page);
      await expect(
        page.getByRole("heading", {name: /Thank you for your order!/i})
      ).toBeVisible();
      await expect(page.locator(".complete-text")).toBeVisible();
    });
  });
});
