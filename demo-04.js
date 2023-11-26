import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  RunnableSequence,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { formatDocumentsAsString } from "langchain/util/document";
import { SimpleSequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
  openAIApiKey: '-',
});

const loader = new CheerioWebBaseLoader(
  "https://www.ebay.com/b/Electronics/bn_7000259124"
);

const docs = await loader.load();

const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
const transformer = new HtmlToTextTransformer();

const sequence = splitter.pipe(transformer);

const newDocuments = await sequence.invoke(docs);

const vectorStore = await FaissStore.fromDocuments(
  newDocuments,
  new OpenAIEmbeddings({openAIApiKey: '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'})
);

const retriever = vectorStore.asRetriever();

const prompt =
  PromptTemplate.fromTemplate(`Using the following context, generate a description of the page and tell me what kind of product it is:
{context}`);

const chain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocumentsAsString),
  },
  prompt,
  model,
  new StringOutputParser(),
]);

// const result = await chain.invoke("What is the powerhouse of the cell?");

const responseTemplate1 = `
Split this list of urls

list: {input}
`;

const reviewPromptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ["list"],
});

const splitChain = new LLMChain({ model, prompt: reviewPromptTemplate1 });

const overallChain = new SimpleSequentialChain({
  chains: [splitChain, generateChain],
  verbose: true,
});

const result = await overallChain.batch([
  { url: "https://www.ebay.com/b/Clothing-Shoes-Accessories/11450/bn_1852545" },
  { url: "https://www.ebay.com/b/Designer-Handbags/bn_7117629183" }
]);

console.log(result);