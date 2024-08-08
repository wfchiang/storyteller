import { Chapter, Story } from "./data";


export interface ComponentChapterTabProps {
    idChapter :number; 
    story :Story; 
    setStory: (newStory :Story) => void; 
    setSelectedChapterId: (selectedChapterId :number) => void;  
};


export function ComponentChapterTab (props :ComponentChapterTabProps) {
    let chapter :Chapter = props.story.chapters[props.idChapter]; 

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
            onClick={selectChapter}
        >
            <p>第 {props.idChapter + 1} 章:&nbsp;&nbsp;{chapter.caption}</p>
        </div>
    ); 
}; 