from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class hello_world(APIView):

    def get(self, request):
        
        return Response({"name": "hello world"})