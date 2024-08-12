import { ComponentChapterTab } from "./ComponentChapterTab";
import { Chapter, Story } from "./data";


export interface ComponentChaptersPanelProps {
    display :string; 
    story :Story; 
    setStory: (newStory :Story) => void; 
    setSelectedChapterId: (selectedChapterId :number) => void;  
}; 


export function ComponentChaptersPanel (props :ComponentChaptersPanelProps) {
    const addNewChapter = () => {
        let newCh :Chapter = {
            caption: "",  
            content: "", 
            characterSummaries :{}
        }; 
        let newChapters = [...props.story.chapters, newCh]; 
        props.setStory({
            ...props.story, 
            chapters: newChapters
        });
    }; 

    return (
        <div 
            id="div_chapters_panel"
            style={{
                display: props.display, 
                flexDirection: "column"
            }}
        >
            {props.story.chapters.map((chapter, chapterId) => (
                <ComponentChapterTab
                    chapterId={chapterId}
                    story={props.story}
                    setStory={props.setStory}
                    setSelectedChapterId={props.setSelectedChapterId}
                ></ComponentChapterTab>
            ))}
            <button 
                id="button_new_chapter" 
                onClick={addNewChapter}
                style={{
                    margin: "5px"
                }}
            >New Chapter</button>
        </div>
    ); 
}; 