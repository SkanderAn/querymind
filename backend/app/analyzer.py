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
    info = f"""
    shape: {df.shape[0]} rows, {df.shape[1]} columns

    Columns and types:
    {df.dtypes.to_string()}

    First 3 rpws as sample:
    {df.head(3).to_string()}

    Basic statistics:
    {df.describe().to_string()}
"""
    return info

def analyze(df: pd.DataFrame, question: str) -> dict:
    """
    Main function: takes a dataframe and a question,
    returns an answer and the pandas code used.
    """

    # Step 1: build the prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert data analyst. 
        You are given information about a pandas DataFrame called 'df'.
        
        Your job:
        1. Write a short Python/Pandas code snippet to answer the question
        2. The code must store its result in a variable called 'result'
        3. Write a clear plain English explanation of the answer
        
        IMPORTANT RULES:
        - Only use pandas operations on 'df'
        - Always assign final answer to 'result'
        - Keep code simple and readable
        - If the question asks for a chart or visualization, 
          set result to a dict with keys 'labels' and 'values'
        
        Respond in this exact format:
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

    # Step 2: call the LLM
    chain = prompt | llm
    response = chain.invoke({
        "df_info": get_dataframe_info(df),
        "question": question
    })

    raw = response.content

    # Step 3: parse the response
    try:
        code_part = raw.split("CODE:")[1].split("EXPLANATION:")[0].strip()
        explanation_part = raw.split("EXPLANATION:")[1].strip()

        # Clean markdown backticks if LLM added them
        code_part = code_part.replace("```python", "").replace("```", "").strip()

    except IndexError:
        return {
            "answer": raw,
            "code_used": "Could not parse code",
            "chart_data": None
        }
    
    # Step 4: execute the code safely
    try:
        local_vars = {"df": df, "pd": pd}
        exec(code_part, {}, local_vars)
        result = local_vars.get("result", "No result variable found")

        # Check if result is chart data
        chart_data = None
        if isinstance(result, dict) and "labels" in result:
            chart_data = result
            result_str = "Chart data generated successfully"
        else:
            result_str = str(result)

        return {
            "answer": f"{explanation_part}\n\nResult: {result_str}",
            "code_used": code_part,
            "chart_data": chart_data
        }

    except Exception as e:
        return {
            "answer": explanation_part,
            "code_used": code_part,
            "chart_data": None,
            "error": str(e)
        }