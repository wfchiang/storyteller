import './App.css';
import { ChatMessage, Story } from './data';
import { ComponentOpenAiKeyPanel } from './ComponentOpenAiKeyPanel';
import { ComponentStoryIO } from './ComponentStoryIO';
import { ComponentChaptersPanel } from './ComponentChaptersPanel';
import { ComponentChatPanel } from './ComponentChatPanel';


export interface ComponentSideOperationPanelProps {
    // OpenAI API Key
    openaiApiKey :string; 
    setOpenaiApiKey : (newOpenaiApiKey :string) => void; 

    // Story 
    story: Story;
    setStory: (newStory: Story) => void;

    // Set selected chapter ID 
    setSelectedChapterId : (newSelectedChapterId :number) => void; 

    // Chat history 
    chatHistory :ChatMessage[]; 
    setChatHistory : (newChatHistory :ChatMessage[]) => void; 
}; 


export function ComponentSideOperationPanel (props :ComponentSideOperationPanelProps) {
    return (
        <div 
            id="div_operations_panel"
            className="top-level-panel"
        >
            {/* OpenAI API Key */}
            <ComponentOpenAiKeyPanel openaiApiKey={props.openaiApiKey} setOpenaiApiKey={props.setOpenaiApiKey}></ComponentOpenAiKeyPanel>

            {/* horizontal line */}
            <hr/>

            {/* Story IO */}
            <ComponentStoryIO story={props.story} setStory={props.setStory}></ComponentStoryIO>

            <hr/> 

            {/* Chapter panel */}
            <ComponentChaptersPanel
                story={props.story}
                setStory={props.setStory}
                setSelectedChapterId={props.setSelectedChapterId}
            ></ComponentChaptersPanel>

            {/* Chat panel */}
            <ComponentChatPanel
                chatHistory={props.chatHistory}
                setChatHistory={props.setChatHistory}
            ></ComponentChatPanel>
        </div>
    ); 
}; 