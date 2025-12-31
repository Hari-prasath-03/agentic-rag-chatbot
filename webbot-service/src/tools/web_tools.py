import os
import requests
from ddgs import DDGS
from langchain_core.tools import tool

os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
from langchain_community.document_loaders import WebBaseLoader

@tool
def web_search(query: str, num_results: int = 3) -> str:
    """
    Finds and reads top web results for a query. Best for general knowledge, 
    news, or gathering information from multiple sources.
    
    Args:
        query: The search query string.
        num_results: Number of results to search and scrape (default: 3).
                     Keep this number small to ensure quick response times.
    Returns:
        A formatted string containing titles, URLs, and the full page content of the search results.
    """
    print(f"🔍 Performing web search for query: '{query}' ...")
    try:
        results = DDGS().text(query=query, max_results=num_results, region='us-en')
        if not results:
            return f"No results found for query: '{query}'"
        
        formatted_results = [f"--- Search Results for '{query}' ---\n"]
        for i, result in enumerate(results):
            title = result.get('title', 'No Title')
            href = result.get('href', '')
            snippet = result.get('body', 'No Snippet Available')
            
            try:
                loader = WebBaseLoader(href)
                loader.requests_kwargs = {'timeout': 5} # Set a timeout to prevent hanging
                documents = loader.load()
                
                page_content = "\n\n".join([doc.page_content for doc in documents])
                page_content = page_content[:2000]  # Limit content length to first 2000 characters
                body = f"Full page content:\n{page_content}"
            except Exception as e:
                body = f"Snippet (Scraping Failed):\n{snippet}"
            
            formatted_results.append(f"Result {i+1}:\nTitle: {title}\nURL: {href}\n{body}\n{'-'*40}\n")
        
        join_formatted_results = "\n".join(formatted_results)
        print(f"✅ Successfully retrieved search results {join_formatted_results[:100]}...")
        return join_formatted_results
    except Exception as e:
        return f"Error during web search: {e}"
    

@tool
def web_scrape(url: str) -> str:
    """
    Extracts full text content from a specific webpage. Use this when a 
    direct HTTP/HTTPS link is provided by the user (excluding GitHub profiles).
    
    Args:
        url: The URL of the webpage to scrape.
    
    Returns:
        The full text content of the webpage, limited to the first 3000 characters.
    """
    print(f"🔍 Scraping URL: '{url}' ...")
    try:
        loader = WebBaseLoader(url)
        loader.requests_kwargs = {"timeout": 10}
        docs = loader.load()

        content = "\n\n".join(doc.page_content for doc in docs)
        print(f"✅ Successfully scraped content from: '{content[:60]}...'")
        return content[:4000]  # limit length
    except Exception as e:
        return f"Failed to scrape URL: {e}"


@tool
def github_profile(url: str) -> str:
    """
    Retrieves technical metadata, top repositories, and bio info for a 
    GitHub user via API. Use specifically for GitHub profile links.
    
    Args:
        url: The GitHub profile URL.
    
    Returns:
        A summary of the user's profile including bio, location, public repos, and followers.
    """
    print(f"🔍 Analyzing GitHub profile: '{url}' ...")
    try:
        username = url.rstrip("/").split("/")[-1]
        api_url = f"https://api.github.com/users/{username}"

        resp = requests.get(api_url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        
        content = f"""
GitHub User: {data.get('name') or username}
Bio: {data.get('bio')}
Location: {data.get('location')}
Public Repositories: {data.get('public_repos')}
Followers: {data.get('followers')}
Following: {data.get('following')}
Profile URL: {data.get('html_url')}
"""
        print(f"✅ Successfully retrieved GitHub profile: '{content[:60]}...'")
        return content
    except Exception as e:
        return f"Failed to analyze GitHub profile: {e}"
