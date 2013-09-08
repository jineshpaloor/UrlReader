from django.forms import ModelForm
from urlreader.models import MetaData

class MetaDataForm(ModelForm):
    class Meta:
        model = MetaData

    def save(self, commit=True):
        metadata = super(MetaDataForm, self).save(commit=False)
        meta_data = MetaData.objects.filter(url=metadata.url)

        # check whether the url have already saved in database
        if meta_data.exists():
            return meta_data[0]

        if commit == True:
            metadata.save()

        return metadata
