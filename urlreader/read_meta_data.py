from bs4 import BeautifulSoup
import requests


def get_meta_details(input_url):
    try:
        r = requests.get(input_url)
    except:
        return {'url': input_url, 'description': '', 'title':'', 'keywords':''}

    soup = BeautifulSoup(r.content, "html")

    title = soup.title.string
    data ={'title':title}
    data['url'] = input_url
    meta = soup.find_all('meta')

    for tag in meta:
        if 'name' in tag.attrs.keys() and tag.attrs['name'].strip().lower() in ['description', 'keywords']:
            data[tag.attrs['name'].lower()] = tag.attrs['content']
    return data
