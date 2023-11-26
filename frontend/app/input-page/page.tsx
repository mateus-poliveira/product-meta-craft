'use client'

import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BasePromptTemplate, FewShotPromptTemplate, PromptTemplate } from 'langchain/prompts';
import { useState } from 'react';

const model = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const promptTemplate = new PromptTemplate({
  inputVariables: ["listOfProducts"],
  template: "Using this {listOfProducts} of products give me a what type of product it is",
})

const chain = new LLMChain({ llm: model, prompt: promptTemplate });

import React from 'react';
import AsideNavigation from '../components/aside-navigation';

export default function Home() {
  const [listOfProducts, setListOfProducts] = useState('');
  const [answer, setAnswer] = useState('');

  const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setListOfProducts(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const llmResponse = await chain.call({ listOfProducts: listOfProducts });
    setAnswer(llmResponse.text);
  };

  return (
    <main className="w-4/5 bg-gray-700">
      <h1>Product Meta Craft</h1>
      <form className='flex flex-col items-end max-w-sm' onSubmit={handleSubmit}>
        <label>
          <span>Add list of products</span>
        </label>
        <textarea value={listOfProducts} onChange={handleChange} />
        <button className='bg-teal-500 w-1/6' type="submit">Submit</button>
      </form>
      <div>{answer}</div>
    </main>
  );
}
