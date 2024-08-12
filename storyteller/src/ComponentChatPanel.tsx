import { useState } from "react";
import { ChatMessage } from "./data";


export interface ComponentChatPanelProps {
    chatHistory :ChatMessage[]; 
    setChatHistory : (newChatHistory :ChatMessage[]) => void; 
}; 


export function ComponentChatPanel (props :ComponentChatPanelProps) {
    const [userPrompt, setUserPrompt] = useState(""); 

    const getLatestLLMResponse = (chatHistory :ChatMessage[]) => {
        for (let i = chatHistory.length -1 ; i >= 0 ; i--) {
            if (["ai", "assistant"].indexOf(chatHistory[i].role) >= 0) {
                return chatHistory[i].content; 
            }
        }
        return ""; 
    }; 

    return (
        <div id="div_chat_panel" style={{display: "flex", flexDirection: "column"}}>
            {/* LLM Response */}
            <p>LLM:</p>
            <textarea id="textarea_llm_response"
                rows={5} 
                value={getLatestLLMResponse(props.chatHistory)}
            ></textarea>
            
            {/* User Prompt */}
            <p>User:</p>
            <textarea id="textarea_user_prompt"
                rows={5}
                value={userPrompt}
                onChange={(e) => {setUserPrompt(e.target.value)}}
            ></textarea>
        </div>
    );
}; 