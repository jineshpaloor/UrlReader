from django.db import models


class MetaData(models.Model):
    url = models.URLField()
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
