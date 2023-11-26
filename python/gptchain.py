from langchain.prompts import PromptTemplate;
from langchain.llms import openai
Class GPTLink:
    def __init__(self):
        self.example1 = Loader("https://www.ebay.com/b/VMAXTANKS-Rechargeable-Batteries/48619/bn_7114644579")
        self.example1.extract()
        self.example2 = Loader("https://www.ebay.com/b/Windows-Vista-PC-Laptops-Netbooks/177/bn_2767810")
        self.example2.extract()
        self.example3 = Loader("https://www.ebay.com/b/CHANEL-Eyeglass-Frames/180957/bn_8430684")
        self.example3.extract()

        prompt = PromptTemplate.from_template("""
            You are an SEO expert that creates a compelling description for a web page.  You use the information on
            the page to create this description.  You should not use the meta descriptions within the <head> tag to generate this
            description.  The content <h1>, <h2>, <h3> tags are particularly important.  Keep the descriptions under 
            160 characters.
                                
            Here are some examples of good descriptions:
                                
            HTML: {firstExtraction}
            Description: Find great deals for VMAXTANKS Rechargeable Batteries at the lowest prices online. 
                Choose by amp hours like 100 Ah, 10 Ah, 55 Ah &amp; more to find exactly what you need. 
                Free shipping for many items!
                                
            HTML: {secondExtraction}
            Description: Save Big on new &amp; used Windows Vista PC Laptops &amp; Netbooks from top brands like HP, Dell, ACER &amp; more. Shop our extensive selection of products and best online deals. Free Shipping for many items!
                                
            HTML: {thirdExtraction}
            Description: Capture great deals on stylish CHANEL Eyeglass Frames at the lowest prices. Choose by frame shape like Full Rim, Round, Cats Eye &amp; more to complete your look. Free shipping for many items!

            Give a description for this HTML:
            HTML: {html}
            Description:
                                                        """)
            def createDescriptions(self, urls):
                for url in urls:
                    loader = Loader(url)
                    loader.extract()
                    formattedPrompt = prompt.format(firstExtraction=loader.example1.extraction, secondExtraction=loader.example2.extraction, thirdExtraction=loader.example3.extraction, html=loader.html)

                    print("-------------------------------------------------")