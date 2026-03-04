// npx tsx --env-file=.env src/components/Model.jsx

import { GoogleGenAI, Type} from '@google/genai';

// Best practice: implicitly use GEMINI_API_KEY env variable
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function recommendBook(prompt){
    try{
        console.log("Run")
        const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash-8b', 
        contents: `Based on the user's description, please recommend 2 books that matches the user's prompt most closely ${prompt}`,
        config:{
            responseMimeType: 'application/json',
            responseSchema:{
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                        properties:{
                            title: {
                            type: Type.STRING,
                            description: 'The title of the book.',
                    },
                            author: {
                            type: Type.STRING,
                            description: 'The author of the book.',
                    },
                            country: {
                            type: Type.STRING,
                            description: 'The country of origin of the book',
                    },
                            genre: {
                            type: Type.STRING,
                            description: 'The genre of the book',
                    },
                            synopsis: {
                            type: Type.STRING,
                            description: 'The synopsis of the book',
                    },
                }
            }
            }
        }
    
    })
    console.log(response.text); // output is often markdown
    return response.text
}
catch(e){
    console.log("ERROR: ", e)
}
}



async function findSimilar(book){
    try{
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: `Recommend me 3 books similar to ${book}?`,
        config:{
            responseMimeType: 'application/json',
            responseSchema:{
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                        properties:{
                            title: {
                            type: Type.STRING,
                            description: 'The title of the book.',
                    },
                            author: {
                            type: Type.STRING,
                            description: 'The author of the book.',
                    },
                            country: {
                            type: Type.STRING,
                            description: 'The country of origin of the book',
                    },
                            genre: {
                            type: Type.STRING,
                            description: 'The genre of the book',
                    },
                            synopsis: {
                            type: Type.STRING,
                            description: 'The synopsis of the book',
                    },
                }
            }
            }
        }
    
    })
    console.log(response.text); // output is often markdown
}
catch(e){
    console.log("ERROR: ", e)
}
}



export {recommendBook, findSimilar}