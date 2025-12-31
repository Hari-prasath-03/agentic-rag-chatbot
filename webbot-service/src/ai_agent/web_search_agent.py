import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.prebuilt import create_react_agent
from src.tools.web_tools import web_search, web_scrape, github_profile

model = os.getenv("GENAI_MODEL", "gemini-2.5-flash")
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment")

llm = ChatGoogleGenerativeAI(
    model=model, 
    temperature=0
)

tools = [web_search, web_scrape, github_profile]

prompt = ChatPromptTemplate.from_messages([
    ("system", 
     """You are a Professional Research & Intelligence Agent. 
Your goal is to transform raw web data into insightful, structured reports.

Your job:
- Understand the user's intent
- Choose the most appropriate tool when required
- Produce a well-structured, informative response
- Include URLs when available

### Tool Selection Logic:
- GitHub URLs: Use `github_profile`. Do not use `web_scrape` for GitHub profiles.
- Specific URLs: Use `web_scrape` directly. Do not search for a URL that is already provided.
- General Queries: Use `web_search` to find relevant sources when no URL is provided.

### Analysis Standards:
- Depth: Don't just summarize text; identify technical stacks, project impact, and professional focus.
- Accuracy: Base all claims on tool output. If information is missing, state that it was not found.
- Formatting: Use clear headings and bullet points. Always cite the source URLs at the end.
"""), 
    ("placeholder", "{messages}"),
])

agent = create_react_agent(
    model=llm,
    tools=tools,
    prompt=prompt,
)

def run_web_search_agent(query: str) -> dict:
    """
    Run the agent and return final output as a string.
    """
    result = agent.invoke({"messages": [("human", query)]})
    last_content = result["messages"][-1].content

    if isinstance(last_content, list):
        answer = "".join(
            part.get("text", "")
            for part in last_content
            if isinstance(part, dict)
        )
    else:
        answer = str(last_content)

    return {
        "query": query,
        "answer": answer
    }




