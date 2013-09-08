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

def get_meta_data(request):
    if request.method == 'GET' and request.is_ajax():
        input_url = request.GET.get('input_url').strip()
        meta_data = MetaData.objects.filter(url=input_url)

        if meta_data.exists():
            meta_info = meta_data[0].__dict__
        else:
            meta_info = get_meta_details(input_url)

        form = MetaDataForm(initial=meta_info)
        meta_info.update({'form': form})

        html = render_to_string('meta_info.html', meta_info)
        data = {'success': True, 'html': html}
    else:
        data = {'success': False}

    json = simplejson.dumps(data)
    return HttpResponse(json, mimetype='application/json')

def update_meta_data(request):
    if request.method == 'POST' and request.is_ajax():
        form = MetaDataForm(data=request.POST)
        if form.is_valid():
            meta_data = form.save()
            meta_info = meta_data.__dict__
            meta_info.update({'form': form})
            html = render_to_string('meta_info.html', meta_info)
        else:
            html = render_to_string('meta_form.html', {'form':form})
    else:
        form = MetaDataForm()
        html = render_to_string('meta_form.html', {'form':form})

    data = {'html': html}
    json = simplejson.dumps(data)
    return HttpResponse(json, mimetype='application/json')
