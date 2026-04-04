import os
import pandas as pd
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile",
    temperature=0,
)

def get_dataframe_info(df: pd.DataFrame) -> str:
    """
    Extract useful structural info about the dataframe.
    We never send the full data — just enough for the LLM to understand it.
    """
    # Detect date columns
    date_cols = []
    for col in df.columns:
        if df[col].dtype == object:
            try:
                pd.to_datetime(df[col].head(5))
                date_cols.append(col)
            except:
                pass

    info = f"""
Shape: {df.shape[0]} rows, {df.shape[1]} columns

Columns and data types:
{df.dtypes.to_string()}

Detected date columns: {date_cols if date_cols else 'None'}

First 5 rows:
{df.head(5).to_string()}

Numeric statistics:
{df.describe().to_string()}

Missing values per column:
{df.isnull().sum().to_string()}
    """
    return info

def analyze(df: pd.DataFrame, question: str) -> dict:
    """
    Core AI function:
    Takes a dataframe + question → returns answer, code, chart data, table data.
    """

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are QueryMind, an expert data analyst AI.
You are given information about a pandas DataFrame called 'df'.

YOUR JOB:
1. Write clean Python/Pandas code to answer the question
2. Store the final result in a variable called 'result'
3. Write a clear plain English explanation
4. Decide if the result should be shown as a CHART, TABLE, or just TEXT

CHART RULES — set result to a dict with 'labels' and 'values' when:
- Comparing values across categories (sales by product, count by city)
- Showing trends over time (monthly revenue, daily counts)
- Ranking items (top 5, bottom 3)
- Distribution of a column

TABLE RULES — set result to a dict with 'headers' and 'rows' (list of lists) when:
- User asks to "show", "display", or "list" rows
- User asks for top N or bottom N records with multiple columns
- Result is naturally tabular

TEXT RULES — set result to a string when:
- Single number answer (count, average, max, min)
- Yes/no question
- Simple factual answer

CHART FORMAT EXAMPLE:
result = {{"labels": ["Jan", "Feb", "Mar"], "values": [100, 150, 120], "chart_type": "line"}}
Use "line" for time-series, "bar" for categories, "pie" for proportions (max 6 items)

TABLE FORMAT EXAMPLE:
result = {{"headers": ["name", "sales", "revenue"], "rows": [["A", 10, 500], ["B", 20, 1000]]}}

IMPORTANT RULES:
- Only use pandas on 'df' — no other imports needed, pd and df are available
- Always assign final answer to 'result'
- Never use print() statements
- Keep code clean and readable
- If you add markdown backticks around code, I will remove them automatically

Respond in EXACTLY this format:
CODE:
<your pandas code here>

EXPLANATION:
<your plain english explanation here>
"""),
        ("human", """
DataFrame info:
{df_info}

Question: {question}
""")
    ])

    chain = prompt | llm
    response = chain.invoke({
        "df_info": get_dataframe_info(df),
        "question": question
    })

    raw = response.content

    # Parse response
    try:
        code_part = raw.split("CODE:")[1].split("EXPLANATION:")[0].strip()
        explanation_part = raw.split("EXPLANATION:")[1].strip()
        # Clean markdown backticks
        code_part = code_part.replace("```python", "").replace("```", "").strip()
    except IndexError:
        return {
            "answer": raw,
            "code_used": "Could not parse code",
            "chart_data": None,
            "table_data": None,
        }

    # Execute the code safely
    try:
        local_vars = {"df": df.copy(), "pd": pd}
        exec(code_part, {}, local_vars)
        result = local_vars.get("result", "No result variable found")

        chart_data = None
        table_data = None
        result_str = ""

        if isinstance(result, dict):
            # Chart result
            if "labels" in result and "values" in result:
                chart_data = {
                    "labels": [str(l) for l in result["labels"]],
                    "values": [float(v) if v is not None else 0 for v in result["values"]],
                    "chart_type": result.get("chart_type", "bar")
                }
                result_str = "Chart generated successfully"

            # Table result
            elif "headers" in result and "rows" in result:
                table_data = {
                    "headers": result["headers"],
                    "rows": [[str(cell) for cell in row] for row in result["rows"]]
                }
                result_str = f"Table with {len(result['rows'])} rows"

            else:
                result_str = str(result)

        elif isinstance(result, pd.DataFrame):
            # Auto-convert small dataframes to table
            if len(result) <= 20:
                table_data = {
                    "headers": list(result.columns),
                    "rows": result.values.tolist()
                }
                result_str = f"Table with {len(result)} rows"
            else:
                result_str = result.to_string()

        elif isinstance(result, pd.Series):
            # Auto-convert series to chart
            if len(result) <= 30:
                chart_data = {
                    "labels": [str(i) for i in result.index],
                    "values": [float(v) if pd.notna(v) else 0 for v in result.values],
                    "chart_type": "bar"
                }
                result_str = "Chart generated from series"
            else:
                result_str = result.to_string()
        else:
            result_str = str(result)

        return {
            "answer": f"{explanation_part}\n\n**Result:** {result_str}",
            "code_used": code_part,
            "chart_data": chart_data,
            "table_data": table_data,
        }

    except Exception as e:
        return {
            "answer": explanation_part,
            "code_used": code_part,
            "chart_data": None,
            "table_data": None,
            "error": str(e)
        }
