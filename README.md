 📋 TaskFlow – Project Management Dashboard

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13.0.0-black?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

TaskFlow is a Trello/Asana-style project management dashboard for modern teams. Manage your tasks, projects, and workflows with an intuitive interface and real-time updates, powered by Supabase.

---

🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Supabase](https://supabase.com/)
- **UI:** [TailwindCSS](https://tailwindcss.com/), [HeadlessUI](https://headlessui.dev/)
- **State Management:** [React Query](https://tanstack.com/query)

---

## 🔧 Core Features

- 🔐 **Authentication** (via Supabase)
- 🔄 **Real-time Fetching** of tasks from Supabase
- 🛠️ **CRUD Operations** – Create, Edit, and Delete Tasks & Projects
- ⬆️ **Drag-and-Drop Task Reordering**
- 🌙 **Dark Mode** Toggle
- 📱 **Fully Responsive** on all screen sizes

---

## 🖼️ Screenshots

> _Include GIFs or screenshots here to showcase the task dashboard, drag-and-drop, dark mode, etc._

---

## 🧩 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/victortterry/TaskFlow.git
cd TaskFlow
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

* Go to [Supabase](https://supabase.com) and create a new project.
* Set up:

  * A `tasks` table (with columns like `id`, `title`, `status`, `created_at`, `project_id`)
  * A `projects` table
* Get your **Supabase URL** and **anon/public API key**.
* Add them to a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---

## ☁️ Deploy on Vercel

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. During setup:

   * Add your `.env.local` variables to the Vercel dashboard.
4. Click **Deploy**.

✅ Your app will be live at `https://your-project-name.vercel.app`.

---

## 💡 Tips

* Uses **Supabase Auth** for sign-in
* **React Query** manages task and project fetching/mutation state
* Styling is modular with **TailwindCSS**
* **Dark mode** is toggled via state and Tailwind’s `dark` class

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Victor Terry**
[GitHub](https://github.com/victortterry) • [LinkedIn](https://linkedin.com/in/your-profile) • [Twitter](https://twitter.com/yourhandle)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Please open an issue first to discuss your idea.

---

```

---

Let me know if you’d like:

- A **`.env.local` template file** included
- The **Supabase table schema**
- Or help creating an **auth-protected dashboard** with RBAC (role-based access) using Supabase
```
