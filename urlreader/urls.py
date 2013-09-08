from django.conf.urls import patterns, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('urlreader.views',
    # Examples:
    url(r'^$', 'home', name='home'),
    url(r'^get_metadata/$', 'get_metadata', name='get-meta-data'),
    url(r'^update_metadata/$', 'update_meta_data', name='update-meta-data'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
