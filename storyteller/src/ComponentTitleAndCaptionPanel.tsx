import { Chapter, Story, updateStoryChapter } from "./data";


export interface ComponentTitleAndCaptionProps {
    chapterId: number;
    story: Story;
    setStory: (newStory: Story) => void;
};


export function ComponentTitleAndCaption(props: ComponentTitleAndCaptionProps) {
    let currentChapter :Chapter | undefined = props.story.chapters[props.chapterId]; 

    const updateChapterCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedChapter :Chapter = {
            ...currentChapter!, 
            caption: event.target.value.trim() 
        }; 
        updateStoryChapter({updatedChapter, chapterId: props.chapterId, story: props.story, setStory: props.setStory }); 
    }; 

    // rendering 
    return (
        <div id="div_title">
            <table>
                <tr style={{display: "flex"}}>
                    <td style={{display: "flex"}}>
                        <p>Title&nbsp;&nbsp;</p>
                        <input className="title-input" type="text" value={props.story.title}
                            onChange={(e) => { props.setStory({ ...props.story, title: e.target.value }) }} />
                    </td>
                    {
                        currentChapter
                        ? <td style={{marginLeft: "10px", display: "flex"}}>
                            <p>第 {props.chapterId + 1} 章:&nbsp;&nbsp;</p>
                            <input className="title-input" type="text" value={currentChapter.caption}
                                onChange={updateChapterCaption} />
                        </td>
                        : <td></td>
                    }
                </tr>
            </table>
        </div>
    );
}; 