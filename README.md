# product-meta-craft
Ai hackathon generate meta descriptions for webpages.
Simple langchain based app to generate meta descriptions from page content.
Due to environment issues, and the compressed timeframe we had a dived and conquer approach.  We weren't sure the Python issues could be fixed in time, so the main project leverages Mateus's Javascript experience.
The root directory is using langchainJS, and this is the primary app.
An alteernate backend using langchain is in the python directory

# Python
The Python backend can be run separately with test values. Through /usr/bin/python3 /your/path/gptchain.py

PLEASE NOTE eBay bot detection may be a problem for you, it is not a problem if you are on the eBay VPN or an 
internal IP.  I will try to find out what the criteria is, but I can't on Thanksgiving weekend.

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
