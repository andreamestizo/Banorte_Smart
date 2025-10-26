# 🏦 Banorte Smart - Intelligent Electricity Consumption Banking App

A modern mobile banking application that helps Banorte customers analyze their electricity consumption, receive AI-powered recommendations, and manage payments efficiently.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Deployment Guide](#deployment-guide)
- [Project Structure](#project-structure)
- [Basic Terminology](#basic-terminology)
- [Presentation Pitch](#presentation-pitch)
- [Technology Stack](#technology-stack)

---

## 🎯 Overview

**Banorte Smart** is an innovative banking application that integrates electricity consumption analysis with AI-powered insights. Users can track their weekly electricity usage, identify consumption spikes, receive personalized saving recommendations from Maya (our AI chatbot), and manage their electricity bill payments - all within the Banorte ecosystem.

---

## ✨ Features

### 🔐 Authentication
- Secure login screen with Banorte branding
- User-friendly interface

### 🏠 Dashboard
- Quick access to all banking services
- Maya AI chatbot integration
- Menu grid with 6 core services

### ⚡ Electricity Consumption Analysis
- **4 weeks of historical data** with date ranges
- **Interactive bar charts** showing daily costs
- **Week selector** to compare different periods
- **Automatic spike detection** (flags consumption 2x above average)
- **Savings comparison** vs. previous week
- Visual consumption patterns

### 🤖 Maya AI Chatbot
- Powered by **Google Gemini Flash 2.5**
- Analyzes your electricity consumption data
- Answers questions like:
  - "What day did I spend the most?"
  - "How much did I save this week?"
  - "Give me recommendations to save energy"
- Provides personalized energy-saving tips
- Quick question buttons for common queries

### 💳 Payment Options
- **Pay in full** - Complete balance payment
- **Pay in parts** - Split into 3 installments
- **Defer payment** - Pay later option
- **Custom amount** - Flexible payment (minimum $50 MXN)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A **Google Gemini API Key** - [Get one here](https://ai.google.dev/)

### Step 1: Download from GitHub

1. **Open your terminal** (Command Prompt on Windows, Terminal on Mac/Linux)

2. **Clone the repository:**
   ```bash
   git clone https://github.com/oscarcv125/BanorteSmart.git
   ```

3. **Navigate to the project folder:**
   ```bash
   cd BanorteSmart
   ```

### Step 2: Install Dependencies

Install all required packages:
```bash
npm install
```

This will download all the libraries and tools needed to run the app.

### Step 3: Configure the API Key

1. **Create a `.env` file** in the project root:
   ```bash
   # On Mac/Linux:
   touch .env

   # On Windows:
   type nul > .env
   ```

2. **Open `.env` and add your Google Gemini API key:**
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key.

### Step 4: Run the Development Server

Start the app locally:
```bash
npm run dev
```

The app will open at: **http://localhost:5173/** (or another port if 5173 is busy)

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended - Free & Easy)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Build your project:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Add environment variables** in Vercel dashboard:
   - Go to your project settings
   - Add `VITE_GEMINI_API_KEY` with your API key

6. **Your app is live!** Vercel will provide a URL like `https://banorte-smart.vercel.app`

### Option 2: Deploy to Netlify

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Build your project:**
   ```bash
   npm run build
   ```

3. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

5. **Add environment variables** in Netlify dashboard

### Option 3: Manual Deployment (Any Web Server)

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **The `dist` folder** contains your complete app

3. **Upload the `dist` folder** to any web hosting service (e.g., GitHub Pages, AWS S3, Firebase Hosting)

---

## 📁 Project Structure

```
banorte-app/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
│
├── src/                       # Source code
│   ├── assets/               # Images and media files
│   │   ├── Logo.png          # Banorte logo
│   │   └── react.svg         # React logo
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx        # Custom button component
│   │   ├── Button.css        # Button styling
│   │   ├── TextField.tsx     # Input field component
│   │   └── TextField.css     # Input field styling
│   │
│   ├── data/                 # Data models and mock data
│   │   └── electricityData.ts # 4 weeks of electricity consumption data
│   │
│   ├── pages/                # Application screens
│   │   ├── Login.tsx         # Login screen
│   │   ├── Login.css         # Login screen styling
│   │   ├── Dashboard.tsx     # Home/Dashboard screen
│   │   ├── Dashboard.css     # Dashboard styling
│   │   ├── Servicios.tsx     # Electricity analysis screen
│   │   ├── Servicios.css     # Servicios styling
│   │   ├── Chatbot.tsx       # Maya AI chatbot screen
│   │   └── Chatbot.css       # Chatbot styling
│   │
│   ├── App.tsx               # Main app component & routing
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles & design system
│   └── main.tsx              # App entry point
│
├── .env                       # Environment variables (API keys) - NOT committed to Git
├── .env.example              # Example environment file
├── .gitignore                # Files to ignore in Git
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build tool configuration
└── README.md                 # This file!
```

### Key Files Explained

#### `package.json`
Lists all the libraries your app needs and defines commands like `npm run dev` and `npm run build`.

#### `src/main.tsx`
The **entry point** - this is where your app starts running.

#### `src/App.tsx`
The **main component** that controls which screen to show (Login, Dashboard, Servicios, or Chatbot).

#### `src/index.css`
Contains the **Banorte design system**: colors, fonts, and global styles used throughout the app.

#### `src/data/electricityData.ts`
Mock data containing 4 weeks of electricity consumption information with costs, kWh usage, and dates.

#### `.env`
Stores **secret information** like API keys. This file is never uploaded to GitHub (protected by `.gitignore`).

---

## 📚 Basic Terminology

### What is HTML?
**HTML (HyperText Markup Language)** is the structure of a webpage. Think of it like the skeleton of a house - it defines what elements exist (buttons, text, images, etc.).

### What is CSS?
**CSS (Cascading Style Sheets)** is the styling of a webpage. It's like painting and decorating the house - it controls colors, sizes, positions, fonts, and how things look visually.

### What is TypeScript (.tsx files)?
**TypeScript** is a programming language that adds "types" to JavaScript. It helps catch errors before running the code. `.tsx` files combine TypeScript with **JSX** (JavaScript XML), which lets you write HTML-like code inside JavaScript.

### What is React?
**React** is a JavaScript library for building user interfaces. It breaks your app into reusable "components" (like LEGO blocks) that can be combined to build complex apps.

### What is Vite?
**Vite** is a build tool that makes your development faster. It bundles all your code and assets into an optimized package for deployment.

### What is an API?
**API (Application Programming Interface)** is a way for different software to communicate. In our case, we use Google Gemini's API to send questions and receive AI-generated responses.

### What is npm?
**npm (Node Package Manager)** is a tool that helps you install and manage code libraries (packages) that other developers have created.

### What is Git?
**Git** is a version control system that tracks changes to your code over time, like "save points" in a video game.

### What is GitHub?
**GitHub** is a website that hosts Git repositories online, making it easy to share code and collaborate with others.

---

## 🎤 Presentation Pitch

### Elevator Pitch (30 seconds)

"Imagine opening your Banorte app and instantly seeing exactly where your electricity money is going. **Banorte Smart** doesn't just show you numbers - it uses AI to detect consumption spikes, compare your usage week-to-week, and give you personalized recommendations to save money. With our AI chatbot Maya, you can ask 'What day did I spend the most?' and get instant, intelligent answers. It's your electricity consumption advisor, built right into your banking app."

---

### Full Presentation Pitch (3-5 minutes)

#### 🎯 The Problem

Every month, Banorte customers receive their electricity bills and ask themselves:
- "Why is my bill so high this month?"
- "What caused this spike in consumption?"
- "How can I reduce my electricity costs?"

Currently, they have no easy way to:
- Track daily consumption patterns
- Identify specific days with unusual usage
- Get actionable recommendations
- Compare their usage over time

#### 💡 Our Solution: Banorte Smart

**Banorte Smart** transforms electricity bill management into an **intelligent, interactive experience**.

#### Key Features:

**1. Visual Consumption Analytics**
- Interactive bar charts showing daily electricity costs
- 4 weeks of historical data at your fingertips
- Week-by-week comparison with automatic savings calculations
- Instantly see if you saved money or spent more compared to last week

**2. Intelligent Spike Detection**
- Automatic detection of consumption anomalies
- Highlights days when usage exceeds 2x the average
- Visual alerts help users identify problem days

**3. Maya - Your AI Energy Advisor**
- Powered by Google's latest Gemini Flash 2.5 AI
- Understands your complete consumption history
- Answers natural language questions:
  - "What day did I spend the most money on electricity?"
  - "How much did I save this week?"
  - "Give me recommendations to reduce my consumption"
- Provides personalized, actionable energy-saving tips
- Quick-access buttons for common questions

**4. Flexible Payment Options**
- Pay in full for immediate balance clearance
- Split into 3 installments for better budget management
- Defer payment to a later date
- Custom amount payments (minimum $50 MXN)

#### 🎨 Design Excellence

- **Complete Banorte Design System** implementation
- Banorte brand colors (#EB0029 red, official grays)
- Gotham font family throughout
- Mobile-first responsive design
- Simulates actual phone app experience on desktop

#### 🔧 Technical Innovation

**Modern Technology Stack:**
- **React + TypeScript** - Industry-standard, type-safe development
- **Vite** - Lightning-fast build tool
- **Recharts** - Professional data visualization
- **Google Gemini Flash 2.5** - State-of-the-art AI

**Security & Best Practices:**
- Environment variables for API key security
- Git version control
- Modular, maintainable code architecture
- Reusable component library

#### 📊 Business Value

**For Customers:**
- Transparency and control over electricity spending
- Actionable insights to reduce costs
- Convenient payment management
- Educational tool for energy awareness

**For Banorte:**
- Increased customer engagement with the banking app
- Differentiation from competitors
- Data-driven insights into customer consumption patterns
- Opportunity for partnership with electricity providers
- Foundation for expanding to other utilities (water, gas, internet)

#### 🚀 Future Enhancements

1. **Real-time integration** with CFE (Mexico's electricity company)
2. **Push notifications** for spike alerts
3. **Goals & challenges** - gamification for energy saving
4. **Comparison with neighbors** - community benchmarking
5. **Smart appliance recommendations** - suggest energy-efficient devices
6. **Carbon footprint tracking** - environmental impact awareness
7. **Predictive analytics** - forecast next month's bill

#### 💰 Impact Metrics

If a customer reduces consumption by just **10%** through our insights:
- Average monthly bill: $1,500 MXN
- **Savings: $150 MXN/month**
- **Annual savings: $1,800 MXN**

For Banorte with 1 million active users adopting this feature:
- Total customer savings: **$1.8 billion MXN annually**
- Increased app engagement
- Enhanced customer loyalty

---

### Call to Action

**"Banorte Smart isn't just a feature - it's a commitment to empowering our customers with intelligence, transparency, and control over their finances. Let's make every peso count."**

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Charts:** Recharts
- **AI Integration:** Google Gemini Flash 2.5
- **Styling:** CSS3 with CSS Variables
- **Version Control:** Git
- **Hosting:** Vercel/Netlify ready

---

## 📝 License

This project was created as a proof of concept for Banorte's innovation initiatives.

---

## 🙏 Acknowledgments

- Banorte design team for brand guidelines
- Google for Gemini AI API
- React and Vite communities

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for Banorte customers**
