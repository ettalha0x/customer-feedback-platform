.PHONY: backend frontend

backend:
	cd ./backend && pip install -r requirements.txt && python manage.py runserver

frontend:
	cd ./frontend && npm install && npm run dev