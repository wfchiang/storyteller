import './App.css';
import { ChatMessage, Story } from './data';
import { ComponentOpenAiKeyPanel } from './ComponentOpenAiKeyPanel';
import { ComponentStoryIO } from './ComponentStoryIO';
import { ComponentChaptersPanel } from './ComponentChaptersPanel';
import { ComponentChatPanel } from './ComponentChatPanel';
import { ComponentMainEditorProps } from './ComponentMainEditor';
import { useState } from 'react';


export interface ComponentSideOperationPanelProps extends ComponentMainEditorProps{
    // OpenAI API Key
    openaiApiKey :string; 
    setOpenaiApiKey : (newOpenaiApiKey :string) => void; 

    // Set selected chapter ID 
    setSelectedChapterId : (newSelectedChapterId :number) => void; 

    // Chat history 
    chatHistory :ChatMessage[]; 
    setChatHistory : (newChatHistory :ChatMessage[]) => void; 

    // Chat model 
    selectedModelName :string; 
    setSelectedModelName : (newSelectedModelName :string) => void; 
}; 


export function ComponentSideOperationPanel (props :ComponentSideOperationPanelProps) {
    let [settingsDisplay, setSettingsDisplay] = useState("flex"); 
    let [chapterDisplay, setChapterDisplay] = useState("flex"); 
    let [chatDisplay, setChatDisplay] = useState("none"); 

    return (
        <div 
            id="div_operations_panel"
            className="top-level-panel"
        >
            <h3 onClick={() => {return (settingsDisplay==="flex" ? setSettingsDisplay("none") : setSettingsDisplay("flex"));}}>Settings</h3>
            <div 
                id="div_side_opts_settings" 
                style={{display: settingsDisplay, flexDirection: "column"}}
            >
                {/* OpenAI API Key */}
                <ComponentOpenAiKeyPanel openaiApiKey={props.openaiApiKey} setOpenaiApiKey={props.setOpenaiApiKey}></ComponentOpenAiKeyPanel>

                {/* Story IO */}
                <ComponentStoryIO story={props.story} setStory={props.setStory}></ComponentStoryIO>
            </div>

            {/* Chapter panel */}
            <h3 onClick={() => {return (chapterDisplay==="flex" ? setChapterDisplay("none") : setChapterDisplay("flex"));}}>Chapters</h3>
            <ComponentChaptersPanel
                display={chapterDisplay}
                story={props.story}
                setStory={props.setStory}
                setSelectedChapterId={props.setSelectedChapterId}
            ></ComponentChaptersPanel>

            {/* Chat panel */}
            <h3 onClick={() => {return (chatDisplay==="flex" ? setChatDisplay("none") : setChatDisplay("flex"));}}>Chat</h3>
            <ComponentChatPanel
                display={chatDisplay}
                chapterId={props.chapterId} setSelectedChapterId={props.setSelectedChapterId}
                openaiApiKey={props.openaiApiKey} setOpenaiApiKey={props.setOpenaiApiKey}
                story={props.story} setStory={props.setStory}
                chatHistory={props.chatHistory} setChatHistory={props.setChatHistory}
                chapterIdea={props.chapterIdea} setChapterIdea={props.setChapterIdea}
                selectedModelName={props.selectedModelName} setSelectedModelName={props.setSelectedModelName}
            ></ComponentChatPanel>
        </div>
    ); 
}; 