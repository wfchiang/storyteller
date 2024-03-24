from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_community.chat_models.openai import ChatOpenAI

from data import Literature

def get_openai_llm (openai_api_key :str, model_name :str): 
    return ChatOpenAI(
        openai_api_key=openai_api_key, 
        model_name="gpt-4-0125-preview"
    )

def vanilla (
        openai_api_key :str, 
        llm_model_name :str, 
        prompt :str
) -> str: 
    openai_llm = get_openai_llm(openai_api_key=openai_api_key, model_name=llm_model_name)

    return openai_llm.invoke([
        HumanMessage(content=prompt)
    ])

def expand_idea (
        openai_api_key :str, 
        llm_model_name :str, 
        idea :str, 
        literature :Literature, 
        selected_chapter_caption :int 
): 
    openai_llm = get_openai_llm(openai_api_key=openai_api_key, model_name=llm_model_name)

    # summarize the outline 
    outline = "" 

    # summarize the characters 
    characters = "" 

    # ask LLM 
    return openai_llm.invoke([
        SystemMessage(content=f"你是一個傑出的小說家，充滿創意與想像力。"), 
        HumanMessage(content=f"請本著前情提要以及人物介紹，展開本章節構思，寫出一個章節的小說內容。"),
        HumanMessage(content=f"前情提要:\n{outline}\n"), 
        HumanMessage(content=f"人物介紹:\n{characters}\n"), 
        HumanMessage(content=f"本章節構思:\n{idea}\n"), 
        HumanMessage(content=f"請寫出本章節小說內容。")
    ])

def summarize_story (
        openai_api_key :str, 
        llm_model_name :str, 
        story :str 
): 
    openai_llm = get_openai_llm(openai_api_key=openai_api_key, model_name=llm_model_name)

    # ask LLM
    return openai_llm.invoke([
        SystemMessage(content=f"你是一個傑出的小說編輯。"), 
        HumanMessage(content=f"請總結本章節的故事。內容如下\n\n{story}")
    ])