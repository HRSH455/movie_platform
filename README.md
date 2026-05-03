# Movie Booking Platform

A full-stack movie booking application with Angular front-end and Spring Boot back-end.

## ✅ Project Structure

- `angularapp/` - Angular client
  - `src/app/` - features, components, services, guards
  - `app-routing.module.ts` - app routes
  - models/services for login, booking, movie, user
- `springapp/` - Spring Boot API
  - `src/main/java/com/examly/` - controllers, services, repositories, models
  - `src/main/resources/application.properties` - app config
- `backup.sql` - initial database schema/data (if included)

## 🚀 Features

- User registration and login
- Admin and user role-based routing
- Movie management (add/view/update/delete)
- Booking flow (create/view bookings)
- Booking history views for user and admin
- Route protection via auth guard
- REST API endpoints in Spring Boot

## 🧰 Tech Stack

- Front-end: Angular (TypeScript, HTML, CSS)
- Back-end: Spring Boot (Java)
- Database: H2 / MySQL (configurable via `application.properties`)

## 📥 Prerequisites

- Node.js (14+)
- Angular CLI
- Java 17+ (depending on Spring Boot setup)
- Maven

## ▶️ Run locally

### 1. Start backend

```powershell
cd springapp
mvn clean install
mvn spring-boot:run
```

Server starts at `http://localhost:8080`.

### 2. Start frontend

```powershell
cd angularapp
npm install
ng serve --open
```

App runs at `http://localhost:4200`.

## 🛠 Config

- Spring Boot database config: `springapp/src/main/resources/application.properties`
- Angular API base URL: check service files in `angularapp/src/app/services/` (e.g. `auth.service.ts`, `movie.service.ts`, `booking.service.ts`)

## 📌 Usage

- Register user, or sign in as admin (credential seed may exist in `backup.sql` or data initializer)
- Admin: add movies, view all bookings
- User: search/list movies, create booking, view own bookings

## 🧪 Tests

- Angular: `cd angularapp && ng test`
- Spring Boot: `cd springapp && mvn test`

## 💡 Troubleshooting

- CORS issues: add CORS config in backend controller or global `CorsFilter`
- `ECONNREFUSED` from Angular: ensure Spring Boot is running
- `404` from API: verify route paths in Angular services match backend endpoints

