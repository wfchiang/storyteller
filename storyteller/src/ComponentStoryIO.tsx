import { Story } from './data';


export interface ComponentStoryIOProps {
    story: Story;
    setStory: (newStory: Story) => void;
};


export function ComponentStoryIO(props: ComponentStoryIOProps) {
    // Function for handling uploaded JSON story
    const handleUploadedJsonStory = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    const loadedStory = JSON.parse(e.target.result as string);
                    props.setStory(loadedStory);
                }
            };

            reader.readAsText(file);
        }
    }

    // Function for downloading JSON story file 
    const handleDownloadJsonStory = () => {
        const jsonStr = JSON.stringify(props.story);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'story.json';
        link.click();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Upload/Download JSON</p>
            <input className="io-input" type="file" onChange={handleUploadedJsonStory} />
            <button id="button_download_json_story" onClick={handleDownloadJsonStory}>Download JSON</button>
        </div>
    );
}; 