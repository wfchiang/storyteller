import { useState } from "react";
import { ChatMessage } from "./data";


export interface ComponentChatPanelProps {
    display :string; 
    openaiApiKey :string; 
    chatHistory :ChatMessage[]; 
    setChatHistory : (newChatHistory :ChatMessage[]) => void; 
    selectedModelName :string; 
    setSelectedModelName : (newSelectedModelName :string) => void; 
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

    const askLLM = (prompt :string) => {
        fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                "method": "POST",
                "headers": {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${props.openaiApiKey}`
                },
                "body": JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ]
                })
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('OpenAI response was not ok');
                }
                return response.json();
            })
            .then(jsonData => {
                let llmAnswers = jsonData.choices[0].message.content.trim();
                let newChatMessage :ChatMessage = {
                    role: "assistant", 
                    content: llmAnswers
                };
                let newChatHistory = [...props.chatHistory, newChatMessage]
                props.setChatHistory(newChatHistory); 
            })
            .catch(error => {
                console.error('Error on calling OpenAI:', error);

            });
    }; 

    return (
        <div id="div_chat_panel" style={{display: props.display, flexDirection: "column"}}>
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
            <button id="button_ask_llm" onClick={() => askLLM(userPrompt)}>Ask</button>
        </div>
    );
}; 