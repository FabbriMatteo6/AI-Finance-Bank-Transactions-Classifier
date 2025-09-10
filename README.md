# AI Transaction Classifier 🤖💸

Tired of manually sorting through endless spreadsheets? 😫 Say goodbye to tedious data entry and hello to the future of financial management! 🎉 Our **AI Transaction Classifier** uses the power of Google's Gemini AI to automatically categorize your financial transactions from any Excel or CSV file in seconds.

**Important:** This application requires a Google AI Studio API key to function. See the setup instructions below.

![AI Transaction Classifier Showcase](https://storage.googleapis.com/aistudio-oac-dev-public-b2a29799/b123a1a6-577e-40cc-9d10-a24987ba42a6.gif)

## Why You'll Love It ❤️

*   **🧠 Intelligent Classification:** Leverages Google's advanced Gemini model for highly accurate categorization based on descriptions, amounts, and dates.
*   **📂 Supports Your Files:** Works seamlessly with both Excel (`.xlsx`, `.xls`) and CSV files.
*   **🗺️ Simple Column Mapping:** An intuitive interface to tell the AI where to find your transaction data.
*   **⚡ Blazing Fast:** Processes hundreds of transactions in batches for maximum speed and efficiency.
*   **📊 Clear & Actionable Results:** Provides a main category, sub-category, and the AI's reasoning for each transaction, directly in the table.
*   **📥 Easy Export:** Download your newly classified data as a clean CSV file with a single click.
*   **🔒 Secure & Private:** Your data is processed in your browser. It is not stored or seen by anyone else.

**Note:** If you're seeing a blank screen when starting the application, make sure you've properly configured your Google AI Studio API key as described in the setup instructions below.

## How It Works (The Magic ✨)

Using the app is as easy as 1-2-3-4!

1.  **Drag & Drop 📤:** Simply upload your transaction file onto the designated area.
2.  **Map It Out 🗺️:** Quickly match the `Transaction Description`, `Transaction Amount`, and `Transaction Date` fields to the corresponding columns in your file.
3.  **Click & Go 🚀:** Hit the "Start Classification" button and let the AI work its magic. A progress bar will show you its progress.
4.  **Download & Done ✅:** Review the categorized results on-screen and download your perfectly organized CSV file.

---

### 🎨 Tailor It to Your Needs: Custom Categories

Want to classify transactions for your specific business or personal budget? No problem! You have full control over the categories the AI uses.

1.  In your code editor, open the file named `constants.ts`.
2.  Inside this file, you'll find a `CATEGORIES` object.
3.  You can **edit, add, or remove** categories and sub-categories to perfectly match your needs. The AI will automatically use your updated list for classification.

**Here's how the structure works:**

```javascript
export const CATEGORIES = {
  // A main category (e.g., "Income")
  "Main Category 1 (e.g., Income)": {
    // A sub-category with a helpful description for the AI
    "Sub-Category 1.1": "Description of what goes into this sub-category.",
    "Sub-Category 1.2": "Another description for another type of transaction.",
  },

  // Another main category (e.g., "Expenses")
  "Main Category 2 (e.g., Expenses)": {
    "Sub-Category 2.1": "Description for this expense type (e.g., Office Supplies).",
    "Sub-Category 2.2": "Description for another expense type (e.g., Monthly Software Subscriptions)."
  }
  // ...add as many as you like!
};
```

By customizing this file, you can adapt the classifier for any scenario, from tracking your startup's burn rate to managing your personal household budget. It's your financial data, your way! 🚀

---

## Run It On Your Own Computer! 🤓

Want to run this amazing tool locally? It's easy with a modern development setup. Follow these simple steps.

### What you'll need:
*   [Node.js](https://nodejs.org/en/download/) (v18 or newer), which includes `npm`.
*   A modern web browser (like Google Chrome, Firefox, or Edge).
*   A code editor like [Visual Studio Code](https://code.visualstudio.com/download).

### Step 1: Get the Project Files 📁

*   Download all the project files as a ZIP file and **unzip** it into a new folder on your computer.
*   Open the project folder in your code editor (e.g., VS Code).

### Step 2: Get Your Secret AI Key 🔑

This tool needs an "API Key" to communicate with the Google Gemini AI.
1.  Go to the [Google AI Studio](https://aistudio.google.com/app/apikey) website.
2.  Click the `Create API key` button to generate a new key.
3.  **Copy this key**—it's your personal, secret password to the AI.

### Step 3: Configure Your Environment 🤫

You need to provide your secret key to the application in a way it can securely access.

**Important:** If there's already a file named `.env` in your project folder, you can skip steps 1-2 and just edit that file.

1.  In your code editor's file explorer, right-click and select "**New File**".
2.  Name this new file *exactly* `.env` (the dot at the beginning is important!).
3.  Open the new `.env` file and paste the following line into it:
    ```
    VITE_API_KEY=PASTE_YOUR_SECRET_KEY_HERE
    ```
4.  **Replace** `PASTE_YOUR_SECRET_KEY_HERE` with the actual API key you copied from Google AI Studio.
5.  Save the `.env` file.

**Troubleshooting:**
- Make sure there are no spaces before or after the `VITE_API_KEY=` part
- Ensure your API key is correctly copied from Google AI Studio
- After making changes to the `.env` file, you'll need to restart the application

### Step 4: Install Dependencies & Launch! 🚀

Now, let's get the app running.
1.  Open the built-in terminal in your code editor. In VS Code, go to the top menu and select `Terminal` > `New Terminal`.
2.  In the terminal, type the following command and press Enter to install all the necessary packages:

   ```bash
   npm install
   ```

3.  Once the installation is complete, start the development server by running:

    ```bash
    npm run dev
    ```

4.  The terminal will show you a local URL, usually `http://localhost:5173`. **Ctrl+click** (or **Cmd+click** on Mac) the link to open the app in your browser.

**Voilà!** The app is now running on your computer, ready to classify your transactions!

### Troubleshooting Common Issues 🛠️

**Blank Screen or "Configuration Error" Message:**
- If you see a blank screen or a message about API key configuration, double-check that:
  1. You've created the `.env` file with the correct name (including the dot at the beginning)
  2. Your API key is correctly pasted in the file, replacing `PASTE_YOUR_SECRET_KEY_HERE`
  3. There are no extra spaces around the equals sign in `VITE_API_KEY=your_actual_key_here`
  4. You've saved the file and restarted the application

**Application Not Starting:**
- Make sure Node.js is properly installed on your computer
- Check that all steps were followed in order (especially `npm install` before `npm run dev`)
- If you see error messages in the terminal, try running `npm install` again

**File Upload Issues:**
- Ensure your Excel or CSV file has data in it
- Check that your file isn't corrupted
- Make sure to properly map your columns in the mapping step

## Tech Stack 🛠️

*   **Frontend Framework:** React
*   **Build Tool:** Vite
*   **AI Model:** Google Gemini
*   **Styling:** Tailwind CSS
*   **File Parsing:** SheetJS (xlsx)