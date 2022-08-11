# Базовая аутентификация/авторизация пользователей, client

Клиентская часть, построение архитектуры приложения Angular

Back-end, REST API на Express, здесь [https://github.com/dmitriy-tka4/users-auth-base-server](https://github.com/dmitriy-tka4/users-auth-base-server)

## Техническое задание

* Angular
* Routing, HTTP client, forms, сервисы, взаимодействие с REST API
* SCSS
* Регистрация, авторизация пользователей, просмотр своего профиля
* Используется только `Access token`
* Обработка ошибок (`ErrorInterceptor`, `ErrorService`)
* Хранить `currentUser` в `localStorage` (только `email`, идентификатор пользователя для возврата его данных будет браться на сервере из токена, к cookie клиент доступа не имеет, httpOnly), проверка будет по наличию `currentUser` в `localStorage`, если его нет, то неавторизован; при logout удаляем `currentUser` из `localStorage` и делаем запрос к `/auth/logout` для удаления куки (httpOnly)

## TODO

* Добавить валидацию форм

## Feedback

Писать на почту - dmitriy.tka4@gmail.com
