from pydantic import BaseModel
from typing import  Optional


class QueryRequest(BaseModel):
    question: str
    session_id: Optional[str] = None


class QueryResponse(BaseModel):
    answer: str
    code_used: str
    chart_data: Optional[dict] = None
    error: Optional[str] = None
