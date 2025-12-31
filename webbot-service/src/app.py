from fastapi import FastAPI, HTTPException
from src.ai_agent.web_search_agent import run_web_search_agent
from src.model.dto import ResearchRequest, ResearchResponse

app = FastAPI()

@app.get("/ai-assist/health")
def read_root():
    return {"status": "healthy"}

@app.post("/ai-assist/research", response_model=ResearchResponse)
def research(req: ResearchRequest):
    print(req)
    try:
        result = run_web_search_agent(req.query)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Agent execution failed: {str(e)}"
        )
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081)
