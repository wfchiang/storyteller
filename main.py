import streamlit as st 
import re 

from data import Literature, Chapter, Summary

import logging 
logging.basicConfig(level=logging.INFO)

# Page Config 
st.set_page_config(
    layout="wide"
)

# Session 
if ("literature" not in st.session_state): 
    st.session_state["literature"] = Literature(title="", chapters=[])

literature = st.session_state.literature

# ====
# Left Panel 
# ====
with st.sidebar:
    # New chapter button 
    create_new_chapter = st.button(label="新章節")
    if (create_new_chapter): 
        literature.chapters.append(Chapter(caption="", content="", summary=Summary(story="", characters={})))

    # Chapter selector 
    chapter = None  
    if (len(literature.chapters) > 0): 
        chapter_captions = list(map(lambda i_ch: f"Ch {i_ch[0]+1}: {i_ch[1].caption}", enumerate(literature.chapters)))
        selected_chapter_caption = st.radio(
            label="章節", 
            options=chapter_captions, 
            key=chapter_captions[0]
        )

        selected_chapter_id = int(re.search(r"Ch (\d+):", selected_chapter_caption).group(1)) - 1
        chapter = literature.chapters[selected_chapter_id]

# ====
# Main panel
# ====
# Literature title  
story_title = st.text_input(label="Title", value=literature.title)
literature.title = story_title

# Chapter editor 
if (chapter is not None): 
    # chapter caption 
    ch_caption = st.text_input(label="Chapter Caption", value=chapter.caption)
    chapter.caption = ch_caption

    # chapter content 
    ch_content = st.text_area(label="Story", value=chapter.content)
    chapter.content = ch_content


logging.info(f"DEBUG {st.session_state.literature.dict()}")


