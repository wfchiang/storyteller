import './App.css';
import { Chapter, Story } from "./data";


export interface ComponentMainEditorProps {
    idChapter: number;
    story: Story;
    setStory: (newStory: Story) => void;
}; 


export function ComponentMainEditor (props :ComponentMainEditorProps) {
    const updateChapter = (chapterId :number, updatedChapter :Chapter) => {
        let newChapters = props.story.chapters.map((ch, iCh) => {
            if (iCh == chapterId) {
                return updatedChapter;
            } else {
                return ch; 
            }
        }); 
        props.setStory({
            ...props.story, 
            chapters: newChapters
        });
    }; 
    
    const updateChapterCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newChapter :Chapter = {
            ...props.story.chapters[props.idChapter], 
            caption: event.target.value.trim() 
        }; 
        updateChapter(props.idChapter, newChapter); 
    }; 

    const updateChapterSummary = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
        let newChapter :Chapter = {
            ...props.story.chapters[props.idChapter], 
            summary: event.target.value  
        };
        updateChapter(props.idChapter, newChapter);
    }; 

    const updateChapterContent = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
        let newChapter :Chapter = {
            ...props.story.chapters[props.idChapter], 
            content: event.target.value  
        };
        updateChapter(props.idChapter, newChapter); 
    }; 

    // Render 
    return (
        props.idChapter < 0  
        ? (<p>No chapter selected...</p>)
        : (
            <div id="div_main_editor" style={{display: "flex", flexDirection: "column"}}>
                {/* chapter caption */}
                <div id="div_chapter_caption" >
                    <h3 id="header_chapter_caption" style={{display: "flex"}}>
                        <p>第 {props.idChapter+1} 章</p>
                        <p>&nbsp;&nbsp;</p>
                        <input 
                            id="input_chapter_caption"
                            type="text"
                            value={props.story.chapters[props.idChapter].caption}
                            onChange={updateChapterCaption}
                        />
                    </h3>
                </div>

                {/* chapter summary and content */}
                <div id="div_chapter_summary_and_content" style={{display: "flex"}}>
                    {/* chapter summary */}
                    <div id="div_chapter_summary" className="editor-panel"> 
                        <h3>故事大綱/走向</h3>
                        <textarea 
                            id="textarea_chapter_summary" 
                            value={props.story.chapters[props.idChapter].summary}
                            rows={10} 
                            cols={60}
                            onChange={updateChapterSummary}
                        ></textarea>
                    </div>

                    {/* chapter content */}
                    <div id="div_chapter_content" className="editor-panel">
                        <h3>故事內容</h3>
                        <textarea 
                            id="textarea_chapter_content" 
                            value={props.story.chapters[props.idChapter].content}
                            rows={10} 
                            cols={75}
                            onChange={updateChapterContent}
                        ></textarea>
                    </div>
                </div>


            </div>
        )
    ); 
}; 