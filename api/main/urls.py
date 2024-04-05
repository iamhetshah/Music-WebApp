from django.urls import path
from . import views

urlpatterns = [
    path('suggestions/', views.suggestions),
    path('search/', views.search_results),
    path('playbackURL/', views.song_url),
    # path('login/', views.login),
    # path('register/', views.register),
    path('home/', views.home)
]
