from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os
from google.oauth2 import id_token
from google.auth.transport import requests

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

YOUR_GOOGLE_CLIENT_ID = os.environ.get(
    "GOOGLE_CLIENT_ID")


app = FastAPI()

# Allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoUrl(BaseModel):
    url: str

class PlaylistUrl(BaseModel):
    playlist_url: str

class BatchUrls(BaseModel):
    urls: List[str]

def extract_video_id(url):
    # Simple extraction, can be improved
    import re
    match = re.search(r"(?:v=|youtu\.be/)([A-Za-z0-9_-]{11})", url)
    if match:
        return match.group(1)
    raise ValueError("Invalid YouTube URL")

@app.post("/transcript")
def get_transcript(data: VideoUrl):
    try:
        video_id = extract_video_id(data.url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return {"video_id": video_id, "transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/batch")
def get_batch_transcripts(data: BatchUrls):
    results = []
    for url in data.urls:
        try:
            video_id = extract_video_id(url)
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            results.append({"video_id": video_id, "transcript": transcript})
        except Exception as e:
            results.append({"video_id": None, "error": str(e)})
    return results

@app.post("/summarize")
def summarize_transcript(data: VideoUrl):
    try:
        video_id = extract_video_id(data.url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([entry['text'] for entry in transcript])
        
        # call OpenAI API for summarization 
        response = client.responses.create(
            model="gpt-4o",
            instructions="You are a helpful assistant. Provide a concise and well-structured summary with bullet points.",
            input=f"Summarize the following transcript: {transcript_text}",
            
            
        )
        
        summary = response.output_text.strip()
        return {"video_id": video_id, "summary": summary}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/verify-token")
def verify_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "YOUR_GOOGLE_CLIENT_ID")
        userid = idinfo['sub']
        return {"status": "success", "userid": userid}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid token")