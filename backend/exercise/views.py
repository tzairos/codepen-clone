from django.shortcuts import render 
from django.http import HttpResponse 
from django.views.decorators.csrf import csrf_exempt 
from rest_framework.renderers import JSONRenderer 
from rest_framework.parsers import JSONParser 
from rest_framework import status 
from exercise.models import Exercise 
from exercise.serializers import ExerciseSerializer 
from django.shortcuts import render

 
class JSONResponse(HttpResponse): 
    def __init__(self, data, **kwargs): 
        content = JSONRenderer().render(data) 
        kwargs['content_type'] = 'application/json' 
        super(JSONResponse, self).__init__(content, **kwargs) 
 
 
def index(request):
  return render(request, '../frontend-build/index.html') 
@csrf_exempt 
def exercise_list(request): 
    if request.method == 'GET': 
        exercises = Exercise.objects.all() 
        exercise_serializer = ExerciseSerializer(exercises, many=True) 
        return JSONResponse(exercise_serializer.data) 
 
    elif request.method == 'POST': 
        exercise_data = JSONParser().parse(request) 
        exercise_serializer = ExerciseSerializer(data=exercise_data) 
        if exercise_serializer.is_valid(): 
            exercise_serializer.save() 
            return JSONResponse(exercise_serializer.data, \
                status=status.HTTP_201_CREATED) 
        return JSONResponse(exercise_serializer.errors, \
            status=status.HTTP_400_BAD_REQUEST) 
 
 
@csrf_exempt 
def exercise_detail(request, pk): 
    try: 
        exercise = Exercise.objects.get(pk=pk) 
    except Exercise.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        exercise_serializer = ExerciseSerializer(exercise) 
        return JSONResponse(exercise_serializer.data) 
 
    elif request.method == 'PUT': 
        exercise_data = JSONParser().parse(request) 
        exercise_serializer = ExerciseSerializer(exercise, data=exercise_data) 
        if exercise_serializer.is_valid(): 
            exercise_serializer.save() 
            return JSONResponse(exercise_serializer.data) 
        return JSONResponse(exercise_serializer.errors, \
            status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        exercise.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT) 