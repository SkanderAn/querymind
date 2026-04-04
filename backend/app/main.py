import os
import pandas as pd
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import QueryRequest, QueryResponse
from app.analyzer import analyze
import io

app = FastAPI(
    title="QueryMind API",
    description="AI-powered data analysis platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for uploaded dataframes
# Key: session_id, Value: dataframe
dataframes = {}

@app.get("/")
def root():
    return {"message": "QueryMind API is running"}

@app.get("/health")
def health():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Accepts a CSV file, reads it into a pandas DataFrame,
    stores it in memory and returns a session_id.
    """
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported"
        )

    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        # Generate a simple session ID from filename
        session_id = file.filename.replace(".csv", "").replace(" ", "_")
        dataframes[session_id] = df

        return {
            "session_id": session_id,
            "filename": file.filename,
            "rows": len(df),
            "columns": list(df.columns),
            "message": "File uploaded successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse)
async def query_data(request: QueryRequest):
    """
    Accepts a question and session_id,
    runs the AI analyzer and returns the answer.
    """
    if request.session_id not in dataframes:
        raise HTTPException(
            status_code=404,
            detail="No file found for this session. Please upload a CSV first."
        )

    df = dataframes[request.session_id]
    result = analyze(df, request.question)

    return QueryResponse(
        answer=result["answer"],
        code_used=result["code_used"],
        chart_data=result.get("chart_data"),
        error=result.get("error")
    )