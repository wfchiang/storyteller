import streamlit as st 
import re
import json 

import llm 
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

if ("chat_history" not in st.session_state): 
    st.session_state["chat_history"] = [] 

chat_history = st.session_state["chat_history"]

if ("openai_api_key" not in st.session_state): 
    st.session_state["openai_api_key"] = ""

# ====
# Left Panel -- rendering before the main panel  
# ====
with st.sidebar:
    # OpenAPI key 
    openai_api_key = st.text_input(label="OpenAI API Key", value=st.session_state["openai_api_key"])
    if (openai_api_key): 
        st.session_state["openai_api_key"] = openai_api_key

    # Literature upload 
    upload_literature = st.file_uploader(
        label="上傳", 
        accept_multiple_files=False
    )
    if (upload_literature): 
        literature_json = json.loads(upload_literature.getvalue().decode())
        literature = Literature.parse_obj(literature_json)
        st.session_state.literature = literature
 
    st.divider() 

    # New chapter button 
    create_new_chapter = st.button(label="新章節")
    if (create_new_chapter): 
        literature.chapters.append(Chapter(caption="", content="", summary=Summary(story="", characters={})))

    # Chapter selector 
    selected_chapter_id = -1 
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
# Title and chapter caption 
title_column, chapter_caption_column = st.columns(2) 


# Literature title
with title_column:   
    literature.title = st.text_input(label="書名", value=literature.title)

# Chapter caption 
with chapter_caption_column: 
    if (chapter is not None): 
        chapter.caption = st.text_input(label="章節", value=chapter.caption)

st.divider()

# Function and chapter editor columns 
function_column, chapter_editor_column = st.columns(2) 

# Functions 
with function_column: 
    # chapter summary behavior 
    summary_placeholder = None 
    if (chapter is not None):
        summary_behavior = st.selectbox(label="Summary", options=["Hide", "Expand"]) 

        if (summary_behavior == "Expand"):
            summary_placeholder = st.container()  

    # chatbot model 
    llm_model_name = st.selectbox(
        label="Chatbot LLM model", 
        options=[
            "gpt-4-0125-preview", 
            "gpt-3.5-turbo-0125"
        ]
    )
        
    # chatbot behavior 
    chat_behavior = st.selectbox(
        label="Chatbot Behavior", 
        options=[
            "vanilla", 
            "expand idea"
        ]
    )

    # chat history  
    chat_history_placeholder = st.container(height=300)

# Chapter editor 
with chapter_editor_column: 
    if (chapter is not None): 
        # chapter content 
        chapter.content = st.text_area(label="故事", value=chapter.content, height=500)

        # functions 
        save_column, auto_summarize_column = st.columns(2) 

        with save_column: 
            save_story = st.button("確認儲存")

        if (type(openai_api_key) is str and openai_api_key.strip() != ""):
            with auto_summarize_column: 
                auto_sum = st.button("自動總結")

                if (auto_sum): 
                    llm_response = llm.summarize_story(
                        openai_api_key=openai_api_key, 
                        llm_model_name=llm_model_name, 
                        story=chapter.content
                    )
                    chat_history.append({"role": llm_response.type, "text": llm_response.content, "chat_behavior": "summarize_story"})

# Chatbot
user_prompt = st.chat_input("Ask LLM")
if user_prompt:
    if (type(openai_api_key) is not str or openai_api_key.strip() == ""): 
        st.error("Please specify an OpenAI API Key")
    
    else: 
        # save the user prompt
        chat_history.append({"role": "human", "text": user_prompt, "chat_behavior": chat_behavior})

        # ask LLM 
        if (chat_behavior == "expand idea"): 
            llm_response = llm.expand_idea(
                openai_api_key=openai_api_key, 
                llm_model_name=llm_model_name, 
                idea=user_prompt, 
                literature=literature, 
                selected_chapter_caption=selected_chapter_caption
            )
        
        else: 
            llm_response = llm.vanilla(
                openai_api_key=openai_api_key, 
                llm_model_name=llm_model_name, 
                prompt=user_prompt
            )

        chat_history.append({"role": llm_response.type, "text": llm_response.content, "chat_behavior": chat_behavior})

# display the chat history 
with chat_history_placeholder: 
    for message in chat_history: 
        if (message["role"] == "human"): 
            with st.chat_message("user"): 
                st.text(message["text"])
        elif (message["role"] == "ai"): 
            with st.chat_message("assistant"): 
                st.code(message["text"])

# Fill-in the summary 
if (chapter is not None and summary_placeholder is not None):
    with summary_placeholder: 
        # chapter summary 
        chapter.summary.story = st.text_area(label="總結", value=chapter.summary.story)
        
# ====
# Left Panel -- rendering after the main panel  
# ====
with st.sidebar:
    # Divider line 
    st.divider() 

    # Download button 
    download_literatur = st.download_button(
        label="下載", 
        data=json.dumps(literature.dict(), indent=4), 
        file_name="literature.json", 
        mime="application/json"
    )    

