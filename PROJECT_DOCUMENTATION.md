# AutoMarketer AI - Project Documentation
**Final Year Project (FYP)**

---

## Table of Contents
1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
   - 2.1 Problem Statement
   - 2.2 Project Objectives
   - 2.3 Scope of Project
3. [System Architecture](#3-system-architecture)
   - 3.1 Technology Stack
   - 3.2 High-Level Architecture
   - 3.3 n8n Workflow Logic
4. [Key Features & Modules](#4-key-features--modules)
5. [Implementation Details](#5-implementation-details)
   - 5.1 Frontend Structure
   - 5.2 AI Integration Service
6. [Installation & Setup Guide](#6-installation--setup-guide)
7. [Conclusion](#7-conclusion)

---

## 1. Abstract

**AutoMarketer AI** is an intelligent marketing automation platform designed to assist small to medium-sized enterprises (SMEs) and marketing professionals in streamlining their digital marketing efforts. By leveraging the power of Generative AI (Google Gemini) and workflow automation (n8n), the application automates content creation, generates strategic marketing insights, performs competitor analysis, and qualifies sales leads. The system utilizes a modern React-based frontend for an intuitive user experience, connected to a flexible low-code backend that orchestrates complex AI tasks, reducing the time required for marketing tasks by up to 80%.

---

## 2. Introduction

### 2.1 Problem Statement
In the current digital landscape, businesses struggle with:
*   **Content Fatigue:** Constantly generating fresh, engaging content for multiple social platforms.
*   **Data Overload:** Difficulty interpreting analytics to make data-driven decisions.
*   **Lack of Strategy:** Small teams often lack the expertise to create comprehensive marketing strategies or buyer personas.
*   **Inefficient Lead Qualification:** Wasting time contacting leads that are not ready to convert.

### 2.2 Project Objectives
*   To develop a unified dashboard for managing marketing activities.
*   To integrate Generative AI for instant creation of social media posts, blogs, and email newsletters.
*   To provide strategic tools including Competitor SWOT Analysis and Audience Persona generation.
*   To implement an AI-driven Lead Scoring mechanism to prioritize potential customers.

### 2.3 Scope of Project
The project covers the development of a web-based client application and a backend automation workflow. It focuses on text-based content generation, strategic reasoning, and data analysis. Image generation is simulated via placeholders for this version, with architecture in place for future API integration.

---

## 3. System Architecture

### 3.1 Technology Stack

**Frontend (Client-Side):**
*   **Framework:** React 19 (TypeScript)
*   **Styling:** Tailwind CSS (Utility-first CSS)
*   **Icons:** Lucide React
*   **Visualization:** Recharts (Data visualization)
*   **Routing:** React Router DOM

**Backend & Orchestration:**
*   **Workflow Engine:** n8n (Node-based automation)
*   **AI Model:** Google Gemini 1.5 Flash (via n8n)
*   **Communication:** REST API (Webhooks)

### 3.2 High-Level Architecture

The system follows a decoupled architecture where the React frontend communicates with the n8n backend via HTTP Webhooks.

1.  **User Action:** User submits a request (e.g., "Generate Strategy") on the React Dashboard.
2.  **API Service:** `geminiService.ts` intercepts the request and sends a POST request to the n8n Webhook URL.
3.  **Workflow Processing:**
    *   n8n receives the payload.
    *   A **Router Node** determines the action type (`generate_copy`, `analyze_lead`, etc.).
    *   The request is forwarded to the specific **Google Gemini Node**.
4.  **AI Processing:** Google Gemini processes the prompt and returns a structured JSON response.
5.  **Response:** n8n formats the JSON and sends it back to the React frontend for display.

### 3.3 n8n Workflow Logic
The backend logic is contained within a single `n8n-workflow.json` file. It utilizes a **Switch Node** to handle multiple endpoints via a single Webhook:
*   `generate_copy`: Creates social media posts.
*   `generate_strategy`: Outputs a JSON object with marketing overview and themes.
*   `generate_persona`: Creates a detailed user profile.
*   `analyze_lead`: specific scoring logic (0-100) based on interaction history.

---

## 4. Key Features & Modules

### 1. AI Studio
*   **Quick Post:** Generates multi-platform content (Twitter, LinkedIn) based on tone and audience.
*   **Campaign Strategy:** Creates full marketing campaigns including key themes, hashtags, and posting schedules.
*   **Content Optimizer:** Rewrites existing content to improve engagement or change tone.

### 2. Competitor Intelligence
*   Performs an instant SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for any given competitor and industry.
*   Provides AI-generated strategic advice on how to outperform the competitor.

### 3. Audience Persona Builder
*   Generates detailed buyer personas including demographics, psychographics, goals, frustrations, and preferred marketing channels.

### 4. Lead Scoring Manager
*   Analyzes raw lead data (interaction history, source) to assign a numerical score (0-100).
*   Provides a "Reasoning" field explaining why a lead was scored a certain way.

### 5. Automation Hub
*   Allows users to manage and download workflow templates.
*   Provides integration points for expanding the system to Zapier or other tools.

### 6. Analytics Dashboard
*   Visualizes engagement trends, follower growth, and revenue attribution using interactive charts.

---

## 5. Implementation Details

### 5.1 Frontend Structure
The project is structured for scalability:
*   `components/`: Contains UI modules (Dashboard, ContentGenerator, etc.).
*   `services/`: Handles API communication (`geminiService.ts`).
*   `contexts/`: Manages global state (Authentication).
*   `types/`: TypeScript interfaces ensuring type safety across the app.

### 5.2 AI Integration Service
The application uses a hybrid approach for resilience:
*   **Live Mode:** Connects to the user's n8n Webhook URL defined in `.env`.
*   **Mock Mode:** If the API fails or is not configured, the system falls back to sophisticated mock data to ensure the UI remains demonstrable.

**Code Snippet (Service Logic):**
```typescript
const callApi = async (action: string, data: any) => {
  if (USE_MOCKS) return null; // Use Fallback
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action, ...data }),
  });
  return await response.json();
};
```

---

## 6. Installation & Setup Guide

### Prerequisites
*   Node.js (v16 or higher)
*   n8n (Desktop version or Cloud account)
*   Google Gemini API Key

### Step 1: Frontend Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory:
    ```env
    REACT_APP_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
    REACT_APP_USE_MOCKS=false
    ```

### Step 2: Backend (n8n) Setup
1.  Open n8n.
2.  Import the `n8n-workflow.json` file provided in the project root.
3.  Open the **Google Gemini** nodes within the workflow and add your Google PaLM/Gemini API Credential.
4.  Activate the workflow.
5.  Copy the **Production Webhook URL** and paste it into the `.env` file.

### Step 3: Running the Application
```bash
npm start
```
The application will launch at `http://localhost:3000`.

---

## 7. Conclusion
AutoMarketer AI successfully demonstrates the potential of integrating Large Language Models (LLMs) into everyday business workflows. By abstracting the complexity of prompt engineering behind a user-friendly interface, it democratizes access to high-level marketing strategy and content creation. Future work involves integrating direct social media publishing APIs and image generation models.
