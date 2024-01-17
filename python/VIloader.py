from langchain.document_loaders import AsyncChromiumLoader
from langchain.document_transformers import BeautifulSoupTransformer
from bs4 import BeautifulSoup
import asyncio

class VILoader:
    def __init__(self, url):
        self.url = url
        self.extraction = []
    def extract(self): 
        # Load HTML
        loader = AsyncChromiumLoader([self.url])
        html = loader.load()
        print(html[0].page_content[0:100])
        print("-------------Got doc?------------------")
        soup = BeautifulSoup(html[0].page_content, 'html.parser')
        title = soup.find("title")
        print(title.text)
        breadcrumbs = soup.findAll(class_="seo-breadcrumb-text")
        breadcrumbAll = ""
        for breadcrumb in breadcrumbs:
            breadcrumbAll += breadcrumb.text+ "\n"

        items = soup.findAll("div", class_="ux-layout-section-evo__item")
        print(items)
        itemAll = ""
        for item in items[:20]:
            itemAll += item.text+ "\n"
        iframeContent = soup.find("iframe", class_="desc_ifr")
        # Transform
        #bs_transformer = BeautifulSoupTransformer()
        #docs_transformed = bs_transformer.transform_documents(html, tags_to_extract=["h1","h2", "h3" ,"title"])
        # Result
        self.extraction = "title: " + title.text + "\n" + "itemAll: " + itemAll + "\n" + "breadcrumbs: " + breadcrumbAll + "\n" #+ "sellerDescription: " + iframeContent.text[:60] + "\n"

def main():
    loader = VILoader("https://www.ebay.com/itm/334470172936")
    loader.extract()
    print("------------Extraction-------------------")
    print(loader.extraction)
if __name__ == "__main__":
    main()
