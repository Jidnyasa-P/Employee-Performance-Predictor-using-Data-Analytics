# 🧠 PredictHR: Employee Performance Predictor using Data Analytics

PredictHR is an industry-oriented AI platform designed for HR leaders to forecast next-cycle employee performance. Built with **React 19**, **Tailwind CSS**, and **Google Gemini 2.0**, it demonstrates a full-stack approach to "People Analytics."

---

## 🚀 Project Overview

### 1. What is Employee Performance Prediction?
It is the scientific process of using historical and real-time work signals—such as delivery rates, manager scores, and project volume—to forecast how likely an employee is to fall into a specific rating band (**High, Medium, Low**) in the upcoming appraisal cycle.

### 2. Business Value (The "Why")
- **Retention**: Identify high performers who are underpaid or at risk of burnout.
- **Intervention**: Spot low performance early to provide targeted coaching (L&D) before it impacts the team.
- **Bias Reduction**: Data-driven insights help standardize manager ratings across different departments.

---

## 🛠 Tech Stack
- **Frontend**: React 19, Recharts (Visualization), Framer Motion (Interactions), Lucide React (Icons).
- **Backend**: Express.js (Full-stack proxy).
- **Engine**: Google Gemini 2.0 (LLM-based Feature Analysis & SHAP Explanation).
- **Styling**: Tailwind CSS 4.0.

---

## 📐 Project Architecture
```text
Data Simulation (Synthetic) 
    → Feature Extraction (Training Hours, Delivery Rate, etc.)
        → AI Inference (Simulated Random Forest / XGBoost logic)
            → SHAP-style Insights (Actionable Drivers)
                → HR Dashboard (UI)
```

---

## 🎯 Interview Preparation (Top 5 QA)

### Q1: What business problem does this solve?
**A:** It addresses "Appraisal Bias" and "Reactionary HR." Instead of waiting for a failure, we use proactive analytics to guide manager coaching and resource allocation.

### Q2: Why did you use Synthetic Data?
**A:** Real HR data is highly confidential (PII/GDPR/HIPAA). Using synthetic data allows us to build and test the architecture safely while simulating industry-relevant patterns like the correlation between training hours and delivery rates.

### Q3: How do you handle Model Explainability?
**A:** The system doesn't just give a "High" rating. It surfaces **Drivers**. In a real ML environment, I would use **SHAP (SHapley Additive exPlanations)** to show which feature (e.g., "Projects Count") pushed the prediction in which direction.

### Q4: What is "Label Leakage" in this context?
**A:** Using features like "Expected Bonus" to predict "Performance Rating" is leakage, because the bonus is usually calculated *after* the rating. I ensured all input features are available *before* the rating cycle.

### Q5: How would you improve this?
**A:** I would implement **Employee Attrition Prediction** as a secondary target and integrate **Natural Language Feedback** from peer reviews using Sentiment Analysis.

---

## 🛠 Setup & Run
1. **Clone & Install**: `npm install`
2. **Secrets**: Add your `GEMINI_API_KEY` to the AI Studio Secrets panel.
3. **Run**: `npm run dev`

---

## 📸 Proof of Concept
- [x] **Dataset Preview**: Interactive grid of simulated employees.
- [x] **Live Analytics**: Bar charts showing current workforce rating distribution.
- [x] **AI Predictor**: Real-time analysis of a selected employee with confidence scores and intervention plans.
