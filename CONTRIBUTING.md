# Contributing Guide

## Branch Rules
- `main` — stable builds only, never push directly
- `beta` — testing branch, merge your feature here first
- `feature/your-name-or-feature` — your personal working branch

## Workflow
1. Pull the latest beta branch
   ```bash
   git checkout beta
   git pull
   ```
2. Create your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Write your code, commit often
   ```bash
   git add .
   git commit -m "Add expense form validation"
   ```
4. Push your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request into `beta` on GitHub
6. After team testing on beta build, a PR is opened from `beta` into `main`

## Commit Message Style
Use imperative mood — write it like a command:
```
✅ Fix login bug
✅ Add Supabase auth
✅ Update expense card style
❌ Fixed login bug
❌ adding supabase
```
