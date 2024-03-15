from typing import Any, List, Dict  
from pydantic import BaseModel 

class Summary (BaseModel): 
    story: str 
    characters :Dict[str, str]

class Chapter (BaseModel): 
    caption :str 
    content :str 
    summary :Summary

class Literature (BaseModel): 
    title :str 
    chapters :List[Chapter]
