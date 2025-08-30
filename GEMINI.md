
# Project Overview

This project is a static, single-page landing site for "AppCore," a service that provides "mini-automation" and lightweight web tools for small businesses. The target audience appears to be Russian-speaking entrepreneurs (RU/KZ).

The page is built with plain HTML, CSS, and vanilla JavaScript. All styles and scripts are embedded directly within the `index.html` file.

## Key Sections

*   **Hero:** Introduces the service and its value proposition.
*   **Solutions:** Describes the types of applications offered (e.g., Mini-CRM, delivery tracking, QR-based processes).
*   **Benefits:** Explains the advantages, such as speed, cost-effectiveness, and PWA capability.
*   **ROI Calculator:** An interactive tool to estimate monthly savings.
*   **Lead Form:** A contact form that saves lead data to the browser's `localStorage` for demonstration purposes.

# Building and Running

*   **Building:** There is no build process. All code is self-contained in `index.html`.
*   **Running:** To view the site, open the `index.html` file directly in a web browser. Given the file path (`C:\OSPanel\home\myprog.kz\public`), it is likely intended to be served by a web server like Apache or Nginx, where `public` is the document root.

# Development Conventions

*   **Styling:** All CSS is located within a single `<style>` block in the `<head>`. It uses CSS variables for theming (colors, spacing, etc.).
*   **JavaScript:** All JavaScript is located in a single `<script>` block at the end of the `<body>`. It is vanilla JavaScript and handles:
    *   Active navigation link highlighting on scroll.
    *   Revealing elements on scroll using `IntersectionObserver`.
    *   The logic for the ROI calculator.
    *   A simple input mask for the phone number field.
    *   Submission of the lead form to `localStorage`.
*   **Dependencies:** There are no external dependencies like frameworks or libraries.
*   **Environment:** The `.env` file exists but is empty, suggesting it might be a placeholder for future backend integration.