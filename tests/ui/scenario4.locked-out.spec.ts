import {test, expect} from "@playwright/test";
import {users} from "./saucedemo.data";

test("Scenario 4, locked_out_user cannot login", async ({page}) => {
  await page.goto("/");
  await page.getByPlaceholder("Username").fill(users.locked.username);
  await page.getByPlaceholder("Password").fill(users.locked.password);
  await page.getByRole("button", {name: "Login"}).click();
  await expect(page.getByTestId("error")).toContainText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});
