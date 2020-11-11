# rest_api_express

Важно, для запуска, необходимо установить docker и docker-compose.

Установка:
1. Клонировать репозиторий

2. перейти в папку склонированного репозитория:

3. перейти в папку app, и установить зависимости 

    ```npm i```

4. вернуться на уровень выше, и запустить команду 

    ```docker-compose up --build ```

5. Для запуска тестов, проделать операции с 1 по 3, если не делали, и запустить:

    ```docker-compose -f docker-compose.test.yml up --build```

   
# API развернут по адресу api.alexserg.ru
# Swagger - api.alexserg.ru/api-docs/
    
P.S. работоспособность проверялась на Ubuntu.

