from bs4 import BeautifulSoup
import requests
import json

# Script to scrape a website for a bunch of names

people = ['japanese', 'indian', 'chinese', 'persian', 'mongolian', 'khmer', 'polynesian']

url = 'https://www.behindthename.com/names/usage/{}/{}'
s_url = 'https://surnames.behindthename.com/names/usage/{}/{}'

r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')

names = {}

for p in people:
    names[p] = {'masc': [], 'fem': [], 'surnames': []}
    for x in range(1, 5):
        print(f'Fetching {url.format(p, x)}')
        r = requests.get(url.format(p, x))
        soup = BeautifulSoup(r.text, 'html.parser')
        list_names = soup.findAll("span", {"class": "listname"})
        for n in list_names:
            gender = 'fem' if n.parent.find("span", {"class": "fem"}) else 'masc'
            na = n.contents[0].text.split(' ')
            # filter out duplicates. Also filter out special characters because they display badly, dunno how to fix
            if len(na) > 1 and na[1] != '(1)':
                continue
            if '\\' in json.dumps(na[0]):
                continue
            na = na[0]
            names[p][gender].append(na)
        if not list_names:
            break
    for x in range(1, 5):
        print(f'Fetching {s_url.format(p, x)}')
        r = requests.get(s_url.format(p, x))
        soup = BeautifulSoup(r.text, 'html.parser')
        list_names = soup.findAll("span", {"class": "listname"})
        for n in list_names:
            names[p]['surnames'].append(n.contents[0].text)
        if not list_names:
            break

json.dumps(names)
