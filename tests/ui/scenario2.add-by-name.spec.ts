import {test, expect} from '@playwright/test';
import {users} from './saucedemo.data';
import {login} from './ui.helpers';

const ITEM_NAME = 'Sauce Labs Backpack';

test('Scenario 2, problem_user: add one item by name from details page', async ({page}) => {
  await login(page, users.problem.username, users.problem.password);

  // Click the Add button directly on the inventory list item (more stable than details for problem_user)
  const item = page.locator('.inventory_item').filter({hasText: ITEM_NAME}).first();
  const addButton = item.locator('[data-test^="add-to-cart-"]');
  await expect(addButton).toBeVisible();
  await addButton.click();

  // ensure the cart badge shows 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);

  await expect(page.locator('.cart_item').filter({hasText: ITEM_NAME})).toBeVisible();
});
