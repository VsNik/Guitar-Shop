
## Запуск

Колонировать репозиториц:
```
git clone git@github.com:VsNik/Guitar-Shop.git
```

Скопировать .env.example как .env
```
cp ./backend/.env.example ./backend/.env
```

Установка зависимостей

```
npm install
```
Запуск внешних сервисов

```
docker compose up -d
```

Запуск Backend:

```
nx serve backend
или
nx run backend:serve
или
npm run start:backend

```

Запуск Frontend:

```
nx serve frontend
или
nx run frontend:serve
или
npm run start:frontend
```

Запуск проекта целиком (Frontend + Backend)

```
nx run-many --target=serve --all --parallel=10
или
npm start
```

Заполнение БД тестовыми данными

```
npm run start:cli n
```
Где n - количество записей

#### REST API документация доступна по адресу:
http://localhost:3000/docs
#### Backend
http://localhost:3000/api
#### Frontend + проксирется Backend
http://localhost:4200


## Переменные окружения Backend:
NODE_ENV=окружение

PORT=порт
JWT_SECRET=JWT секрет

DATABASE_URL=Строка подключения к БД

UPLOAD_DIRECTORY_PATH=Путь до директории backend/uploads

SERVE_ROOT=Префикс пути к статике

SERVER_URL=URL адрес сервера

CLIENT_URL=URL адрес клиента

MAIL_SMTP_HOST=Хост почтового сервера

MAIL_SMTP_PORT=Порт почтового сервера

MAIL_USER_NAME=Логин почты

MAIL_USER_PASSWORD=Пароль почты

MAIL_FROM=FROM письма


## Доступные сценарии:
```
nx serve backend
nx serve frontend
nx run-many --target=serve --all --parallel=10
nx run backend:lint
nx run frontend:lint
nx run-many --targets=lint
npm run start:cli
npm run start:cli generate <n>
```
email: admin@example.test

password: admin

## Используемые пакеты:
### Монорепозиторий
- Nx
### Backend
- Nodejs
- Express
- Nest js
- Swagger
- PostgreSQL
- TypeORM
### Frontend
- React js 18
- Redux Toolkit
- React hook form
- React router dom

#### GitHub репозиторий:
- https://github.com/VsNik/Guitar-Shop/tree/main
