# 📦 nx-angular-nest-box

A fullstack monorepo built with [Nx](https://nx.dev) that integrates:

- 🛠 **NestJS API** for file uploads and folder management using Box Node SDK
- 💻 **Angular frontend** for drag-and-drop file upload, showing upload progress, and displaying Box folders in a Windows Explorer-style tree

---

## 📁 Project Structure

```
nx-angular-nest-box/
├── apps/
│   ├── api/         # NestJS backend (Box SDK integration)
│   └── web/         # Angular frontend (UI with upload + tree)
├── libs/            # Shared libraries (optional)
├── .nx/             # Nx cache
├── dist/            # Build outputs
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/<your-username>/nx-angular-nest-box.git
cd nx-angular-nest-box
npm install
```

---

### 2. Configure Box SDK

In `apps/api/`, create a `.env` file:

```env
BOX_CLIENT_ID=your_box_client_id
BOX_CLIENT_SECRET=your_box_client_secret
BOX_DEVELOPER_TOKEN=your_box_dev_token
```

> ⚠️ Use [Box Developer Token](https://developer.box.com/guides/authentication/developer-tokens/) for development. For production, use OAuth2 or JWT.

---

### 3. Run the Application

#### 🔧 Backend (NestJS):

```bash
npx nx serve api
```

Runs at: `http://localhost:3000`

#### 🖥 Frontend (Angular):

```bash
npx nx serve web
```

Runs at: `http://localhost:4200`

---

## 💡 Features

### Backend API (NestJS)

- `POST /upload`: Upload files to Box
- `GET /folders`: Retrieve folder and file structure as a tree
- `POST /folders`: Create new folders on Box
- Error handling, logging, and ready for extension with Kafka, Saga, etc.

### Frontend UI (Angular)

- Drag-and-drop multi-file upload
- File upload progress
- Tree view of Box folders and files
- Modular and scalable architecture

---

## ⚙️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | Angular, RxJS               |
| Backend     | NestJS, REST API            |
| Cloud SDK   | Box Node SDK                |
| Monorepo    | Nx                          |
| UI Framework| Angular Material / Tailwind (optional) |

---

## 🔧 Useful Nx Commands

| Task                         | Command                            |
|------------------------------|-------------------------------------|
| Run API                      | `npx nx serve api`                 |
| Run Web                      | `npx nx serve web`                 |
| Build both                   | `npx nx build api && nx build web` |
| View dependency graph        | `npx nx graph`                     |

---

## 📦 Future Ideas

- Add Kafka or RabbitMQ for event-driven orchestration
- Use Saga pattern for complex workflows
- Add authentication (Box OAuth2 or Auth0)

---

## 📝 License

MIT © [Your Name]

---

## 📬 Contact

Open an issue or pull request on GitHub if you want to contribute or ask questions.