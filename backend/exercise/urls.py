from django.conf.urls import url 
from exercise import views 
  
urlpatterns = [ 
    url(r'^exercise/$', views.exercise_list), 
    url(r'^exercise/(?P<pk>[0-9]+)$', views.exercise_detail), 
] 