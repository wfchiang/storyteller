import './App.css';
import { Chapter, Story } from "./data";


export interface ComponentMainEditorProps {
    idChapter: number;
    story: Story;
    setStory: (newStory: Story) => void;
}; 


export function ComponentMainEditor (props :ComponentMainEditorProps) {
    // Render 
    return (
        props.idChapter < 0  
        ? (<p>No chapter selected...</p>)
        : (
            <div id="div_main_editor" style={{display: "flex", flexDirection: "column"}}>
                {/* chapter caption */}
                <div id="div_chapter_caption">
                    <h3>第 {props.idChapter+1} 章&nbsp;&nbsp;{props.story.chapters[props.idChapter].caption}</h3>
                </div>

                {/* chapter summary and content */}
                <div id="div_chapter_summary_and_content" style={{display: "flex"}}>
                    {/* chapter summary */}
                    <div id="div_chapter_summary" className="editor-panel"> 
                        <h3>故事大綱/走向</h3>
                        <textarea id="textarea_chapter_summary" rows={10} cols={60}></textarea>
                    </div>

                    {/* chapter content */}
                    <div id="div_chapter_content" className="editor-panel">
                        <h3>故事內容</h3>
                        <textarea id="textarea_chapter_content" rows={10} cols={75}></textarea>
                    </div>
                </div>


            </div>
        )
    ); 
}; 