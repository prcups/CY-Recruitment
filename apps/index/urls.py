from django.urls import path

from . import views

urlpatterns = [
    path('api/get-post/', views.get_post),
    path('api/get-photo/', views.get_photo),
    path('api/get-code/', views.get_code)
]
