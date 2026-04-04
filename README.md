<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:10b981&height=200&section=header&text=QueryMind&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Business%20Intelligence%20Platform&descAlignY=58&descColor=e0e0e0" width="100%"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&pause=1000&color=10b981&center=true&vCenter=true&width=700&lines=Upload+any+CSV+%E2%86%92+Ask+in+plain+English+%E2%86%92+Get+instant+insights;Natural+Language+%E2%86%92+Pandas+%2F+SQL+pipeline;AI-generated+charts+%2B+explanations;Built+with+FastAPI+%7C+LangChain+%7C+Groq+%7C+React)](https://git.io/typing-svg)

</div>

---

## 🧠 What is QueryMind?

**QueryMind** is an AI-powered business intelligence platform that lets anyone analyze data using plain English — no SQL, no coding, no data analyst needed.

Upload a CSV file, ask a question like *"Which product had the highest revenue?"*, and QueryMind's AI engine writes the Pandas query, executes it on your data, and returns a clear answer with an explanation and chart.

---

## ✨ Features

- 📂 **CSV Upload** — drag and drop any CSV file
- 💬 **Natural Language Queries** — ask questions in plain English
- 🤖 **AI-Powered Analysis** — LangChain + Groq (LLaMA 3.3 70B) generates and executes Pandas code
- 📊 **Auto-generated Charts** — visualize results instantly with Recharts
- 🧾 **Code Transparency** — see exactly what Pandas code the AI used
- ⚡ **Blazing Fast** — Groq inference in under 1 second
- 🐳 **Dockerized** — run the full stack with one command

---

## 🏗️ Architecture

```
querymind/
├── backend/                 ← Python — FastAPI + LangChain + Pandas
│   ├── app/
│   │   ├── main.py          ← API routes (upload, query, health)
│   │   ├── analyzer.py      ← AI engine — LangChain + Groq pipeline
│   │   └── models.py        ← Pydantic data models
│   ├── requirements.txt
│   └── .env                 ← API keys (not pushed to GitHub)
└── frontend/                ← Next.js — React + Tailwind + Recharts
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

**DevOps**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### Backend setup

```bash
# Clone the repo
git clone https://github.com/SkanderAn/querymind.git
cd querymind/backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Add your Groq API key
echo "GROQ_API_KEY=your_key_here" > .env

# Start the server
uvicorn app.main:app --reload
```

Backend runs at → **http://localhost:8000**
API docs at → **http://localhost:8000/docs**

### Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Server status |
| POST | `/upload` | Upload a CSV file |
| POST | `/query` | Ask a question about your data |

### Example query

```bash
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "Which product had the highest revenue?", "session_id": "test"}'
```

### Example response

```json
{
  "answer": "Laptop had the highest total revenue at $511,500.\n\nResult: Laptop",
  "code_used": "result = df.groupby('product')['revenue'].sum().idxmax()",
  "chart_data": null,
  "error": null
}
```

---

## 🗺️ Roadmap

- [x] FastAPI backend skeleton
- [x] CSV upload endpoint
- [x] LangChain + Groq AI analysis engine
- [x] Natural language to Pandas pipeline
- [ ] React frontend with file upload UI
- [ ] Interactive charts with Recharts
- [ ] Chat history per session
- [ ] Multi-file support
- [ ] Docker Compose full stack
- [ ] Deploy to Railway + Vercel

---

## 👨‍💻 Built by

**Skander Andolsi** — AI & Robotics Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/skander-andolsi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SkanderAn)
[![Portfolio](https://img.shields.io/badge/Portfolio-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/SkanderAn/portfolio)

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10b981,100:6366f1&height=100&section=footer" width="100%"/>
</div>