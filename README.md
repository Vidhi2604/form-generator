# Dynamic Form Generator React App

A React-based dynamic form generator that allows users to create, edit, and interact with forms in real time using a JSON schema editor. This project includes advanced features like dark mode support, form validation preview, JSON manipulation, and submission downloads.

## 🚀 Features
<h3>1. Dynamic Form Generation</h3>

- Users can define form fields using a JSON schema.
- Supports various field types (text, email, radio, textarea, etc.).
- Real-time updates: Form automatically reflects changes made in the JSON editor.

<h3>2. Form validation review</h3>

- Built-in validation using Zod for required fields, custom patterns, and more.
- Shows error messages for invalid or missing inputs.

<h3>3. Dark mode support</h3>

- Toggle between light and dark themes for better accessibility and user preference.
  
<h3>4."Copy Form JSON" Button</h3>

- Quickly copy the current form's JSON schema to the clipboard with a single click.

<h3>5. Download Form Submissions</h3>

- Save all form submissions as a JSON file.
- The download button is enabled only when the form has been successfully filled and submitted.

<h3>6. Responsive Layout</h3>

- Mobile-friendly UI with responsive design for optimal usability across devices.


## ⚙️ Installation
1. Clone the repository :
- `git clone git@github.com:Vidhi2604/form-generator.git`
- `cd form-generator`

2. Install dependencies :
- `npm install`
3. Strat the development server :
- `npm start`
4. Run tests :
- `npm test`

## 🛠️ Usage
<h3> 1. JSON Schema Editor</h3>

- Modify the JSON schema in the editor on the left-hand side of the app.
- The form on the right-hand side updates in real time to reflect changes.
<h3>2. Submit Form</h3>


- Fill out the form and submit it.
- Validates required fields and shows error messages for invalid entries.
<h3> 3. Copy JSON</h3>


- Use the "Copy Form JSON" button to copy the current JSON schema to your clipboard.
<h3> 4. Download Submission</h3>

- Submissions can be downloaded as a .json file. The download button is enabled only after the form has been submitted.
<h3>5. Dark Mode</h3>

- Toggle the dark mode for a better user experience in low-light environments.


## 🧪 Tests

This project includes E2E tests written with Playwright to ensure the following functionalities work as expected:

1. JSON Editor and Form Rendering: Ensures both the JSON editor and form are visible on the page.
2. Real-Time Form Updates: Verifies the form updates based on changes made in the JSON schema.
3. Form Validation: Tests error messages for required fields.
4. Successful Form Submission: Confirms the form submits successfully with valid data.
5. Responsive Layout: Checks for proper layout on smaller screens.

- Run tests with :
     `npx playwright test`

## 🖌️ Customization

You can customize the default JSON schema, form styles, and validation logic by modifying the following files:

- Default schema: `App.tsx`
- Styles: `App.css` (uses Tailwind CSS)
- Validation: `utils/validation.ts`

## 👩‍💻 Contributors

- Vidhi sahai [GitHub Profile](https://github.com/Vidhi2604)

## 🌟 Acknowledgments

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Playwright](https://playwright.dev/)
  
Feel free to contribute or raise issues for new features or bugs! 😊

## ✔ Deployment

Depoyed with netlify.
[Check Here](https://form-generator-vs.netlify.app/)

