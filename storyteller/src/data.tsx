export interface Chapter {
    caption :string; 
    content :string; 
    characterSummaries : { [name :string]: string }; 
}


export interface Story {
    title :string;
    abstract :string; 
    chapters :Chapter[];
}; 


export interface UpdateStoryChapterParams {
    story :Story; 
    setStory :(updatedStory :Story) => void; 
    chapterId :number; 
    updatedChapter :Chapter; 
}; 


export function updateStoryChapter (params :UpdateStoryChapterParams) {
    let newChapters = params.story.chapters.map((ch, iCh) => {
        if (iCh == params.chapterId) {
            return params.updatedChapter;
        } else {
            return ch; 
        }
    }); 
    params.setStory({
        ...params.story, 
        chapters: newChapters
    });
}; 