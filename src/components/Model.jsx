// npx tsx --env-file=.env src/components/Model.jsx

import { GoogleGenAI, Type} from '@google/genai';

// Best practice: implicitly use GEMINI_API_KEY env variable
const ai = new GoogleGenAI({});

async function recommendBook(prompt){
        const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: `Based on the user's description, please recommend 3 books that matches the user's prompt most closely ${prompt}`,
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



async function findSimilar(book){
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

  let book = {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "country": "United States",
    "genre": "Fiction",
    "synopsis": "A young girl grows up in the racially divided American South, where her father defends a Black man falsely accused of a crime, teaching her lessons about justice, empathy, and morality."
  }

//   console.log(book)
// findSimilar(book)
console.log("Find romance book")
recommendBook("I want a romance book that contains a meet-cute in a highschool setting")