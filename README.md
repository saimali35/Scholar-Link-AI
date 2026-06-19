<div align="center">

# 🎓 ScholarLink AI

### Discover Scholarships. Unlock Opportunities.

**An intelligent scholarship discovery platform that connects students with funding opportunities matched to their academic profile, skills, and career goals.**

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#-license)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Database Setup](#-database-setup) • [Roadmap](#-project-vision--roadmap) • [Contributing](#-contributing)

</div>

---

## 📖 About

**ScholarLink AI** simplifies the scholarship search process for students by centralizing opportunities in one platform and using AI-driven matching to surface the most relevant scholarships for each user — based on their academic background, skills, interests, and career aspirations.

Whether you're hunting for merit-based awards, need-based grants, or niche scholarships tied to a specific field of study, ScholarLink AI helps you find them faster and track your applications in one place.

---

## ✨ Features

| | |
|---|---|
| 🔍 **Scholarship Discovery** | Browse, search, and filter scholarships by eligibility, category, and deadline |
| 🤖 **AI-Powered Recommendations** | Get personalized scholarship suggestions matched to your profile |
| 📊 **Application Tracking** | Save scholarships for later and track application status and deadlines |
| 👤 **Student Profiles** | Build a scholarship-ready profile with academic and personal details |
| 🔒 **Secure Backend** | RESTful API architecture with MySQL integration and environment-based config |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | MySQL |
| **Frontend** | HTML5, CSS3, JavaScript |
| **API Architecture** | RESTful |

---

## 📂 Project Structure

```text
ScholarLink-AI/
│
├── public/                # Static frontend assets
│   ├── index.html
│   ├── css/
│   └── js/
│
├── server/                # Backend application logic
│   └── server.js
│
├── data/                  # Local data store
│   └── database.json
│
├── .env.example           # Sample environment configuration
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MySQL](https://www.mysql.com/) installed and running locally
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/saimali35/Scholar-Link-AI.git
cd Scholar-Link-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```env
DATABASE_URL=mysql://username:password@localhost:3306/scholarlink_ai
PORT=3000
```

### 4. Run the Application

```bash
node server/server.js
```

Then open your browser at:

```text
http://localhost:3000
```

---

## 🗄 Database Setup

**1. Create the database:**

```sql
CREATE DATABASE scholarlink_ai;
```

**2. Create a dedicated user and grant privileges:**

```sql
CREATE USER 'scholarlink_user'@'localhost' IDENTIFIED BY 'your_password';

GRANT ALL PRIVILEGES ON scholarlink_ai.* TO 'scholarlink_user'@'localhost';

FLUSH PRIVILEGES;
```

> ⚠️ Replace `'your_password'` with a strong, unique password — and make sure it matches the credentials in your `.env` file.

---

## 🎯 Project Vision & Roadmap

ScholarLink AI is evolving into a complete scholarship assistance platform. Planned and in-progress features include:

- [ ] AI-based scholarship matching engine
- [ ] Smart eligibility analysis
- [ ] Scholarship deadline reminders & notifications
- [ ] Full application management dashboard
- [ ] Student profile optimization suggestions
- [ ] Expanded educational opportunity discovery

---

## 📸 Screenshots

> Add screenshots once the app is deployed.

| Home Page | Dashboard |
|---|---|
| ![Home Page](screenshots/home.png) | ![Dashboard](screenshots/dashboard.png) |

---

## 🤝 Contributing

Contributions, suggestions, and improvements are always welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Add your preferred license (e.g., [MIT](https://choosealicense.com/licenses/mit/)) here.

---

## 👨‍💻 Developer

**Sai Mali**
GitHub: [@saimali35](https://github.com/saimali35)

---

<div align="center">

⭐ **If you find this project useful, consider giving it a star!**

</div>
