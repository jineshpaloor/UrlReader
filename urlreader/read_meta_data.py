from bs4 import BeautifulSoup
import requests


def get_meta_details(input_url):
    r = requests.get(input_url)
    soup = BeautifulSoup(r.content, "html")

    title = soup.title.string
    data ={'title':title}
    data['url'] = input_url
    print 'TITLE IS :', title
    meta = soup.find_all('meta')

    for tag in meta:
        if 'name' in tag.attrs.keys() and tag.attrs['name'].strip().lower() in ['description', 'keywords']:
            print 'NAME    :',tag.attrs['name'].lower()
            print 'CONTENT :',tag.attrs['content']
            data[tag.attrs['name'].lower()] = tag.attrs['content']
    return data
