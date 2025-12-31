# 🤖 Intelligent Microservices Platform

<div align="center">

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.1-brightgreen?style=flat-square&logo=spring)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=flat-square&logo=python)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.4-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)

*A modern, AI-powered chat application built with microservices architecture*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

The **Intelligent Microservices Platform** is a cutting-edge chat application that leverages AI agents for web search and research capabilities. Built on a robust microservices architecture, it combines the power of Spring Boot, FastAPI, and React to deliver a seamless, intelligent conversational experience.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with Spring Security
- 🤖 **AI-Powered Search** - LangChain & LangGraph for intelligent web research
- 🚀 **Scalable Architecture** - Microservices design with API Gateway
- 🎨 **Modern UI** - Beautiful React interface with Tailwind CSS
- 🐳 **Containerized** - Full Docker Compose setup for easy deployment

---

## 🏗️ Architecture

The application follows a microservices architecture pattern with the following components:

```
┌─────────────────┐
│   Chat App      │  ← React + Vite Frontend
│  (Port: 5173)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Gateway    │  ← Spring Cloud Gateway
│  (Port: 8082)   │
└────────┬────────┘
         │
         ├──────────────────┬──────────────────┐
         ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ Auth Service   │  │ WebBot Service │  │   Future...    │
│ (Port: 8080)   │  │ (Port: 8081)   │  │                │
└───────┬────────┘  └────────────────┘  └────────────────┘
        │
        ▼
┌────────────────┐
│  PostgreSQL    │
│  (Port: 5432)  │
└────────────────┘
```

### Component Responsibilities

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **API Gateway** | Spring Cloud Gateway | Routes requests, handles authentication |
| **Auth Service** | Spring Boot + JPA | User management and JWT authentication |
| **WebBot Service** | FastAPI + LangChain | AI-powered web search and research |
| **Chat App** | React + Vite | User interface and interactions |
| **Database** | PostgreSQL 16.4 | Persistent data storage |

---

## ✨ Features

### 🔒 Authentication & Security
- User registration and login
- JWT-based token authentication
- Secure password encryption
- Role-based access control

### 🤖 AI Capabilities
- Intelligent web search using Google Gemini
- Research agent with LangGraph
- Context-aware responses
- Real-time streaming

### 💬 Chat Interface
- Clean, responsive design
- Real-time message updates
- Markdown rendering support
- Authentication popup
- Error handling with toast notifications

### 🛡️ Enterprise Features
- API Gateway for centralized routing
- Health check endpoints
- Global exception handling
- Docker containerization
- Environment-based configuration

---

## 🛠️ Tech Stack

### Backend Services

**Auth Service**
- Spring Boot 4.0.1
- Spring Security
- Spring Data JPA
- JWT Authentication
- PostgreSQL
- Lombok
- Java 21

**WebBot Service**
- FastAPI
- LangChain & LangGraph
- LangChain Community
- Google Gemini AI
- BeautifulSoup4
- Pydantic
- Python 3.13

**API Gateway**
- Spring Cloud Gateway (Webflux)
- Spring Boot 4.0.1
- Reactive Programming
- Java 21

### Frontend

**Chat App**
- React 19.2
- TypeScript 5.9
- Vite 7.2
- Tailwind CSS 4.1
- Axios
- React Hot Toast
- React Markdown
- Lucide React Icons

### DevOps

- Docker & Docker Compose
- PostgreSQL 16.4
- Maven (Java services)
- uv (Python package manager)

---

## 📁 Project Structure

```
intelligent-microservices/
│
├── 🌐 api-gateway/                 # Spring Cloud Gateway
│   ├── src/
│   │   └── main/
│   │       ├── java/tech/hariprasath/apigateway/
│   │       │   ├── advice/         # Global exception handlers
│   │       │   ├── config/         # Gateway configurations
│   │       │   ├── exception/      # Custom exceptions
│   │       │   ├── filter/         # Authentication filters
│   │       │   └── service/        # Business logic
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── 🔐 auth-service/                # Authentication & User Management
│   ├── src/
│   │   └── main/
│   │       ├── java/tech/hariprasath/authservice/
│   │       │   ├── advice/         # Exception handlers
│   │       │   ├── config/         # Security & JWT config
│   │       │   ├── controller/     # REST controllers
│   │       │   ├── dto/            # Data Transfer Objects
│   │       │   ├── entity/         # JPA entities
│   │       │   ├── exception/      # Custom exceptions
│   │       │   ├── filter/         # JWT filter
│   │       │   ├── mapper/         # DTO mappers
│   │       │   ├── repository/     # Data repositories
│   │       │   ├── service/        # Business logic
│   │       │   └── util/           # Utility classes
│   │       └── resources/
│   │           ├── application.properties
│   │           ├── static/
│   │           └── templates/
│   ├── Dockerfile
│   └── pom.xml
│
├── 🤖 webbot-service/              # AI Web Search Agent
│   ├── src/
│   │   ├── app.py                  # FastAPI application
│   │   ├── ai_agent/
│   │   │   └── web_search_agent.py # LangGraph agent
│   │   ├── model/
│   │   │   └── dto.py              # Pydantic models
│   │   └── tools/
│   │       └── web_tools.py        # Search tools
│   ├── Dockerfile
│   ├── pyproject.toml
│   └── requirements.txt
│
├── 💬 chat-app/                    # React Frontend
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios-instance.ts   # Axios configuration
│   │   │   └── index.ts            # API endpoints
│   │   ├── components/
│   │   │   ├── auth-popup.tsx      # Login/Register modal
│   │   │   ├── button.tsx          # Reusable button
│   │   │   ├── chat-text-area.tsx  # Message input
│   │   │   ├── conversation-area.tsx # Chat messages
│   │   │   ├── error-message.tsx   # Error display
│   │   │   ├── header.tsx          # App header
│   │   │   ├── input.tsx           # Form input
│   │   │   ├── loader.tsx          # Loading spinner
│   │   │   ├── messages.tsx        # Message bubbles
│   │   │   └── password-field.tsx  # Password input
│   │   ├── hooks/
│   │   │   └── use-popup-model.tsx # Modal state hook
│   │   ├── pages/
│   │   │   └── chat-interface.tsx  # Main chat page
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── 🔒 secrets/                     # Environment Variables
│   ├── auth.env                    # Auth service config
│   └── webbot.env                  # WebBot service config
│
├── docker-compose.yml              # Docker orchestration
├── .gitignore
└── README.md
```

---


### Code Style

- **Java**: Follow Spring Boot best practices
- **Python**: PEP 8 guidelines
- **TypeScript/React**: ESLint configuration included

---


<div align="center">

**Made with ❤️ using Spring Boot, React, and FastAPI**

</div>
