from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from typing import List
from fastapi.middleware.cors import CORSMiddleware


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

# Playlist support would require extracting all video IDs from the playlist URL
