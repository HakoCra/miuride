from django.shortcuts import render


def index(request):
    return render(request, 'miuride_app/index.html')
