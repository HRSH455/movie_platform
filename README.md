# 🎬 CineBook — Movie Booking Platform

A full-stack cinema booking platform where users can browse movies, reserve seats, and manage their bookings — while admins control the catalogue and monitor all reservations in real time.

> Built with Angular + Spring Boot. Deployed and live.

## 🌐 Live Demo
| Layer | URL |
|-------|-----|
| Frontend | https://movie-platform-five.vercel.app/ |
| Backend API | https://movie-platform-backend-90ac.onrender.com |

---

## ✨ Features

**User**
- Register, login, and JWT-secured session management
- Browse and search movies
- Reserve seats with conflict-free booking (optimistic locking via JPA)
- View personal booking history

**Admin**
- Full movie catalogue management (add / edit / delete)
- View and manage all user bookings across the platform
- Role-based route protection — admin routes inaccessible to regular users

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 17, TypeScript, HTML5, CSS3 |
| Backend | Spring Boot, Spring Security, JPA/Hibernate |
| Auth | JWT (JSON Web Tokens), Role-Based Access Control |
| Database | MySQL |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🏗 Project Structure

```
├── angularapp/
│   ├── src/app/
│   │   ├── components/       # UI components
│   │   ├── services/         # API communication layer
│   │   ├── guards/           # Auth route guards
│   │   └── models/           # TypeScript interfaces
│   └── app-routing.module.ts
│
└── springapp/
    └── src/main/java/com/examly/
        ├── controllers/      # REST endpoints
        ├── services/         # Business logic
        ├── repositories/     # JPA repositories
        └── models/           # Entity classes
```

---

## ⚙️ How It Works

### Concurrency — Seat Reservation
Seat reservations use **JPA optimistic locking** (`@Version`) to handle concurrent booking attempts. If two users attempt to book the same seat simultaneously, one transaction wins and the other receives a conflict error — no double-booking, no pessimistic locks holding up the database.

### Security
All protected routes require a valid **JWT token** issued on login. Angular route guards block unauthorised navigation client-side, while Spring Security validates tokens on every API request server-side — two layers of protection.

---

## ▶️ Run Locally

### Backend
```powershell
cd springapp
mvn clean install
mvn spring-boot:run
# Runs at http://localhost:8080
```

### Frontend
```powershell
cd angularapp
npm install
ng serve --open
# Runs at http://localhost:4200
```

### Config
- Database: `springapp/src/main/resources/application.properties`
- API base URL: `angularapp/src/app/services/`

---

## 🧪 Tests
```powershell
# Angular
cd angularapp && ng test

# Spring Boot
cd springapp && mvn test
```

---

## 🛠 Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS errors | Add `@CrossOrigin` on controllers or configure a global `CorsFilter` |
| `ECONNREFUSED` in Angular | Ensure Spring Boot is running on port 8080 |
| `404` from API calls | Verify route paths in Angular services match backend `@RequestMapping` |
| Render backend slow to respond | Free tier spins down after inactivity — first request takes ~30s to wake |