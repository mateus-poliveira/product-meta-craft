from langchain.prompts import PromptTemplate;
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from loader import Loader
class GPTLink:
    def __init__(self):
        self.example1 = Loader("https://www.ebay.com/b/VMAXTANKS-Rechargeable-Batteries/48619/bn_7114644579")
        self.example1.extract()
        self.example2 = Loader("https://www.ebay.com/b/Windows-Vista-PC-Laptops-Netbooks/177/bn_2767810")
        self.example2.extract()
        self.example3 = Loader("https://www.ebay.com/b/CHANEL-Eyeglass-Frames/180957/bn_8430684")
        self.example3.extract()
        self.llm = ChatOpenAI(temperature=.7,model="gpt-4-1106-preview") #switch to personal api key
        #self.llm = OpenAI(temperature=.7,model="gpt-3.5-turbo-1106")
        fewShotTemplate = """
            You are an SEO expert that creates a compelling description for a web page with fewer than 160 characters (including spaces).  You use the information 
            marked HTML: to generate the description. Information labeled title: and itemAll: are the most important.
                                  
            Here are some examples of good descriptions:
                                
            HTML: {firstExtraction}
            Description: Find great deals for VMAXTANKS Rechargeable Batteries at the lowest prices online. 
                Choose by amp hours like 100 Ah, 10 Ah, 55 Ah &amp; more to find exactly what you need. 
                Free shipping for many items!
                                
            HTML: {secondExtraction}
            Description: Save Big on new &amp; used Windows Vista PC Laptops &amp; Netbooks from top brands like HP, Dell, ACER &amp; more. Shop our extensive selection of products and best online deals. Free Shipping for many items!
                                
            HTML: {thirdExtraction}
            Description: Capture great deals on stylish CHANEL Eyeglass Frames at the lowest prices. Choose by frame shape like Full Rim, Round, Cats Eye &amp; more to complete your look. Free shipping for many items!
"""
        self.fewShot = fewShotTemplate.format(firstExtraction=self.example1.extraction, secondExtraction=self.example2.extraction, thirdExtraction=self.example3.extraction)
        print("Few shot prompt")
        print(self.fewShot)
        print("-------------------------------------------------")
        self.prompt = PromptTemplate.from_template(self.fewShot + """
            Give a description for this HTML:
            HTML: {url}
            Description:
                                                        """)
    def createDescriptions(self, urls):
        for url in urls:
            loader = Loader(url)
            loader.extract()
            print("-------------------------------------------------")
            answerChain = LLMChain(llm=self.llm, prompt=self.prompt)
            html = Loader(url)
            html.extract()
            answerChain(html.extraction)
            print(answerChain)

def main():
    print("Hello World!")
    gptLink = GPTLink()
    urls = ["https://www.ebay.com/b/222-Fifth/bn_7064136195"]
    gptLink.createDescriptions(urls)
if __name__ == "__main__":
    main()
