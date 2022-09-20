import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Creates a superuser.'    

    def handle(self, *args, **options):   
        User = get_user_model()     
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username=os.environ.get('SU_NAME'),
                password=os.environ.get('SU_PASSWORD')
            )
        print('Superuser has been created.')
