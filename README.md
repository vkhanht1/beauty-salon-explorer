# Beauty Salon Explorer

A comprehensive Full-Stack web application designed to collect, explore, and manage hair and beauty salon data across various districts in Warsaw. The system features an automated data layer, a robust REST API backend, and an interactive, single-page frontend interface that enables seamless data browsing and manual modifications.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/vkhanht1/beauty-salon-explorer/beauty-cicd.yml?branch=main&label=CI-CD%20Pipeline&logo=github)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Technical Solution & Frameworks Used

The application is structured into three self-contained components:

1. **Data Collection (`data-collector`)**
   - Built using **Python 3** and **SQLite**.
   - Simulates a deduplicated dataset mimicking structure from local public sources (like Booksy and Google Places). 
   - Generates a local file-based database (`salons.db`) with 105 structural records to guarantee robust data quality.

2. **Backend REST API (`backend`)**
   - Built using **Kotlin** and **Spring Boot** (Spring Web, Spring Data JPA).
   - Connected via JDBC driver directly to the SQLite database.
   - Exposes clear REST endpoints to fetch the list of salons, retrieve individual records, and perform manual data modification.

3. **Frontend UI (`frontend`)**
   - Built using **React** and **TypeScript** (Single Page Application architecture).
   - Designed with clear product thinking to provide split-pane layout: quick summary list on the left with district filters, and interactive details/editing forms on the right.

---

## 🐳 How to Run the Application Instantly via Docker

Thanks to full containerization, you do not need to install Java JDK, Node.js, or Python runtimes on your local host machine. The entire micro-service ecosystem—including shared persistent storage—can be orchestrated with a single command.

### Prerequisites
Make sure you have **Docker** and **Docker Compose** installed.

### Quick Start
Open your terminal at the repository root and execute:

```bash
docker-compose up --build

```

### Local Network Endpoint Map:

* **Interactive React Frontend:** `http://localhost:3000` 
* **Spring Boot API Gateway:** `http://localhost:8080`
* **Shared Persistent Database:** Encapsulated via Docker Volumes directly linking backend storage.
