export interface ComponentOpenAiKeyPanelProps {
    openaiApiKey :string; 
    setOpenaiApiKey : (newOpenaiApiKey :string) => void; 
}; 


export function ComponentOpenAiKeyPanel (props :ComponentOpenAiKeyPanelProps) {
    return (
        <div style={{display: "flex"}}>
          <p>OpenAI API Key:</p>
          <p>&nbsp;&nbsp;</p>
          <input id="input_openai_api_key" type="text" value={props.openaiApiKey} 
            onChange={(e) => props.setOpenaiApiKey(e.target.value.trim())} />
        </div>
    ); 
}; 