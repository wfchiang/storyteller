export interface Chapter {
    caption :string; 
    characters : { [name :string]: string[] }; 
    content :string[]; 
    summary :string[]; 
}


export interface Story {
    title :string;
    abstract :string; 
    chapters :Chapter[];
}; 