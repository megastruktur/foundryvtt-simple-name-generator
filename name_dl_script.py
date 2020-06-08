from bs4 import BeautifulSoup
import requests

# Script to scrape a website for a bunch of names

people = ['japanese', 'indian', 'chinese', 'persian', 'mongolian', 'khmer', 'polynesian']

url = 'https://www.behindthename.com/names/usage/{}/{}'
s_url = 'https://surnames.behindthename.com/names/usage/{}/{}'

r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')

names = {}

for p in people:
    names[p] = {'masc': [], 'fem': [], 'surname': []}
    for x in range(1, 5):
        print(f'Fetching {url.format(p, x)}')
        r = requests.get(url.format(p, x))
        soup = BeautifulSoup(r.text, 'html.parser')
        list_names = soup.findAll("span", {"class": "listname"})
        for n in list_names:
            gender = 'fem' if n.parent.find("span", {"class": "fem"}) else 'masc'
            names[p][gender].append(n.contents[0].text)
        if not list_names:
            break
    for x in range(1, 5):
        print(f'Fetching {url.format(p, x)}')
        r = requests.get(s_url.format(p, x))
        soup = BeautifulSoup(r.text, 'html.parser')
        list_names = soup.findAll("span", {"class": "listname"})
        for n in list_names:
            names[p]['surname'].append(n.contents[0].text)
        if not list_names:
            break
