"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default();
const context = [
    { role: "system", content: "You are a helpful assistant." },
];
async function createChatCompletions() {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: context,
    });
    const responseMessage = response.choices[0].message;
    context.push({ role: "assistant", content: responseMessage.content });
    console.log(`${responseMessage.role}: ${responseMessage.content}`);
}
process.stdin.addListener("data", async (input) => {
    const userInput = input.toString().trim();
    context.push({ role: "user", content: userInput });
    await createChatCompletions();
});
