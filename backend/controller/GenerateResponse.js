const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config();


const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
 model: "gemini-2.0-flash-lite",
    geminiConfig,
});

exports.generateResponse = async (req, res) => {
    try {
        const { ingredients, filters } = req.body; // Destructure ingredients and filters from request body

        const prompt = `Generate a recipe using the following ingredients: ${ingredients}.
                    Apply these filters: ${JSON.stringify(filters)}. 
                    Provide the response strictly in the following structured JSON format without additional text:

                    {
                    "dishName": "Dish Name Here",
                    "description": "Short description about the dish here",
                    "cookingTime": "Cooking time in minutes or hours here",
                    "difficulty": "Difficulty level here (e.g., Easy, Medium, Hard)",
                    "ingredients": [
                        "Ingredient 1",
                        "Ingredient 2",
                        "Ingredient 3"
                    ],
                    "steps": [
                        "Step 1",
                        "Step 2",
                        "Step 3"
                    ],
                    "nutrition": {
                        "calories": "Calories value here",
                        "fat": "Fat value here in grams",
                        "protein": "Protein value here in grams",
                        "carbohydrates": "Carbohydrates value here in grams",
                        "fiber": "Fiber value here in grams",
                        "sugar": "Sugar value here in grams"
                    }
                    }

                    Ensure the JSON is valid and adheres to the format strictly. Do not include any extra text or commentary outside the JSON.
                    `;

        //generate reponse form gemini ai
        const result = await geminiModel.generateContent(prompt);
        const response = result.response.candidates[0].content.parts[0].text;
        console.log(response);
        // Extract the 'text' field from each candidate (assuming an array)
        // const recipes = response.map(candidate => candidate.content.parts[0].text);

        console.log("Receipe Generated Successfully!")
        return res.status(200).json({
            success: true,
            message: "Response Generated Successfully!",
            response, 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred while generating the response!",
            error: error,
        });
    }
};
