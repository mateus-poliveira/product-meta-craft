from langchain.document_loaders import AsyncChromiumLoader
from langchain.document_transformers import BeautifulSoupTransformer
import asyncio

Class Loader:
    def __init__(self, url):
        self.url = url
        self.extraction = []
    def extract(self): 
        # Load HTML
        loader = AsyncChromiumLoader([self.url])
        html = loader.load()
        # Transform
        bs_transformer = BeautifulSoupTransformer()
        docs_transformed = bs_transformer.transform_documents(html, tags_to_extract=["ul,h1,h2,h3,title"])
        print(docsTransformed.empty())
        # Result
        self.extraction = docs_transformed[0].page_content[0:1000]


