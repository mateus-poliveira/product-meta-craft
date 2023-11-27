# product-meta-craft
Ai hackathon generate meta descriptions for webpages.
Simple langchain based app to generate meta descriptions from page content.
Due to environment issues, and the compressed timeframe we had a dived and conquer approach.  We weren't sure the Python issues could be fixed in time, so the main project leverages Mateus's Javascript experience.
The root directory is using langchainJS, and this is the primary app.
An alteernate backend using langchain is in the python directory

# Python
The Python backend can be run separately with test values. Through /usr/bin/python3 /your/path/gptchain.py

PLEASE NOTE eBay bot detection may be a problem for you, it is not a problem if you are on the eBay VPN or an 
internal IP.  I will try to find out what the criteria is, but I can't on Thanksgiving weekend.  It seems that Playwright gets
tarpitted, you will timeout on your scraping.

You will need to set OPENAI_API_KEY in your environment variable and install playwright.

pip install -q openai langchain playwright beautifulsoup4
playwright install

So the immediate problem to solve here is that an html document has many more tokens than regualar text, and most of
these tokens don't matter much to the problem.  So, when we grab the documents, we must extract information.
Currently this is done by specifying tags of interest with BeautifulSoup.  Conceptually, we could probably do even better by
pulling parts of the page - Title text, breadcrumbs, left nav, and list of products, summarize each section through 
LLMChain, and then weight each part.  But this was pretty time constrained after dealing with making Playwright
work when I hae a security proxy installed on my system.  So this needs to be a future improvement.

A few shot template strategy is used.  I selected three instances where a business user at eBay requested a custom 
description for a page.  Presumably these are the best descriptions, as most browse pages have very similar descriptions,
but just insert the category name.  The LLM is also given the context that he is a SEObot.  I wished to do weighting in 
the context, but this is a furture improvemnt.  Because BeautifulSoup strips tag names, accuracy would improve if the extracted data was labeled for breadcrumbs, side nav header text, etc.
The extracted text does still contain some garbage, some regex would be useful to cut down noise and token usage.

# Sample Results
GTP-4 with temperature of .7

Input:
https://www.ebay.com/b/Clothing-Shoes-Accessories/11450/bn_1852545

https://www.ebay.com/b/Designer-Handbags/bn_7117629183

https://www.ebay.com/b/Balenciaga-Bags-Handbags-for-Women/169291/bn_724671

https://www.ebay.com/b/Auto-Parts-Accessories/6028/bn_569479

https://www.ebay.com/b/Commercial-Truck-Air-Conditioning-Heating-Components/184825/bn_115384977

https://www.ebay.com/b/BMW-Car-and-Truck-Tail-Lights/33716/bn_580096

https://www.ebay.com/b/BMW-Car-and-Truck-Turn-Signals/33717/bn_578781

https://www.ebay.com/b/Automotive-Paint-Supplies/179429/bn_1880778

https://www.ebay.com/b/Collectible-Sneakers/bn_7000259435

https://www.ebay.com/e/fashion/nike-kobe-6-protro-reverse-red

https://www.ebay.com/b/PUMA-Sneakers-for-Men/15709/bn_58992

https://www.ebay.com/b/Mens-Sandals/11504/bn_57786

https://www.ebay.com/b/Luxury-Watches/31387/bn_36841947

https://www.ebay.com/b/Rolex-Watches/31387/bn_2989578

https://www.ebay.com/b/Rolex-Submariner-Watches/31387/bn_3001215

https://www.ebay.com/b/Minivan-Cars-and-Trucks/6001/bn_55180494

https://www.ebay.com/b/Pontiac-GTO-Cars/6001/bn_24016910

https://www.ebay.com/b/Collectible-Figures-Bobbleheads/149372/bn_3017826

https://www.ebay.com/b/Star-Wars-Collectible-Figures-Bobbleheads/149372/bn_93507041

https://www.ebay.com/b/Hunting-Scopes-Optics-Lasers/31710/bn_1865309

https://www.ebay.com/b/Hunting-Rifle-Scopes/31714/bn_1865568

https://www.ebay.com/b/PXI-VXI-Systems/181963/bn_16565561

https://www.ebay.com/b/Biodiesel-Equipment/159694/bn_16562059

Output:
Description: Shop eBay for luxurious Designer Handbags at unbeatable prices. Discover authentic Louis Vuitton, Chanel, Gucci, and HERMÈS styles with our Authenticity Guarantee.

Shop authentic Balenciaga bags & handbags for women on eBay. Discover a variety of styles and colors with the guarantee of authenticity. Free shipping available!

Description: Shop eBay for all your auto parts & accessories needs. Find the best deals on car, truck, motorcycle parts & more. DIY projects & worry-free shopping!

Description: Enhance your BMW's appearance with genuine Car and Truck Tail Lights from our eBay selection. Find the perfect fit for your vehicle today. Free shipping available on many items!

Description: Shop an extensive selection of BMW Car and Truck Turn Signals on eBay. Find the perfect parts for your vehicle at unbeatable prices. Free shipping on many items!

Shop top automotive paint supplies on eBay for your vehicle restoration or repair needs. Find primers, mixing cups, adhesion promoters & more. Fast shipping available!

Description: Shop authentic Collectible Sneakers on eBay with guaranteed authenticity. Find exclusive drops, J's legacy, and new streetwear styles in all sizes.

Score rare Nike Kobe 6 Protro Reverse Reds on eBay. Authentic sneakers for fans and collectors. Shop by size, condition & more. Fast shipping available!

Description: Score the best deals on PUMA Sneakers for Men with a variety of styles & colors. Authenticity guaranteed. Shop now for free shipping on many items!

Description: Shop the latest Men's Sandals on eBay with great discounts on Crocs. Find your perfect pair with a variety of sizes, styles & features. Free shipping available!

Description: Discover a premium collection of new & used luxury watches on eBay. Find exclusive deals on Rolex, OMEGA, TAG Heuer, and more. Authenticity guaranteed.

Description: Discover a wide selection of new & pre-owned Rolex watches. Authenticity guaranteed. Shop for classic & modern timepieces to elevate your style.

Description: Shop with confidence for authentic Rolex Submariner watches on eBay. Find the perfect luxury timepiece from vintage to modern styles. Free shipping on select items!

Description: Explore a wide range of Minivan Cars and Trucks on eBay. Find the perfect family vehicle from trusted brands. Best deals and free shipping available!

Description: Shop iconic Pontiac GTO cars on eBay. Find vintage classics & modern muscle editions. Bid or Buy Now. Secure great deals on your dream ride today!

Description: Shop a vast selection of Collectible Figures & Bobbleheads on eBay! From Funko Pops to exclusive finds, perfect for any collector. Free shipping available on many items!

Discover a galaxy of Star Wars Collectible Figures & Bobbleheads on eBay. Find rare items, exclusives, and more. Perfect for fans and collectors!

Description: Shop the best deals for new & used Hunting Rifle Scopes on eBay. Find the perfect scope from brands like Vortex, Bushnell & Arken with free shipping available!

Description: Shop a wide selection of PXI & VXI Systems on eBay for advanced modular instrumentation. Perfect for engineers & tech labs. Fast & free shipping on many items!

Description: Shop eco-friendly Biodiesel Equipment on eBay for great prices. Find everything from drum heaters to oil centrifuges for efficient fuel production.

# Javascript
The Javascript demos and frontend uses the LangChain Js version.

I encountered difficulties setting up the Python environment, so I decided to explore and experiment with the JavaScript version instead.
The intended approach was to break down the final goals into smaller steps to make progress more effectively.

We have implemented three different approaches to generate descriptions:
1. Using a simple text list as a prompt.
2. Mannually copying and using all the text from the page.
3. Scraping the HTML and content from the page using the prompt URL.

I encountered difficulties in completing the final phase of the solution, which involved batching URLs and chaining the scraping of each page to retrieve its content. The main challenge was finding documentation that demonstrated how to iterate through a list of URLs and chain the scraping process for each item.

Using these approaches, we developed a basic frontend application.

### Generate by a text list of products

By providing a list of products as input, the chain generates text descriptions based on the prompt template.

### Generate by mannually copying the text of a page

By providing the text of a page as input, the chain generates text descriptions based on the prompt template.

### Generate by the url of the page

Using the URL of a page, we create a Vector store by extracting the document's content. With the context provided by this store, we generate a text description using the prompt template.

### Generate by a batch of urls

This is the intended solution for the theme, which involves generating unique descriptions by iterating through a batch of URLs uploaded via a CSV or a text list. The content of each URL is scraped to generate a description specific to that page. This approach allows for the creation of tailored meta descriptions that accurately represent the content of each webpage, improving search engine optimization and user experience.



