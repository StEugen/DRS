from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework import viewsets, status, generics, authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, CommentSerializer, HardwareSerializer, FacultySerializer, CabinetsSerializer
from .models import Comment, Faculty, cabinets, Hardware




class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(
            username=username, password=password
        )

        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class HardwareList(generics.ListCreateAPIView):
    queryset = Hardware.objects.all()
    serializer_class = HardwareSerializer


class HardwareDetail(generics.ListCreateAPIView):
    queryset = Hardware.objects.all()
    serializer_class = HardwareSerializer


class FacultyList(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class FacultyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class CabinetList(generics.ListCreateAPIView):
    queryset = cabinets.objects.all()
    serializer_class = CabinetsSerializer


class CabinetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = cabinets.objects.all()
    serializer_class = CabinetsSerializer