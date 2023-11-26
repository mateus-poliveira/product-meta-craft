import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";

const model = new ChatOpenAI({
  openAIApiKey: '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',
});

const promptTemplate = PromptTemplate.fromTemplate(
  "Using the following page give me a description of what type of product this page is selling: {page}"
);

const chain = promptTemplate.pipe(model);

const result = await chain.invoke({ page: `Pular para o conteúdo principal Logotipo do eBay Comprar por categoria Digite a palavra-chave para a pesquisa Pesquise o que quiser

Camcorders Pesquisa avançada Olá! Entre ou cadastre-seOfertas do diaAjuda e contato

Enviar para Idioma atual: BR PortuguêsBR PortuguêsVenderLista de itens observadosExpandir lista de itens observadosMeu eBayExpandir Meu eBay Notificação Expandir carrinho navegação estrutural eBay Electronics Câmeras e Fotografia Câmeras de vídeo Câmeras de vídeo Comprar por categoria Câmeras e Fotografia Câmeras de vídeo Binóculos e Telescópios Drone com Câmera e Acessórios Fotográficos Drones com Câmera Manuais e Guias de câmeras Câmeras digitais Molduras para Fotos Digitais Equipamentos de Fotografia de Filme Flashes e acessórios para flashes de câmeras Lentes e filtros para Câmeras Equipamentos de estúdio fotográfico e iluminação Peças de Reposição e ferramentas de câmera Tripés e suportes para câmeras Equipamentos para Produção e Edição de Vídeo Equipamentos de Filme e Fotografia Antigos Lotes Mistos de câmeras e Foto Outras Câmeras e equipamentos de Fotografia Comprar por Brand

GoPro

Sony

Canon

Panasonic

Blackmagic Design

Blackmagic

JVC

Insta360

AKASO

DJI

SJCAM

Action

Comprar por Model

GoPro HERO4

GoPro HERO10 Black

GoPro HERO9 Black

HERO8

GoPro HERO5

GoPro HERO3

GoPro HERO7 Black

GoPro HERO7` });

console.log(result.content);