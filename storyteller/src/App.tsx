import React, { useState } from 'react';
import './App.css';
import { Story } from './data';
import { ComponentChaptersPanel } from './ComponentChaptersPanel';
import { ComponentMainEditor } from './ComponentMainEditor';
import { ComponentTitleAndCaption } from './ComponentTitleAndCaptionPanel';

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

  // Function for handling uploaded JSON story
  const handleUploadedJsonStory = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e :ProgressEvent<FileReader>) => {
        if (e.target) {
          const loadedStory = JSON.parse(e.target.result as string);
          setStory(loadedStory);
        }
      };
      
      reader.readAsText(file);
    }
  } 

  // Function for downloading JSON story file 
  const handleDownloadJsonStory = () => {
    const jsonStr = JSON.stringify(story);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');   

    link.href = url;
    link.download = 'story.json';
    link.click();
  };

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
        {/* OpenAI API Key panel */}
        <div style={{display: "flex"}}>
          <p>OpenAI API Key:</p>
          <p>&nbsp;&nbsp;</p>
          <input id="input_openai_api_key" type="text" value={openaiApiKey} 
            onChange={(e) => setOpenaiApiKey(e.target.value.trim())} />
        </div>

        <hr/>

        {/* IO panel */} 
        <div style={{display: "flex", flexDirection: "column"}}>
          <p>Upload/Download JSON</p>
          <input className="io-input" type="file" onChange={handleUploadedJsonStory} />
          <button id="button_download_json_story" onClick={handleDownloadJsonStory}>Download JSON</button>
        </div>

        <hr/>

        {/* Chapter panel */}
        <ComponentChaptersPanel
          story={story}
          setStory={setStory}
          setSelectedChapterId={setSelectedChapterId}
        ></ComponentChaptersPanel>
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
