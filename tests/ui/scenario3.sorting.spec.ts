import {test, expect} from "@playwright/test";
import {users} from "./saucedemo.data";
import {assertSortedAscending, login} from "./ui.helpers";

test("Scenario 3, standard_user: sort products by name A→Z and validate", async ({page}) => {
  await login(page, users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory.html/);

  // Use getByTestId (configured to match data-test attribute) for the sorter
  const sorter = page.getByTestId("product-sort-container");
  await expect(sorter).toBeVisible();
  await sorter.selectOption("az");
  await assertSortedAscending(page);
});
