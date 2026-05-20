# Beauty Salon Explorer

A comprehensive Full-Stack web application designed to collect, explore, and manage hair and beauty salon data across various districts in Warsaw. The system features an automated data layer, a robust REST API backend, and an interactive, single-page frontend interface that enables seamless data browsing and manual modifications.

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

## How to Run the Application from Scratch

Ensure you have **Java JDK 17+**, **Node.js (v18+)**, and **Python 3** installed on your system.

### Step 1: Initialize Database & Populate Data
Open your terminal at the repository root and run:
```bash
cd data-collector
python generate_data.py

```

*This script will populate the `salons.db` inside the backend folder with 105 data records.*

### Step 2: Run the Backend API

Navigate to the backend directory and spin up the Spring Boot server:

```bash
cd ../backend
./gradlew bootRun

```

*The server will start running on [http://localhost:8080](https://www.google.com/search?q=http://localhost:8080).*

### Step 3: Run the Frontend UI

Open a new terminal window at the repository root, install dependencies, and launch the React client:

```bash
cd frontend
npm install
npm start

```

*The browser will automatically load the interface at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).*

---

## REST API Endpoints Exposed

* `GET /api/salons` - Returns the full list of salons containing general info (Name, District, Rating, Price Range).
* `GET /api/salons/{id}` - Returns full technical details for a single salon entity.
* `PUT /api/salons/{id}` - Updates a single salon's information and synchronizes changes back to the SQLite storage.

---

## What I'd Improve with More Time

Given more than the initial 4-8 hours layout, I would implement the following architectural enhancements:

1. **Production-Ready Relational Database:** Transition from local SQLite to an enterprise instance like **PostgreSQL** or **MySQL** hosted inside a Docker container.
2. **Database Optimization:** Add specific composite indexing on the `district` column to optimize search lookup speeds when scaling.
3. **API Scalability & Performance:** Implement backend-driven pagination (`page` and `size` parameters) for `GET /api/salons` and configure a **Redis cache layer** to handle traffic spikes across Poland.
4. **Automated Testing:** Add comprehensive Unit Tests using **MockK/JUnit5** for the Kotlin components and **Jest/React Testing Library** for the UI interface.
