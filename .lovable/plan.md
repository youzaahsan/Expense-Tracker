

# Expense Tracker — Implementation Plan

## Design Direction
A stark, architectural interface inspired by Tadao Ando's concrete spaces. No shadows, no gradients, no rounded cards — just hairline borders, precise typography (JetBrains Mono for numbers, Inter for labels), and a single cobalt (#0047FF) accent color.

## Layout
- **Desktop:** Asymmetric two-column split — sticky left column (35%) with summary + form, scrollable right column (65%) with filters + expense list
- **Mobile/Tablet:** Stacks vertically — summary → form → filters → list
- Sections divided by flush 1px hairline borders, not floating cards

## Pages & Components

### Header
- Minimal top bar with "EXPENSE TRACKER" in tracked uppercase Inter

### Left Column (Control Center)
1. **ExpenseSummary** — Total expenses displayed in large JetBrains Mono with a mechanical rolling digit animation when values change
2. **ExpenseForm** — Title, amount, category (text input or select), and date picker fields. Auto-focuses title field on mount via `useRef`. Cobalt "Add Expense" button

### Right Column (Ledger)
3. **FilterBar** — Filter by category and date range. Active filter highlighted in cobalt
4. **ExpenseList + ExpenseItem** — Clean table layout with aligned monospaced amounts, category shown as plain text pill tags, delete action per row

## Data & Hooks
- **useState** for form inputs, expense list, and active filters
- **useEffect** to load mock expenses on mount (local JSON data)
- **useRef** for auto-focus on title input and form reset
- **useMemo** for total expense calculation and filtered list
- **useCallback** for add, delete, and filter handlers

## Color Palette
- Background: #F9F9F8 (alabaster)
- Surface: #FFFFFF
- Text: #1C1C1A (graphite) / #8A8A86 (ash for labels)
- Borders: #EAEAEA
- Accent: #0047FF (cobalt) — only for primary action + active filters

## Signature Detail
Mechanical counter animation on the total — digits roll vertically like an analog counter when expenses are added or removed.

## Fonts
- JetBrains Mono (Google Fonts) for all numerical data
- Inter for all UI labels and headings

