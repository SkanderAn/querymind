from pydantic import BaseModel
from typing import Optional, List

class QueryRequest(BaseModel):
    question: str
    session_id: Optional[str] = None

class ChartData(BaseModel):
    labels: List[str]
    values: List[float]
    chart_type: Optional[str] = "bar"

class TableData(BaseModel):
    headers: List[str]
    rows: List[List[str]]

class QueryResponse(BaseModel):
    answer: str
    code_used: str
    chart_data: Optional[ChartData] = None
    table_data: Optional[TableData] = None
    error: Optional[str] = None
