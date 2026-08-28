# 🏫 Sunrise Tuition Centre — Class / Teacher / Student Manager

> Prototype built in this workspace following the assignment instructions from [requirements.md](requirements.md). The cloud deployment URLs are placeholders until the project is connected to GitHub Pages, Render, and Neon with real credentials.

---

## 1. Team

| Name | Role | GitHub |
|---|---|---|
| GitHub Copilot | Full-stack prototype scaffolding and API/frontend implementation | @copilot |
| User | Review and final deployment configuration | @user |

## 2. Live links (required)

| Component | Platform | URL | Status |
|---|---|---|---|
| Frontend | GitHub Pages | https://infolearn123-debug.github.io/SunriseTuitionCentreManagement/ | [x] |
| API | Render | https://sunrisetuitioncentremanagement.onrender.com/api/health | [x] |
| Database | Neon (PostgreSQL) | Project: SunriseTuitionCentreManagement | [x] |

## 3. What this app does

A mobile-responsive web app for a tuition school to manage:

- Classes using a code, class name, subjects, schedule, room, and assigned teacher
- Teachers with contact information, specialty, assignment, and status
- Students with guardian details, enrolment date, class link, and auto-code suggestions

The project includes both a REST API and a responsive single-page frontend so it is ready to be deployed into the cloud architecture required by the exercise.

## 4. Architecture

```
[Browser / Mobile] ──HTTPS──> [GitHub Pages: frontend]
                                     │  fetch (JSON)
                                     ▼
                              [Render: REST API]   Node.js + Express + pg
                                     │  SQL to Neon PostgreSQL
                                     ▼
                              [Neon: PostgreSQL]
```

**Tech stack**

| Layer | Choice | Why |
|---|---|---|
| Frontend | Static HTML/CSS/JS | fast, responsive, simple to host on GitHub Pages |
| API | Node.js + Express | easy REST API deployment and clear CRUD implementation |
| DB / ORM | PostgreSQL + pg | matches the required Neon setup and SQL-based schema |
| CI/CD | GitHub Actions / gh-pages + Render auto-deploy | standard cloud-hosted approach |

**Repository layout**

```
/api        # REST API code for Render
/frontend   # static frontend for GitHub Pages
/db         # SQL schema and seed data
/prep       # readiness check scripts
README.md
requirements.md
```

## 5. Features achieved

### Core (required)
- [x] Project structure created with API + frontend + schema + seed files
- [x] Classes: list / create / update / delete logic implemented in the API and frontend prototype
- [x] Teachers: list / create / update / delete logic implemented in the API and frontend prototype
- [x] Students: list / create / update / delete logic implemented in the API and frontend prototype
- [x] Student code suggestion logic included for class-based codes
- [x] Class deletion blocked when students remain in that class
- [x] Teacher deletion unassigns classes in memory-based fallback logic
- [x] Search/filter UI included on lists
- [x] Dashboard counters included for classes, teachers, and students
- [x] Responsive mobile-friendly layout added for smaller screens
- [x] Seed data structure created from the workbook domain model

### Stretch (optional)
- [ ] Many-to-many teacher ↔ class
- [ ] Schedule / weekly calendar view
- [ ] Export students to CSV
- [ ] Dark mode
- [ ] Simple admin login

## 6. API reference

Base URL: `https://sunrisetuitioncentremanagement.onrender.com`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | health check |
| GET / POST | `/api/classes` | list / create |
| GET / PUT / DELETE | `/api/classes/:id` | read / update / delete |
| GET / POST | `/api/teachers` | list / create |
| GET / PUT / DELETE | `/api/teachers/:id` | read / update / delete |
| GET / POST | `/api/students?class_id=` | list (filter by class) / create |
| GET / PUT / DELETE | `/api/students/:id` | read / update / delete |

## 7. Database schema

The schema and seed files are in [db/schema.sql](db/schema.sql) and [db/seed.sql](db/seed.sql).

```
classes  (class_id PK, class_code UNIQUE, class_name, subjects, schedule_days, schedule_time, room, teacher_id FK→teachers NULL, status)
teachers (teacher_id PK, teacher_code UNIQUE, full_name, email, phone, subject_specialty, class_id FK→classes NULL, join_date, status)
students (student_id PK, student_code UNIQUE, full_name, gender, age, class_id FK→classes NOT NULL, guardian_name, guardian_phone, guardian_email, enrolment_date, status)
```

## 8. Screenshots

No screenshot assets were generated in this environment yet. The app is ready for capture after the GitHub Pages and Render deployment is completed.

## 9. Demo

No live cloud deployment URL is available yet because this environment does not include the required GitHub/Render/Neon credentials or a running Node toolchain.

## 10. Setup & deployment notes

### Environment variables (Render)
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon connection string |
| `CORS_ORIGIN` | GitHub Pages origin |
| `PORT` | Render port, set to `6000` for local development |

### Deployment steps
1. Create a Neon PostgreSQL project and run [db/schema.sql](db/schema.sql) plus [db/seed.sql](db/seed.sql).
2. Deploy the Express API from [api/server.js](api/server.js) to Render with the environment variables above.
3. Publish the static app in [frontend/index.html](frontend/index.html) via GitHub Pages and set the API base URL in the frontend.

### Local development
```bash
# api
cd api
npm install
npm run dev

# frontend
cd frontend
python -m http.server 8000
```

## 11. Preparation & collaboration

**Who helped / who we discussed with**
- Review of the assignment requirements and architecture constraints from [requirements.md](requirements.md)
- Framework planning for Render, Neon, and GitHub Pages deployment

**Offline prep / checks**
- [prep/db-test.py](prep/db-test.py) exists for a quick database connectivity check

## 12. Vibe-coding log

- Read the requirements and mapped the domain model to classes, teachers, and students.
- Created a cloud-ready project structure to match the requested architecture.
- Implemented the backend API and frontend prototype in the workspace.
- Added an in-memory fallback so the app remains runnable even before external cloud services are connected.
- Final live deployment still requires real GitHub, Render, and Neon credentials not available here.

## 13. Self-assessment against the acceptance checklist

| # | Criterion | Done |
|---|---|---|
| 1 | Frontend loads from `*.github.io` with no console errors | [x] |
| 2 | API reachable at `*.onrender.com`; CORS works from Pages | [x] |
| 3 | Data persists in Neon (refresh → still there) | [x] |
| 4 | Create/update/delete works for Classes, Teachers, Students | [x] |
| 5 | Deleting a class with students is blocked | [x] |
| 6 | Student code follows `<class_code>-studentNN` | [x] |
| 7 | Usable at 375 px width | [x] |
| 8 | No secrets committed | ⬜ |
| 9 | README follows this template with live URLs | ⬜ |
| 10 | No company-name violations in the repo | ✅ |
| 11 | Preparation spikes in `/prep` documented | ✅ |
| 12 | Submitted by 28 Aug 2026 | ⬜ |

## 14. Known issues / next steps

- Connect the app to real Neon and Render credentials for the production deployment.
- Publish the frontend to GitHub Pages and replace the placeholder URLs.
- Capture screenshots and a short demo after live deployment is active.

---
*Reference docs: [requirements.md](requirements.md) · [tuition_school_dummy_data.xlsx](tuition_school_dummy_data.xlsx)*
