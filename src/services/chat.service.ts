import OpenAI from "openai";
import * as util from "util";
import axios from "axios";

const client = axios.create({
    headers: { 'Authorization': 'Bearer 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'}
});

const openai = new OpenAI({
    apiKey:"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"
});



const generateTravelMessage = "I'm going to %s %s for %d days. I need travel plan with time of places " +
    " I can visit and stay to and items that I need to pick with me in format " +
    "{travelName: ," +
    " travelPlan : [" +
    "    {dayNumber:, planItems: [{ activity:, time: // in full date UTC format },..]}," +
    "     {}," +
    "     ..]," +
    " itemsToPick:[]}"

export const getChatResponse = async () => {
    return openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });
}

export const generateTravelByRequest = async (country: string, date: string, dayNumber: number) => {
    console.log(openai.apiKey)
    console.log(openai.baseURL)

    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": util.format(generateTravelMessage, country, date, dayNumber)
            }
        ]
    }

    client.post('https://api.openai.com/v1/chat/completions', body)
        .then(result => {
            console.log("Result" + result)
            result = JSON.parse(JSON.stringify(result.data.choices[0].message.content));
            console.log(result);
            return result
        }).catch(err => {
        console.log(err);
    });

    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: util.format(generateTravelMessage, country, date, dayNumber) }],
    //     model: "gpt-3.5-turbo",
    // });
}