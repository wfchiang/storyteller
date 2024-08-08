import { Chapter, Story } from "./data";


export interface ComponentChapterTabProps {
    chapterId :number; 
    story :Story; 
    setStory: (newStory :Story) => void; 
    setSelectedChapterId: (selectedChapterId :number) => void;  
};


export function ComponentChapterTab (props :ComponentChapterTabProps) {
    let chapter :Chapter = props.story.chapters[props.chapterId]; 

    const selectChapter = () => {
        props.setSelectedChapterId(props.chapterId); 
    }; 

    return (
        <div 
            id={`div_chapter_tab_${props.chapterId}`} 
            style={{
                display: "flex", 
                marginTop: "5px", 
                marginBottom: "5px"
            }}
            onClick={selectChapter}
        >
            <p>第 {props.chapterId + 1} 章:&nbsp;&nbsp;{chapter.caption}</p>
        </div>
    ); 
}; 