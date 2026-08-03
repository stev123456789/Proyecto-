from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed


class SuperuserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_superuser:
            raise AuthenticationFailed('Solo superusuarios pueden acceder.')
        return data


class SuperuserTokenObtainPairView(TokenObtainPairView):
    serializer_class = SuperuserTokenObtainPairSerializer
