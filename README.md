
# Birthday Card Creator 🎈

A fully responsive, client-side web application that lets users create, customize, download, and email beautiful birthday cards. Built with HTML, CSS, and vanilla JavaScript.

## Features
* **Real-time Preview:** See your card update as you type.
* **Custom Photo Upload:** Uses the browser's FileReader API (no backend required, fully private).
* **Animations:** Interactive confetti burst using `canvas-confetti`.
* **Download Capability:** Converts the DOM element to a high-resolution PNG using `html2canvas`.
* **Email Integration:** Pre-fills the user's default email client with a tailored subject and message.

## How to Deploy to GitHub Pages

Because this app has no backend dependencies, hosting it on GitHub Pages is free and takes less than a minute.

1. Create a new repository on GitHub (e.g., `birthday-card-app`).
2. Upload all four files into the repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. In your repository, click on **Settings** (the gear icon).
4. On the left sidebar, click on **Pages**.
5. Under "Build and deployment", set the **Source** to `Deploy from a branch`.
6. Under **Branch**, select `main` (or `master`) and keep the folder as `/root`. Click **Save**.
7. Wait about 1-2 minutes. GitHub will provide you with a live URL (e.g., `https://yourusername.github.io/birthday-card-app/`).

## How the "Share via Email" works
Because static websites cannot send emails directly (which requires SMTP servers and backend code), the app generates a high-quality `.png` image of the card for the user to download. The "Share via Email" button uses a `mailto:` protocol to open the user's default email client, pre-filling the subject line and the message body, allowing the user to simply attach the image they just downloaded and press send!
