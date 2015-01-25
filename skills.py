from bs4 import BeautifulSoup
import sys

def download_pages(url_to_download):
	import urllib2
	user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
	headers = { 'User-Agent' : user_agent }
	req = urllib2.Request(url_to_download, None, headers)
	response = urllib2.urlopen(req)
	page = response.read()
	return page

if __name__ == "__main__":
	linkedpage = sys.argv[1]
	#with open ("/home/saumye/linkedin.html","r") as myfile:
	#	data = myfile.read()
	f = open('workfile', 'w')
	#f.write('[ ')
	data = download_pages(linkedpage)			#FOR NON LOCAL
	parsed_html = BeautifulSoup(data)
	popular_stores = parsed_html.find(id = "profile-skills")
	popular_stores = popular_stores.find_all('li')
	jsonobj = []
	count = 0
	length = len(popular_stores)
	for list in popular_stores:
		outlet_link = list.span.span.text
		#jsonobj.append(outlet_link)
		if count <= (length-2):
			f.write(outlet_link)
		if count <= (length-3):
			f.write(',')
		count += 1
	#f.write(' ]')