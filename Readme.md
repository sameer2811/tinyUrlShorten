# TinyURL - Scalable URL Shortener (TypeScript)

## 🚀 Overview

TinyURL is a scalable and low-latency URL shortening service built using **TypeScript + Express**.

The system is designed with clean architecture principles and demonstrates production-ready backend design patterns including:

* Controller → Service → Repository separation
* Cache-aside strategy
* Base62 encoding
* Extensible persistence layer
* Scalable-ready design

---

## 🏗 Architecture

Client
→ Express API
→ Service Layer
→ Cache Layer (In-Memory, TTL)
→ Repository Layer (Abstracted DB)

### Key Design Decisions

* Stateless application servers
* Cache-aside pattern
* Repository abstraction for easy DB replacement
* Base62 encoded unique identifiers
* Designed to upgrade to Redis + PostgreSQL easily

---

## 📂 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── cache/
 ├── models/
 ├── utils/
 ├── routes/
 ├── app.ts
 └── server.ts
```

---

## ⚙️ Features

* Create short URL
* Redirect via short code
* Click count tracking
* TTL-based in-memory cache
* Clean separation of concerns
* Production-ready folder organization

---

## 🔄 URL Creation Flow

1. Client sends long URL to `/shorten`
2. Unique ID generated
3. ID encoded using Base62
4. Stored in repository
5. Cached for fast lookup
6. Short URL returned

---

## 🔁 Redirect Flow

1. Client requests `/:shortCode`
2. Cache checked first
3. If miss → Repository lookup
4. Click count incremented
5. 302 redirect returned

---

## 🧠 ID Strategy

Current implementation:

* Time-based ID generation (`Date.now()`)
* Base62 encoding

Production upgrade recommendation:

* Snowflake ID generator
* Distributed ID service

---

## 💾 Cache Strategy

* Cache-aside pattern
* TTL-based expiration
* In-memory implementation

Production recommendation:

* Replace with Redis
* Use shared distributed cache for multi-instance deployment

---

## 📡 API Endpoints

### Create Short URL

POST /shorten

Request:
{
"url": "https://example.com"
}

Response:
{
"shortUrl": "http://localhost:3000/abc123"
}

---

### Redirect

GET /:shortCode

Returns:

* 302 Redirect if found
* 404 if not found

---

## 🛠 Installation

1. Install dependencies:
   npm init and press enter for all steps
   npm install express
   npm install dotenv


2. Build:
   npm run build

3. Start:
   npm start

---

## 📈 Scalability Considerations

To scale to millions of requests:

* Replace in-memory cache with Redis
* Replace in-memory repository with PostgreSQL / MongoDB
* Add load balancer
* Use distributed ID generator
* Add read replicas
* Add rate limiting

## 🎯 Design Goal

This project demonstrates:

* Clean backend architecture
* Scalable system thinking
* Low-latency optimization
* Production-ready separation of concerns

---