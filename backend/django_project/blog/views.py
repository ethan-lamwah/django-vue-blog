from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, welcome to ethan lam's blog. You're at the django index.")
