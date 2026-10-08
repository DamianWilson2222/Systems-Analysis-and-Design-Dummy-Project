# Systems Analysis and Design — Dummy Project
## Student Expense Splitter

A React Native app built with Expo, Supabase, and EAS.
This README is the complete setup guide for every team member — Windows and Mac.
Follow every section in order the first time you set up your machine.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Part 1 — Machine Setup (Do Once Ever)](#part-1--machine-setup-do-once-ever)
4. [Part 2 — Account Setup (Do Once Ever)](#part-2--account-setup-do-once-ever)
5. [Part 3 — WebStorm Setup (Do Once Ever)](#part-3--webstorm-setup-do-once-ever)
6. [Part 4 — Supabase Project Setup (Team Lead Does Once)](#part-4--supabase-project-setup-team-lead-does-once)
7. [Part 5 — Clone and Run the Project](#part-5--clone-and-run-the-project)
8. [Part 6 — EAS Setup (Team Lead Does Once)](#part-6--eas-setup-team-lead-does-once)
9. [Part 7 — Link GitHub to Expo (Team Lead Does Once)](#part-7--link-github-to-expo-team-lead-does-once)
10. [Part 8 — iOS Device Registration](#part-8--ios-device-registration)
11. [Part 9 — Building the App](#part-9--building-the-app)
12. [Part 10 — Pushing OTA Updates](#part-10--pushing-ota-updates)
13. [Branch Workflow](#branch-workflow)
14. [Day to Day Commands](#day-to-day-commands)

---

## Tech Stack
| Tool | Purpose |
|---|---|
| React Native + Expo | App framework — one codebase for Android and iOS |
| Expo Router | File-based screen navigation |
| Supabase | Database + Authentication (backend) |
| EAS Build | Cloud APK/IPA building — no local Android Studio needed |
| EAS Update | Over-the-air updates after app is installed |
| GitHub | Version control and team collaboration |
| WebStorm | IDE for writing code |

---

## Project Structure
```
app/
  _layout.jsx       → Root navigation wrapper (registers all screens)
  index.jsx         → Login screen (Module 1)
  expenses.jsx      → Expenses list screen (Module 2)
  add-expense.jsx   → Add expense form (Module 3)
lib/
  supabase.js       → Supabase client — all DB/auth calls go through here
assets/             → Icons and images
eas.json            → EAS Build profiles (development / preview / production)
app.json            → Expo app configuration (name, icons, bundle ID)
package.json        → Project dependencies
babel.config.js     → Babel transpiler config (leave this alone)
.env                → Your secret Supabase keys (gitignored — never committed)
.env.example        → Template showing what keys are needed (safe to commit)
README.md           → This file
CONTRIBUTING.md     → Branch rules and commit style
```

---

## Part 1 — Machine Setup (Do Once Ever)

These are global installs on your computer. Do them regardless of what project you are on.

### Step 1 — Install Node.js
Node.js is the runtime that Expo, EAS, and npm all depend on.

**Windows:**
1. Go to https://nodejs.org
2. Download the **LTS** version
3. Run the installer, keep all defaults
4. Restart your computer after installation

**Mac:**
1. Open Terminal
2. Install Homebrew first if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Then install Node:
   ```bash
   brew install node
   ```

**Verify it worked (both platforms):**
```bash
node --version
npm --version
```
Both should print a version number. If they do, you are good.

---

### Step 2 — Install Git
Git is what pushes and pulls code to and from GitHub.

**Windows:**
1. Go to https://git-scm.com/download/win
2. Download and run the installer, keep all defaults
3. When asked about default editor, pick whatever you want

**Mac:**
Git is pre-installed. Verify:
```bash
git --version
```

---

### Step 3 — Install EAS CLI and Expo CLI
These are the command line tools that build and run your app.
Open any terminal (PowerShell on Windows, Terminal on Mac) and run:
```bash
npm install -g eas-cli
npm install -g expo-cli
```
The `-g` flag installs them globally — meaning you can use them in any project, not just this one.

**Verify:**
```bash
eas --version
expo --version
```

---

### Step 4 — Install WebStorm
WebStorm is the IDE everyone on the team uses to write code.

1. Go to https://www.jetbrains.com/webstorm/
2. Download and install
3. Students can get a free licence at https://www.jetbrains.com/community/education/

---

## Part 2 — Account Setup (Do Once Ever)

### Step 1 — GitHub Account
1. Go to https://github.com
2. Create a free account if you don't have one
3. Ask the team lead to add you as a collaborator on this repo:
   - Repo → Settings → Collaborators → Add people

### Step 2 — Expo Account
1. Go to https://expo.dev
2. Create a free account
3. Then log in from your terminal:
   ```bash
   eas login
   ```
   Enter your Expo email and password. You stay logged in permanently.

### Step 3 — Apple Developer Account (Required for iOS builds — any platform)
You do NOT need a Mac or iPhone to create this account.
1. Go to https://developer.apple.com
2. Click Account and sign in with any Apple ID
   - If you don't have an Apple ID you can create one — no Apple device required
3. Agree to the Apple Developer Agreement
4. The free tier is all you need — do NOT pay for the $99/year plan

### Step 4 — Supabase Account
1. Go to https://supabase.com
2. Sign in with GitHub (easiest)
3. The team lead will create the project and share the keys (see Part 4)

---

## Part 3 — WebStorm Setup (Do Once Ever)

### Step 1 — Connect WebStorm to GitHub
This lets you push/pull code without typing your password every time.
1. Open WebStorm
2. Go to `File → Settings` (Windows) or `WebStorm → Settings` (Mac)
3. Search for **GitHub** in the left panel
4. Click **Add Account**
5. Choose **Log In via GitHub** — it opens a browser
6. Authorize WebStorm in the browser
7. Done — WebStorm is now linked to your GitHub account ✅

### Step 2 — Open the Terminal Inside WebStorm
You run all Expo and EAS commands directly inside WebStorm.
- Shortcut: `Alt + F12` (Windows) or `Option + F12` (Mac)
- Or: `View → Tool Windows → Terminal`

The terminal automatically opens in your current project folder.

### Step 3 — Verify your tools work inside WebStorm terminal
Open the terminal in WebStorm and run:
```bash
node --version
eas --version
```
Both should print version numbers. If they do, everything is wired up correctly.

---

## Part 4 — Supabase Project Setup (Team Lead Does Once)

The team lead creates the Supabase project and shares the keys with the team.

### Step 1 — Create a Supabase Project
1. Log into https://supabase.com
2. Click **New Project**
3. Give it a name (e.g. `expense-splitter`)
4. Choose a strong database password — save it somewhere
5. Select the free tier region closest to you
6. Click **Create new project** and wait ~2 minutes

### Step 2 — Create the Expenses Table
1. In your Supabase project go to **SQL Editor**
2. Paste and run this SQL:
```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc', now()),
  description text not null,
  amount numeric not null,
  paid_by text not null
);

-- Only logged in users can read or write expenses
alter table expenses enable row level security;
create policy "Users can read expenses" on expenses for select using (auth.role() = 'authenticated');
create policy "Users can insert expenses" on expenses for insert with check (auth.role() = 'authenticated');
```

### Step 3 — Get Your API Keys
1. In Supabase go to **Settings → API**
2. Copy the **Project URL** and the **anon public** key
3. Share these with your team (via Teams DM — never commit them to GitHub)

### Step 4 — Enable Email Auth
1. In Supabase go to **Authentication → Providers**
2. Make sure **Email** is enabled
3. For development, go to **Authentication → Settings** and turn OFF **Confirm email** so you don't need to verify during testing

---

## Part 5 — Clone and Run the Project

Every team member does this on their own machine.

### Step 1 — Clone via WebStorm
1. Open WebStorm
2. Click **Get from VCS** on the welcome screen
   - Or: `File → New → Project from Version Control`
3. Paste the repo URL:
   ```
   https://github.com/DamianWilson2222/Systems-Analysis-and-Design-Dummy-Project.git
   ```
4. Choose where to save it locally
5. Click **Clone**

### Step 2 — Install Dependencies
In the WebStorm terminal (`Alt + F12`):
```bash
npm install
```
This reads `package.json` and downloads every library the project needs into a `node_modules` folder.

### Step 3 — Set Up Your Environment Variables
The `.env` file holds your secret Supabase keys. It is never committed to GitHub.
```bash
# Windows
copy .env.example .env

# Mac
cp .env.example .env
```
Then open `.env` in WebStorm and fill in the values the team lead shared with you:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4 — Start the App
```bash
npx expo start
```
This starts the Expo development server and shows a QR code in your terminal.
- **Android phone:** Install Expo Go from the Play Store, scan the QR code
- **iPhone:** Install Expo Go from the App Store, scan the QR code
- **Android emulator (BlueStacks or Android Studio):** Press `a` in the terminal

---

## Part 6 — EAS Setup (Team Lead Does Once)

This links the project to Expo's cloud build service.
Run this once inside the project folder:
```bash
eas init
```
This generates a unique project ID and adds it to `app.json`.
Commit and push this change so teammates get the updated `app.json`:
```bash
git add app.json
git commit -m "Initialize EAS project"
git push origin main
```

---

## Part 7 — Link GitHub to Expo (Team Lead Does Once)

This makes EAS automatically trigger a cloud build whenever code is merged into `beta` or `main`.
No one needs to manually run `eas build` — it just happens on merge.

### Step 1 — Connect GitHub to Expo Dashboard
1. Go to https://expo.dev and log in
2. Click your project (expense-splitter-dummy)
3. Go to **GitHub** in the left sidebar
4. Click **Connect GitHub repository**
5. Authorize Expo to access your GitHub account
6. Select `DamianWilson2222/Systems-Analysis-and-Design-Dummy-Project`
7. Click **Connect**

### Step 2 — Set Up Auto Builds Per Branch
Still in the Expo dashboard under your project:
1. Go to **Build triggers** (under the GitHub section)
2. Add a trigger:
   - Branch: `beta`
   - Build profile: `preview`
   - Platform: Android + iOS
3. Add a second trigger:
   - Branch: `main`
   - Build profile: `preview`
   - Platform: Android + iOS
4. Save

### What This Means in Practice
```
You merge a PR into beta
        ↓
Expo automatically starts a cloud build
        ↓
Team gets a download link to install and test
        ↓
If it looks good, merge beta into main
        ↓
Expo automatically builds the stable version
```
No terminal commands needed for building after this is set up.

---

## Part 8 — iOS Device Registration

iPhones need to be registered before EAS can build an IPA they can install.
**Team lead runs this command:**
```bash
eas device:create
```
EAS generates a link. Share that link with each iPhone teammate.
They open it in **Safari on their iPhone** (must be Safari, not Chrome) and follow the steps.
Their device registers automatically.

After all devices are registered, rebuild the iOS app:
```bash
eas build -p ios --profile preview
```

---

## Part 9 — Building the App

### Android APK (installs on any Android phone or BlueStacks)
```bash
eas build -p android --profile preview
```
When done, EAS gives you a download link. Share it with Android teammates.
They download and install the `.apk` directly.

### iOS IPA (installs on registered iPhones)
```bash
eas build -p ios --profile preview
```
When done, EAS gives a link. iPhone teammates open it in **Safari** to install.

### Check Build Status
```bash
eas build:list
```

> If GitHub auto-builds are set up (Part 7) you rarely need to run these manually.

---

## Part 10 — Pushing OTA Updates

Once the app is installed on a device, you can push JavaScript/UI changes
without rebuilding the whole app. The app downloads the update silently on next open.

```bash
eas update --branch main --message "Fix login bug"
```

> Only use this for JS/UI changes.
> If you change app.json, add a new native package, or change eas.json — you need a full `eas build` instead.

---

## Branch Workflow

```
feature/your-feature-name   ← your personal working branch
        ↓  Pull Request into beta
beta                         ← merged code, auto-builds for team testing
        ↓  Pull Request into main (after testing passes)
main                         ← stable working app, auto-builds final version
```

**Rules:**
- Never push directly to `main` or `beta`
- Always work on a `feature/` branch
- Always open a Pull Request — never merge your own PR
- See `CONTRIBUTING.md` for full commit and branch guidelines

---

## Day to Day Commands

| What you want to do | Command |
|---|---|
| Start dev server | `npx expo start` |
| Install a new package | `npm install package-name` |
| Log into Expo | `eas login` |
| Build Android APK | `eas build -p android --profile preview` |
| Build iOS IPA | `eas build -p ios --profile preview` |
| Push OTA update | `eas update --branch main --message "Your message"` |
| Register iPhone | `eas device:create` |
| Check builds | `eas build:list` |
| Pull latest code | `git pull` |
| Create feature branch | `git checkout -b feature/your-feature-name` |
| Stage and commit | `git add . && git commit -m "Your message"` |
| Push branch | `git push origin feature/your-feature-name` |

---

## Environment Variables
- Never commit your `.env` file — it is in `.gitignore` and will never appear on GitHub
- Only `.env.example` is committed — it shows the shape of the file with no real values
- If you accidentally expose a key, go to Supabase → Settings → API → regenerate your anon key immediately
