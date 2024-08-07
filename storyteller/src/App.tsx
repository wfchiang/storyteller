import React, { useState } from 'react';
import './App.css';
import { Story } from './data';

function App() {
  // Get the story state 
  let initStory :Story = {
    title: "", 
    abstract: "", 
    chapters :[]
  }; 

  const [story, setStory] = useState(initStory); 

  // Function for updating the story title 
  const onChangeStoryTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStory({...story, title: event.target.value.trim()}); 
    console.log(story); 
  }; 

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
    <div className="App">
      <div className="io-div">
        <p>Upload JSON story file: </p>
        <input className="io-input" type="file" onChange={handleUploadedJsonStory} />
        <button id="button_download_json_story" onClick={handleDownloadJsonStory}>Download JSON</button>
      </div>

      <h1>Title</h1>
      <input className="title-input" type="text" value={story.title} onChange={onChangeStoryTitle} />
    </div>
  );
}

export default App;
