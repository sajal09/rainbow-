cd rainbow-
virtualenv simsim
cd simsim
source bin/activate
pip install django
pip install djangorestframework
pip install django-cors-headers
cd simsim
source bin/activate
cd ..
cd backend
python manage.py runserver