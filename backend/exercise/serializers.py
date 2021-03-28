from rest_framework import serializers 
from exercise.models import Exercise 
 
class ExerciseSerializer(serializers.Serializer): 
    pk = serializers.IntegerField(read_only=True) 
    name = serializers.CharField(max_length=150) 
    description = serializers.CharField(max_length=250) 
    exercise_category = serializers.CharField(max_length=200) 
    html_text=serializers.CharField(max_length=2500)
    js_text=serializers.CharField(max_length=2500)
    css_text=serializers.CharField(max_length=2500)
    additional_text=serializers.CharField(max_length=2500)
    release_date = serializers.DateTimeField() 
 
    def create(self, validated_data): 
        return Exercise.objects.create(**validated_data) 
 
    def update(self, instance, validated_data): 
        instance.name = validated_data.get('name', instance.name)         
        instance.description = validated_data.get('description', instance.description) 
        instance.release_date = validated_data.get('release_date', instance.release_date) 
        instance.exercise_category = validated_data.get('exercise_category', instance.Exercise_category) 
        instance.additional_text=validated_data.get('additional_text',instance.additional_text)
        instance.css_text=validated_data.get('css_text',instance.css_text)
        instance.js_text=validated_data.get('js_text',instance.js_text)
        instance.html_text=validated_data.get('html_text',instance.html_text)
        instance.exercise_category=validated_data.get('exercise_category',instance.exercise_category)
        instance.save() 
        return instance 