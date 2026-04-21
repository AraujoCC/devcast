# DevCast 🚀

Sistema de comunicação em tempo real construído com Java, Spring Boot e WebSocket.

> 💬 Broadcast de mensagens em tempo real com suporte a múltiplos usuários e salas (rooms).

---

## 📸 Demonstração

<!-- Adicione aqui um GIF ou print mostrando duas abas trocando mensagens em tempo real -->
<!-- Exemplo: ![demo](./docs/demo.gif) -->

---

## 🧠 Sobre o projeto

O DevCast simula o funcionamento de sistemas reais de comunicação como chats e notificações em tempo real.

Permite:
- múltiplos usuários conectados simultaneamente
- envio e recebimento de mensagens instantâneas
- criação e participação em salas (rooms)
- gerenciamento de usuários online

---

## ⚙️ Tecnologias

- Java 21 + Spring Boot 3
- WebSocket (STOMP + SockJS)
- Spring Data JPA + Hibernate
- PostgreSQL
- Lombok

---

## 🏗️ Arquitetura


- Client (Browser / React)
↓
- WebSocket Endpoint (/ws)
↓
- ChatController (STOMP)
↓
- Services (ChatService, UserService)
↓
- PostgreSQL (users, rooms, messages, room_members)


---

## 🔌 Endpoints REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/users/cadastrar` | Cadastrar usuário |
| POST | `/api/users/login` | Login |
| POST | `/api/users/{id}/logout` | Logout |
| GET | `/api/users/online` | Listar usuários online |
| GET | `/api/rooms` | Listar salas públicas |
| POST | `/api/rooms` | Criar sala |
| POST | `/api/rooms/{id}/entrar` | Entrar em sala |

---

## ⚡ WebSocket

| Destino | Descrição |
|---------|-----------|
| `/app/chat/{roomId}` | Enviar mensagem para sala |
| `/topic/sala.{roomId}` | Receber mensagens em tempo real |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Java 21
- PostgreSQL
- Maven

---

### 1. Criar banco de dados

```bash
psql -U postgres -c "CREATE DATABASE devcast;"
2. Rodar o schema
psql -U postgres -d devcast -f schema.sql
3. Configurar aplicação

No application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/devcast
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA
4. Rodar aplicação
./mvnw spring-boot:run
🗺️ Roadmap
 WebSocket + Broadcast
 Salas (Rooms)
 Cadastro e login de usuários
 Autenticação JWT + Spring Security
 Frontend em React
 Rate limiting + RabbitMQ
 Deploy (Docker + Cloud)
💡 Próximos passos
autenticação segura com JWT
persistência de mensagens
escalabilidade com filas (RabbitMQ)
interface web (React)
👨‍💻 Autor

Pedro Isaac
Desenvolvedor Backend | Java | Spring Boot
