from langchain.document_loaders import AsyncChromiumLoader
from langchain.document_transformers import BeautifulSoupTransformer
from bs4 import BeautifulSoup
import asyncio

class Loader:
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
        sidenavs = soup.findAll(class_="b-textlink b-textlink--sibling")
        sidenavAll = ""
        for sidenav in sidenavs:
            sidenavAll += sidenav.text+ "\n"
        items = soup.findAll("h3", class_="s-item__title")
        itemAll = ""
        for item in items[:10]:
            itemAll += item.text+ "\n"
        # Transform
        #bs_transformer = BeautifulSoupTransformer()
        #docs_transformed = bs_transformer.transform_documents(html, tags_to_extract=["h1","h2", "h3" ,"title"])
        # Result
        self.extraction = "title: " + title.text + "\n" + "itemAll: " + itemAll + "\n" + "breadcrumbs: " + breadcrumbAll + "\n" + "sidenav: " + sidenavAll + "\n"

def main():
    loader = Loader("https://www.ebay.com/b/Rolex-Submariner-Watches/31387/bn_3001215")
    loader.extract()
    print("------------Extraction-------------------")
    print(loader.extraction)
if __name__ == "__main__":
    main()
