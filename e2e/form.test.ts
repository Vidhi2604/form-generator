import { test, expect } from "@playwright/test";

test.describe("Dynamic Form Generator E2E Tests", () => {

  // Test 1: Ensure the main interface renders properly
  test("JSON Editor and Form Render", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check for JSON editor visibility
    const editor = page.locator(".jsoneditor");
    expect(await editor.isVisible()).toBeTruthy();

    // Check for form visibility
    const form = page.locator("form");
    expect(await form.isVisible()).toBeTruthy();
  });

  // Test 2: Real-time form updates based on JSON schema changes
  test("Real-Time Form Updates", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Update JSON schema to add a new field
    const jsonEditor = page.locator(".jsoneditor textarea");
    await jsonEditor.fill(`{
      "formTitle": "Dynamic Test Form",
      "fields": [
        {
          "id": "newField",
          "type": "text",
          "label": "New Field",
          "required": true
        }
      ]
    }`);

    // Check if the new field is added to the form
    const newField = page.locator("label:text('New Field')");
    expect(await newField.isVisible()).toBeTruthy();
  });

  // Test 3: Validate error messages for required fields
  test("Form Validation Errors", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Submit the form without filling in any fields
    await page.click("button[type='submit']");

    // Check for validation error messages
    const nameError = page.locator("text=Full Name is required");
    expect(await nameError.isVisible()).toBeTruthy();

    const emailError = page.locator("text=Email Address is required");
    expect(await emailError.isVisible()).toBeTruthy();
  });

  // Test 4: Successful form submission
  test("Submit Form Successfully", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Fill in the form fields
    await page.fill("input[name='name']", "John Doe");
    await page.fill("input[name='email']", "john.doe@example.com");

    // Submit the form
    await page.click("button[type='submit']");

    // Check for success message
    const successMessage = page.locator("text=Form submitted successfully!");
    expect(await successMessage.isVisible()).toBeTruthy();
  });

  // Test 5: Responsive layout on smaller screens
  test("Responsive Layout", async ({ page }) => {
    // Set viewport to a smaller screen size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000");

    // Check if the editor and form stack vertically
    const editorPosition = await page.locator(".jsoneditor").boundingBox();
    const formPosition = await page.locator("form").boundingBox();

    expect(editorPosition!.y).toBeLessThan(formPosition!.y); // Ensure form appears below the editor
  });

});
