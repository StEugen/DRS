from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User, AnonymousUser
from django.test import RequestFactory

from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer
from .views import LogoutView

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


class CommentTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='testuser@test.com', password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_valid_comment(self):
        data = {'text': 'test comment', 'user': self.user.id}
        url = reverse('create-comment')
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_comment(self):
        data = {} 
        url = reverse('create-comment')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LogoutViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='testuser@example.com', password='testpass'
        )
        self.client.login(username='testuser', password='testpass')

    def test_logout(self):
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_logout_unauthenticated(self):
        self.client.logout()
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def tearDown(self):
        self.client.logout()
        self.user.delete()
