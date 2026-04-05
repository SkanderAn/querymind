<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:10b981&height=200&section=header&text=QueryMind&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Business%20Intelligence%20Platform&descAlignY=58&descColor=e0e0e0" width="100%"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&pause=1000&color=10b981&center=true&vCenter=true&width=700&lines=Upload+any+CSV+%E2%86%92+Ask+in+plain+English+%E2%86%92+Get+instant+insights;Natural+Language+%E2%86%92+Pandas+pipeline;AI-generated+charts+%2B+tables+%2B+explanations;Built+with+FastAPI+%7C+LangChain+%7C+Groq+%7C+Next.js)](https://git.io/typing-svg)

**[🚀 Live Demo](https://querymind-delta.vercel.app)** · **[⚡ API](https://querymind-production-a6b9.up.railway.app/docs)**

</div>

---

## 🧠 What is QueryMind?

**QueryMind** is a production-ready AI-powered business intelligence platform. Upload any CSV file, ask questions in plain English, and get instant answers with charts, data tables, and explanations — no SQL, no coding, no data analyst needed.

> *"Which product had the highest revenue last quarter?"* → QueryMind writes the Pandas code, runs it on your data, and returns a bar chart with a plain English explanation in seconds.

---

## ✨ Features

- 📂 **CSV Upload** — drag and drop any CSV file, columns auto-detected
- 💬 **Natural Language Queries** — ask questions exactly as you'd ask a colleague
- 🤖 **AI Analysis Engine** — LangChain + Groq (LLaMA 3.3 70B) generates and executes Pandas code
- 📊 **Smart Visualizations** — bar charts, line charts (trends), pie charts (distributions), data tables — auto-selected based on your question
- 🧾 **Code Transparency** — collapsible view of every Pandas query used
- ⚡ **Blazing Fast** — Groq inference in under 1 second
- 🌐 **Fully Deployed** — frontend on Vercel, backend on Railway

---

## 🏗️ Architecture

```
querymind/
├── backend/                    ← Python — FastAPI + LangChain + Pandas
│   ├── app/
│   │   ├── main.py             ← API routes (upload, query, health)
│   │   ├── analyzer.py         ← AI engine — LangChain + Groq pipeline
│   │   └── models.py           ← Pydantic data models
│   ├── requirements.txt
│   ├── railway.toml            ← Railway deployment config
│   └── .env                    ← API keys (not pushed to GitHub)
└── frontend/                   ← Next.js — React + Tailwind + Recharts
    └── app/
        ├── page.js             ← Landing page at /
        └── app/
            └── page.js         ← Chat interface at /app
```

---

## 🛠️ Tech Stack

**Backend**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)

**AI / LLM**

![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logoColor=white)
![LLaMA](https://img.shields.io/badge/LLaMA_3.3_70B-0467DF?style=for-the-badge&logo=meta&logoColor=white)

**Frontend**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logoColor=white)

**Deployment**

![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Getting Started Locally

### Prerequisites
- Python 3.11+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### Backend setup

```bash
git clone https://github.com/SkanderAn/querymind.git
cd querymind/backend

python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

echo "GROQ_API_KEY=your_key_here" > .env

uvicorn app.main:app --reload
```

Backend → **http://localhost:8000**  
API docs → **http://localhost:8000/docs**

### Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend → **http://localhost:3000**

> For local development, change `const API` in `frontend/app/app/page.js` back to `http://localhost:8000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root message |
| GET | `/health` | Server status |
| POST | `/upload` | Upload a CSV file → returns session_id + columns |
| POST | `/query` | Ask a question → returns answer + chart/table data |

### Example upload

```bash
curl -X POST https://querymind-production-a6b9.up.railway.app/upload \
  -F "file=@your_data.csv"
```

### Example query

```bash
curl -X POST https://querymind-production-a6b9.up.railway.app/query \
  -H "Content-Type: application/json" \
  -d '{"question": "Which product had the highest revenue?", "session_id": "your_data"}'
```

### Example response

```json
{
  "answer": "Laptop had the highest total revenue at $511,500.\n\nResult: Laptop",
  "code_used": "result = df.groupby('product')['revenue'].sum().idxmax()",
  "chart_data": null,
  "table_data": null,
  "error": null
}
```

---

## 🗺️ Roadmap

- [x] FastAPI backend with CSV upload
- [x] LangChain + Groq AI analysis engine
- [x] Natural language to Pandas pipeline
- [x] Bar, line, and pie charts with Recharts
- [x] Data table rendering
- [x] Code transparency — collapsible Pandas viewer
- [x] Professional landing page
- [x] Deploy backend to Railway
- [x] Deploy frontend to Vercel
- [ ] Chat history persistence
- [ ] Multi-file support
- [ ] Export reports as PDF
- [ ] User authentication

---

## 👨‍💻 Built by

**Skander Andolsi** — AI & Robotics Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/skander-andolsi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SkanderAn)
[![Portfolio](https://img.shields.io/badge/Portfolio-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-kappa-lime-74.vercel.app/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://querymind-delta.vercel.app)

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10b981,100:6366f1&height=100&section=footer" width="100%"/>
</div>