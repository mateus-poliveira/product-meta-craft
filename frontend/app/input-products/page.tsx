'use client'

import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { useState } from 'react';

const model = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const promptTemplate = new PromptTemplate({
  inputVariables: ["listOfProducts"],
  template: `Analyze the list of products below and generate a description of the page.
  I'm a SEO manager that wants to otimise this page for search engines.
  You are a expert SEO copywriter that will help me to create a description of this page.
  This description needs to be 3 lines long and have 160 characters.
  I want this description to help this page to rank better on search engines.
  {listOfProducts}`,
})

const chain = new LLMChain({ llm: model, prompt: promptTemplate });

export default function Home() {
  const [listOfProducts, setListOfProducts] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setListOfProducts(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const llmResponse = await chain.call({ listOfProducts: listOfProducts });
    setAnswer(llmResponse.text);
    setIsLoading(false);
  };

  return (
    <main className="flex w-4/5 bg-gray-900 flex-col p-7 pt-14">
      <h2 className='text-xl font-bold mb-5'>Get a description of a e-commerce page based on a list of products</h2>
      <p className='mb-10 max-w-2xl'>Input a list of products to generate a detailed and captivating page description for an e-commerce website, showcasing the unique features and benefits of each product, enticing potential customers to make a purchase and enhancing the overall shopping experience.</p>
      <form className='flex flex-col max-w-2xl border-gray-800 border p-7' onSubmit={handleSubmit}>
        <label className='mb-3.5'>Add list of products</label>
        <textarea className='w-full rounded bg-gray-600 h-40 p-3.5' value={listOfProducts} onChange={handleChange} />
        <div className='flex items-end w-full flex-col'>
          <button className='bg-teal-500 w-auto mt-4 p-2 px-4 rounded disabled:opacity-10' disabled={isLoading} type="submit">Submit</button>
        </div>
      </form>
      {!answer ? null : (
        <div className='max-w-2xl border-gray-800 border p-7 mt-3.5'>
          <h3 className='text-lg font-bold mb-2.5'>Description generated by AI:</h3>
          {answer}
        </div>
      )}
    </main>
  );
}
