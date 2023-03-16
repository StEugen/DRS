from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .serializers import UserSerializer

import json

class CreateUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.user_data = {
            'username': 'testuser',
            'password': 'testpass',
            'email': 'test@example.com'
        }

    def test_user_with_valid_data(self):
        response = self.client.post(self.register_url, data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=self.user_data['username'])
        self.assertEqual(user.email, self.user_data['email'])
        serializer = UserSerializer(instance=user)
        self.assertEqual(response.data, serializer.data)

    def test_user_with_missing_data(self):
        invalid_data = {k:v for k,v in self.user_data.items() if k != 'email'}
        response = self.client.post(self.register_url, data=invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_with_existing_username(self):
        existing_user = User.objects.create_user(**self.user_data)
        response = self.client.post(self.register_url, data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



class LoginViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser', password='testpass'
        )
        self.login_url = reverse('login')

    def test_login_successful(self):
        data = {
            'username': 'testuser',
            'password': 'testpass'
        }
        response = self.client.post(
            self.login_url, data=json.dumps(data), 
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_unsuccessful(self):
        data = {
            'username': 'testuser',
            'password': 'wrongpass'
        }
        response = self.client.post(
            self.login_url, data=json.dumps(data), 
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
