import { useState } from 'react';
import './App.css';
import { Chapter, Story, updateStoryChapter } from "./data";


export interface ComponentMainEditorProps {
    chapterId: number;
    story: Story;
    setStory: (newStory: Story) => void;
}; 


export function ComponentMainEditor (props :ComponentMainEditorProps) {
    let [newSummaryForCharName, setNewSummaryForCharName] = useState(""); 
    let [chapterIdea, setChapterIdea] = useState(""); 

    let currentChapter :Chapter | undefined = props.story.chapters[props.chapterId]; 

    const updateChapterCharacterSummaries = (updatedCharacterSummaries :{[name:string]: string}) => {
        let updatedChapter :Chapter = {
            ...currentChapter!, 
            characterSummaries: updatedCharacterSummaries
        }; 
        updateStoryChapter({updatedChapter, chapterId: props.chapterId, story: props.story, setStory: props.setStory }); 
    }; 

    const updateChapterIdea = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
        setChapterIdea(event.target.value); 
    }; 

    const updateChapterContent = (event :React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedChapter :Chapter = {
            ...currentChapter!, 
            content: event.target.value  
        };
        updateStoryChapter({updatedChapter, chapterId: props.chapterId, story: props.story, setStory: props.setStory }); 
    }; 

    const removeCharacterSummary = (charName :string) => {
        let newCharacterSummareis = {...currentChapter!.characterSummaries}; 
        delete newCharacterSummareis[charName]; 
        updateChapterCharacterSummaries(newCharacterSummareis); 
    }; 

    const updateCharacterSummary = (charName :string, charSum :string) => {
        let newCharacterSummareis = {...currentChapter!.characterSummaries}; 
        newCharacterSummareis[charName] = charSum; 
        updateChapterCharacterSummaries(newCharacterSummareis); 
    }; 

    // Render 
    return (
        props.chapterId < 0  
        ? (<p>No chapter selected...</p>)
        : (
            <div id="div_main_editor" style={{display: "flex", flexDirection: "column"}}>
                {/* chapter summary and content */}
                <div id="div_chapter_editor" style={{display: "flex"}}>
                    <div id="div_chapter_idea_and_character_summaries">
                        {/* chapter idea */}
                        <div id="div_chapter_idea" className="editor-panel"> 
                            <h3>故事大綱/走向</h3>
                            <textarea 
                                id="textarea_chapter_idea" 
                                value={chapterIdea}
                                rows={10} 
                                cols={60}
                                onChange={updateChapterIdea}
                            ></textarea>
                        </div>

                        {/* character summaries */}
                        <div id="div_character_summaries" className="editor-panel">
                            <table>
                                <tr>
                                    <th>角色</th><th>本章總結</th><th></th>
                                </tr>
                                {
                                    currentChapter
                                    ? Object.entries(currentChapter.characterSummaries).map(([charName, charSum]) => 
                                        (
                                            <tr className="character-summary-row">
                                                <td className="character-name"><p>{charName}</p></td>
                                                <td className="character-summary">
                                                    <textarea value={charSum} rows={3} cols={40}
                                                        onChange={(e) => updateCharacterSummary(charName, e.target.value)} />
                                                </td>
                                                <td><button onClick={() => removeCharacterSummary(charName)}>Delete</button></td>
                                            </tr>
                                        )
                                    )
                                    : <tr></tr>
                                }
                            </table>
                            <div style={{display: "flex"}}>
                                <p>新增總結 for 角色:&nbsp;&nbsp;</p>
                                <input id="input_new_summary_for_char_name" type="text"value={newSummaryForCharName} onChange={(e) => {setNewSummaryForCharName(e.target.value.trim())}}/>
                                <button id="button_new_summary_for_char_name" onClick={() => {updateCharacterSummary(newSummaryForCharName, ""); setNewSummaryForCharName("");}}>新增</button>
                            </div>
                        </div>
                    </div>

                    {/* chapter content */}
                    <div id="div_chapter_content" className="editor-panel">
                        <h3>故事內容</h3>
                        <textarea 
                            id="textarea_chapter_content" 
                            value={props.story.chapters[props.chapterId].content}
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