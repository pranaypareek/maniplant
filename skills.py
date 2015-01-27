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
	linkedinpage = sys.argv[1]
	f = open('workfile', 'w')			#FILE WHERE SKILLS WOULD BE WRITTEN AS JSONARRAY
	data = download_pages(linkedinpage)			#Subroutine to Download the Webpage
	parsed_html = BeautifulSoup(data)
	all_skills = parsed_html.find(id = "profile-skills")
	all_skills = all_skills.find_all('li')
	jsonobj = []
	count = 0
	length = len(all_skills)
	for skill_list_obj in all_skills:
		skill = skill_list_obj.span.span.text
		if count <= (length-2):
			f.write(skill)
		if count <= (length-3):
			f.write(',')
		count += 1
