from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .story import STORIES, build_story

app = FastAPI(title="Cuentos de Emma", version="0.1.0")


class StoryRequest(BaseModel):
    story_id: str
    child_name: str = Field(default="Emma", max_length=24)


@app.get("/api/stories")
def list_stories() -> list[dict[str, str]]:
    return [
        {"id": key, "title": story.title, "value": story.value}
        for key, story in STORIES.items()
    ]


@app.post("/api/stories")
def create_story(request: StoryRequest) -> dict[str, object]:
    try:
        return build_story(request.story_id, request.child_name)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
