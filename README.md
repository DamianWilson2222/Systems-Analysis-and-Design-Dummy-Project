# Systems Analysis and Design — Dummy Project
## Student Expense Splitter

A React Native app built with Expo, Supabase, and EAS. This dummy project demonstrates the full toolchain for the team.

---

## Tech Stack
| Tool | Purpose |
|---|---|
| React Native + Expo | App framework |
| Expo Router | Screen navigation |
| Supabase | Database + Authentication |
| EAS Build | Cloud APK/IPA building |
| EAS Update | Over-the-air updates |

---

## Project Structure
```
app/
  _layout.jsx       → Root navigation wrapper
  index.jsx         → Login screen (Module 1)
  expenses.jsx      → Expenses list screen (Module 2)
  add-expense.jsx   → Add expense form (Module 3)
lib/
  supabase.js       → Supabase client connection
assets/             → Icons and images
eas.json            → EAS Build profiles
app.json            → Expo app config
.env.example        → Template for environment variables
```

---

## First Time Setup

### 1. Clone the repo
```bash
git clone https://github.com/DamianWilson2222/Systems-Analysis-and-Design-Dummy-Project.git
cd Systems-Analysis-and-Design-Dummy-Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Copy the example file
copy .env.example .env
# Open .env and fill in your Supabase URL and anon key
# Get these from: supabase.com → Your Project → Settings → API
```

### 4. Set up Supabase table
Run this SQL in your Supabase SQL editor (supabase.com → SQL Editor):
```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc', now()),
  description text not null,
  amount numeric not null,
  paid_by text not null
);

-- Allow logged in users to read and write expenses
alter table expenses enable row level security;
create policy "Users can read expenses" on expenses for select using (auth.role() = 'authenticated');
create policy "Users can insert expenses" on expenses for insert with check (auth.role() = 'authenticated');
```

### 5. Start the app
```bash
npx expo start
```
Scan the QR code with Expo Go on your phone.

---

## Branch Workflow
```
feature/your-feature-name  → your individual work
        ↓ Pull Request
beta                        → merged code, testing builds
        ↓ Pull Request (after testing)
main                        → stable, working app
```

**Never push directly to main or beta.**
Always open a Pull Request.

---

## Building the App

### Android APK
```bash
eas build -p android --profile preview
```

### iOS IPA
```bash
eas build -p ios --profile preview
```

### Push an OTA Update
```bash
eas update --branch main --message "Fix login bug"
```

### Register an iPhone for testing
```bash
eas device:create
```
Share the generated link with your teammate — they open it in Safari on their iPhone.

---

## Environment Variables
Never commit your `.env` file. It is gitignored.
Only commit `.env.example` with placeholder values.
