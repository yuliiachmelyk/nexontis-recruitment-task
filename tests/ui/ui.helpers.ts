import {Page, expect} from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", {name: "Login"}).click();
}

export async function addAllVisibleItems(page: Page) {
  const addButtons = page.locator('[data-test^="add-to-cart-"]');
  // ensure items are rendered and at least the first add button is visible
  await expect(addButtons.first()).toBeVisible();
  const count = await addButtons.count();
  for (let i = 0; i < count; i++) {
    // re-query the first remaining add button each iteration to avoid stale/nth index issues
    const btn = page.locator('[data-test^="add-to-cart-"]').first();
    // make sure the button is in view before clicking
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }
  return count;
}

export async function goToCart(page: Page) {
  // use the shopping cart link selector which exists on the page
  const cartLink = page.locator('.shopping_cart_link');
  await expect(cartLink).toBeVisible();
  await cartLink.click();
}

export async function startCheckout(page: Page) {
  await page.getByRole("button", {name: "Checkout"}).click();
  await page.getByPlaceholder("First Name").fill("Julia");
  await page.getByPlaceholder("Last Name").fill("QA");
  await page.getByPlaceholder("Zip/Postal Code").fill("50-100");
  await page.getByRole("button", {name: "Continue"}).click();
}

export async function finishCheckout(page: Page) {
  await page.getByRole("button", {name: "Finish"}).click();
}

export async function inventoryItemNames(page: Page) {
  return page.locator(".inventory_item_name");
}

export async function assertSortedAscending(page: Page) {
  const names = await page.locator(".inventory_item_name").allInnerTexts();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
}
