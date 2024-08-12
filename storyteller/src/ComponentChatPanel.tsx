import { useState } from "react";
import { ChatMessage } from "./data";
import { ComponentSideOperationPanelProps } from "./ComponentSideOperationPanel"


export interface ComponentChatPanelProps extends ComponentSideOperationPanelProps{
    display :string; 
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

    const autoGenerateStoryContent = () => {
        let prompt = `我正在寫小說的一個章節。請根據以下提供的本章節大綱，書寫詳盡內容。\n\n大綱: ${props.chapterIdea}`;
        askLLM(prompt);  
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
            <div style={{display: "flex"}}>
                <p>User:&nbsp;&nbsp;</p>
                <button id="button_auto_generate_content" onClick={autoGenerateStoryContent}>根據故事大綱生成內容</button>
            </div>
            <textarea id="textarea_user_prompt"
                rows={5}
                value={userPrompt}
                onChange={(e) => {setUserPrompt(e.target.value)}}
            ></textarea>
            <button id="button_ask_llm" onClick={() => askLLM(userPrompt)}>Ask</button>
        </div>
    );
}; 