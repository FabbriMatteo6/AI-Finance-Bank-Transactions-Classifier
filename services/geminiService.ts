import { GoogleGenAI, Type } from "@google/genai";
import { CATEGORIES } from '../constants.ts';
import { Classification } from '../types.ts';

// Fix: Use import.meta.env for Vite projects
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const classificationSchema = {
    type: Type.OBJECT,
    properties: {
        classifications: {
            type: Type.ARRAY,
            description: "An array of classification objects, one for each transaction.",
            items: {
                type: Type.OBJECT,
                properties: {
                    Main_Category: {
                        type: Type.STRING,
                        description: "The main classification category for the transaction."
                    },
                    Sub_Category: {
                        type: Type.STRING,
                        description: "The specific sub-classification category."
                    },
                    AI_Reasoning: {
                        type: Type.STRING,
                        description: "A brief, one-sentence justification for the chosen classification."
                    }
                },
                required: ["Main_Category", "Sub_Category", "AI_Reasoning"]
            }
        }
    },
    required: ["classifications"]
};

const systemPrompt = `You are an expert M&A financial analyst. Your task is to accurately classify financial transactions based on the provided data and category descriptions. Your response MUST strictly follow the requested JSON schema, providing a 'classifications' array where each object corresponds to a single transaction in the input array.

Category structure:
${JSON.stringify(CATEGORIES, null, 2)}`;


export const classifyTransactionBatch = async (
    transactions: { date: string; description: string; amount: string }[]
): Promise<Classification[]> => {
    try {
        const userMessage = `Please classify the following transactions: ${JSON.stringify(transactions, null, 2)}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: classificationSchema,
                temperature: 0.0,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        if (parsedResponse && parsedResponse.classifications && Array.isArray(parsedResponse.classifications)) {
            return parsedResponse.classifications;
        } else {
            throw new Error("Invalid or empty classification data returned from AI.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get a valid response from the AI model. Details: ${errorMessage}`);
    }
};
