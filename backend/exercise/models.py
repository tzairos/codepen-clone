from django.db import models

# Create your models here.
class Exercise(models.Model): 
    created = models.DateTimeField(auto_now_add=True) 
    name = models.CharField(max_length=150, blank=False, default='') 
    description = models.CharField(max_length=250, blank=True, default='') 
    exercise_category = models.CharField(max_length=200, blank=True, default='') 
    html_text=models.CharField(max_length=2500, blank=True, default='')
    js_text=models.CharField(max_length=2500, blank=True, default='')
    css_text=models.CharField(max_length=2500, blank=True, default='')
    additional_text=models.CharField(max_length=2500, blank=True, default='')
    release_date = models.DateTimeField() 
 
    class Meta: 
        ordering = ('name',)