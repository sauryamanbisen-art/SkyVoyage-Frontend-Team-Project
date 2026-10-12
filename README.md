# Skynora — Frontend Team Project

[![Status](https://img.shields.io/badge/Status-In%20Development%20(45%25)-orange)](#project-status)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20Vanilla%20CSS3%20%7C%20ES6%2B%20JS-blue)](#technology-stack)
[![PRD](https://img.shields.io/badge/Documentation-PRD%20(PDF)-red)](PRD.pdf)

**Skynora** is a modern, responsive, client-side flight booking platform designed to deliver an end-to-end travel booking, passenger self-service, and flight management experience.

Built with **vanilla web technologies (HTML5, Modern CSS3 with Design Tokens, and ES6+ Modules)**, the architecture guarantees blazing-fast load times, zero external runtime dependencies, and maintainable, modular code.

---

## 📋 Comprehensive PRD & Frontend Specification

For full architectural blueprints, entity models, page-by-page functional specs, and sprint roadmaps, refer to the complete Product Requirements Document:

👉 **[Download / View the Skynora PRD (PRD.pdf)](PRD.pdf)**

---

## 🚀 Project Status (~45% Complete)

| Layer | Status | Description |
| :--- | :--- | :--- |
| **Design System & CSS Tokens** | ✅ 100% | Variables, typography tokens, grid & utility classes in `css/variables.css`. |
| **Mock Datasets** | ✅ 100% | Flight schedules, airline carriers, and airport rosters in `data/*.json`. |
| **HTML Page Templates** | ⚠️ 85% | 9 core views created; `search.html` and `seat-selection.html` in progress. |
| **CSS Page Styling** | ✅ 90% | Fully responsive styles for Landing, Admin, Dashboard, Checkout, Seats, Details. |
| **JavaScript Business Logic** | ⏳ 0% | ES6 Domain Models (`Flight`, `Seat`, `Booking`, `User`) and Page Controllers pending. |
| **Data Service & Persistence** | ⏳ 0% | `DataService.js` and `LocalStorage` sync scheduled for Phase 2. |

---

## 🗂️ Project Structure

```text
Skynora-Frontend-Team-Project/
├── PRD.pdf                         # Full Product Requirements Document (PDF)
├── README.md                       # Project documentation
├── index.html                      # Landing page with flight search widget
├── search.html                     # [Phase 2] Flight search results with faceted filters
├── flight-details.html             # Detailed flight itinerary & cabin choices
├── seat-selection.html             # [Phase 2] Visual aircraft cabin & seat picker
├── passenger-info.html             # Passenger details form & contact inputs
├── checkout.html                   # Payment portal (Cards, UPI, NetBanking, Wallets)
├── ticket.html                     # Generated E-Ticket & printable boarding voucher
├── login.html                      # User Sign In portal
├── register.html                   # User account registration
├── dashboard.html                  # User profile, trips history & SkyPoints
├── admin.html                      # Admin operations, flight fleet management & analytics
│
├── css/
│   ├── reset.css                   # CSS reset & normalize
│   ├── variables.css               # Design system tokens (colors, fonts, elevation)
│   ├── main.css                    # Global layouts, navbar, buttons, utilities
│   └── pages/                      # Page-scoped stylesheets
│       ├── landing.css             # Hero & promo showcases
│       ├── search.css              # Filter sidebar & flight cards
│       ├── flight-details.css      # Route timeline & amenities
│       ├── seat-selection.css      # Interactive seat grid & legend
│       ├── booking.css             # Stepper header, forms & ticket styling
│       ├── auth-dashboard.css      # Auth split screen & dashboard cards
│       └── admin.css               # Admin tables, KPIs & sidebar
│
├── js/
│   ├── app.js                      # Application bootstrapper & global navbar
│   ├── data-service.js             # Unified Data Access Layer (Fetch + LocalStorage)
│   ├── utils.js                    # Currency formatting, PNR generator, date tools
│   ├── classes/                    # OOP Domain Models
│   │   ├── Flight.js               # Flight entity & pricing logic
│   │   ├── Seat.js                 # Seat entity & status tracking
│   │   ├── Booking.js              # Booking order entity & PNR
│   │   └── User.js                 # User account entity & SkyPoints
│   └── pages/                      # View Controllers (DOM binding & events)
│       ├── landing.js              # Search widget & airport autocomplete
│       ├── search.js               # Dynamic filter & flight card render
│       ├── flight-details.js       # Flight details population
│       ├── seat-selection.js       # Seat matrix generator & pricing sync
│       ├── passenger-info.js       # Passenger form validation
│       ├── checkout.js             # Payment processing simulation
│       ├── ticket.js               # E-Ticket population & print handler
│       ├── auth.js                 # Sign in & registration handler
│       ├── dashboard.js            # User trips feed & status filters
│       └── admin.js                # Flight manager CRUD & KPI metrics
│
└── data/                           # Mock Datasets
    ├── airlines.json               # Airline codes, names, ratings
    ├── airports.json               # Airport IATA codes & city locations
    └── flights.json                # Master flight schedules & pricing
```

---

## 🛠️ Technology Stack

- **HTML5:** Semantic markup, accessible labels, SEO tags.
- **CSS3:** Custom Properties (CSS variables), Grid, Flexbox, responsive media queries, zero frameworks.
- **JavaScript (ES6+):** Pure native ES Modules (`<script type="module">`), Object-Oriented Programming (OOP) Domain classes, asynchronous Fetch API.
- **Data & Storage:** Local JSON mock datasets + browser `LocalStorage` and `SessionStorage` for persistence.

---

## 💻 How to Run Locally

Because this project utilizes native **ES6 Modules** (`import` / `export`), it must be served over an HTTP server rather than the `file://` protocol.

### Option 1: Using VS Code Live Server
Right-click [index.html](index.html) and select **"Open with Live Server"**.

### Option 2: Using Python
```bash
# Python 3
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Using Node.js (npx serve)
```bash
npx serve .
```

---

## 👥 Team & Contributing

1. Clone or pull the latest code from `main`.
2. Review [PRD.pdf](PRD.pdf) before writing JavaScript controllers.
3. Keep all styles bound to `css/variables.css` tokens.
4. Ensure all JavaScript adheres to modular ES6 standards.
