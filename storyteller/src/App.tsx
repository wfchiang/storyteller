import React, { useState } from 'react';
import './App.css';
import { ChatMessage, Story } from './data';
import { ComponentMainEditor } from './ComponentMainEditor';
import { ComponentTitleAndCaption } from './ComponentTitleAndCaptionPanel';
import { ComponentSideOperationPanel } from './ComponentSideOperationPanel';

function App() {
  // Set the OpenAI API Key 
  const [openaiApiKey, setOpenaiApiKey] = useState(""); 

  // Get the story state 
  let initStory :Story = {
    title: "", 
    abstract: "", 
    chapters :[]
  }; 

  const [story, setStory] = useState(initStory); 

  // Get the state of the selected chapter ID 
  const [selectedChapterId, setSelectedChapterId] = useState(-1); 

  // Get the chat history 
  const initChatHistory :ChatMessage[] = []; 
  const [chatHistory, setChatHistory] = useState(initChatHistory); 

  // Selected model name 
  const [selectedModelName, setSelectedModelName] = useState("gpt-4-turbo"); 

  // Rendering 
  return (
    <div 
      id="div_app"
      style={{display: "flex"}}
    >
      <div 
        id="div_operations_panel"
        className="top-level-panel"
      >
        <ComponentSideOperationPanel 
          openaiApiKey={openaiApiKey} setOpenaiApiKey={setOpenaiApiKey} 
          story={story} setStory={setStory}
          setSelectedChapterId={setSelectedChapterId} 
          chatHistory={chatHistory} setChatHistory={setChatHistory}
          selectedModelName={selectedModelName} setSelectedModelName={setSelectedModelName}
        ></ComponentSideOperationPanel>
      </div>

      <div id="div_main_editor_panel" className="top-level-panel">
        {/* Title panel */}
        <ComponentTitleAndCaption
          chapterId={selectedChapterId} 
          story={story}
          setStory={setStory}
        ></ComponentTitleAndCaption>
        
        <hr/>

        {/* Main editor */}
        <ComponentMainEditor
          chapterId={selectedChapterId} 
          story={story}
          setStory={setStory}
        ></ComponentMainEditor>
        
      </div>
    </div>
  );
}

export default App;
