import { Chapter, Story } from "./data";


export interface ComponentChapterTabProps {
    idChapter :number; 
    story :Story; 
    setStory: (newStory :Story) => void; 
    setSelectedChapterId: (selectedChapterId :number) => void;  
};


export function ComponentChapterTab (props :ComponentChapterTabProps) {
    let chapter :Chapter = props.story.chapters[props.idChapter]; 

    const updateCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newChapter :Chapter = {
            ...chapter, 
            caption: event.target.value.trim() 
        }; 
        let newChapters = props.story.chapters.map((ch, iCh) => {
            if (iCh == props.idChapter) {
                return newChapter;
            } else {
                return ch; 
            }
        }); 
        props.setStory({
            ...props.story, 
            chapters: newChapters
        }); 
    }; 

    const selectChapter = () => {
        props.setSelectedChapterId(props.idChapter); 
    }; 

    return (
        <div 
            id={`div_chapter_tab_${props.idChapter}`} 
            style={{
                display: "flex", 
                marginTop: "5px", 
                marginBottom: "5px"
            }}
        >
            <p>第 {props.idChapter + 1} 章:</p>
            <p>&nbsp;&nbsp;</p>
            <input 
                id={`input_chapter_tab_${props.idChapter}`} 
                type="text" 
                value={chapter.caption} 
                onChange={updateCaption} 
            />
            <button id={`button_select_chapter_${props.idChapter}`} onClick={selectChapter}>Select</button>
        </div>
    ); 
}; 