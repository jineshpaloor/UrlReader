from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.utils import simplejson
from django.template import RequestContext
from django.template.loader import render_to_string

from urlreader.read_meta_data import get_meta_details
from urlreader.forms import MetaDataForm
from urlreader.models import MetaData


def home(request):
    return render_to_response('home.html',
                              context_instance=RequestContext(request))

def get_metadata(request, id=None):
    if request.method == 'GET':
        input_url = request.GET.get('input_url').strip()
        meta_data = MetaData.objects.filter(url=input_url)

        if meta_data.exists():
            meta_info = meta_data[0].__dict__
            meta_info.pop('_state')
        else:
            meta_info = get_meta_details(input_url)

    elif request.method in ['POST', 'PUT']:
        data = simplejson.loads(request.body)
        url = data.get('url').strip()
        title = data.get('title').strip()
        description = data.get('description').strip()
        keywords = data.get('keywords').strip()

        metadata = MetaData.objects.filter(url=url)
        if metadata.exists():
            metadata.update(url=url, title=title, description=description, keywords=keywords)
            metadata = metadata[0]
        else:
            metadata = MetaData.objects.create(url=url, title=title, description=description, keywords=keywords)

        meta_info = metadata.__dict__
        meta_info.pop('_state')

    json = simplejson.dumps(meta_info)
    return HttpResponse(json, mimetype='application/json')
