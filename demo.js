import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";

const model = new ChatOpenAI({
  openAIApiKey: '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',
});

const promptTemplate = PromptTemplate.fromTemplate(
  "Using this {list} of products give me a what type of product it is"
);

const chain = promptTemplate.pipe(model);

const result = await chain.invoke({ list: "Filmadora Sony, Câmera de ação GoPro HERO8, Pacote de câmera de ação GoPro HERO, Câmera de ação esportiva COOAU 4K" });

console.log(result.content);