# 12-MegaBlog

A full-stack blog application built with React, Redux Toolkit, React Router, and Appwrite backend services. This project demonstrates a complete CRUD blog platform with user authentication, rich text editing, and image management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Components Documentation](#components-documentation)
- [Pages Documentation](#pages-documentation)
- [Services](#services)
- [State Management](#state-management)
- [Routing](#routing)
- [Scripts](#scripts)

## 🎯 Overview

MegaBlog is a modern, responsive blogging platform that allows users to:
- Create, read, update, and delete blog posts
- Authenticate using email/password
- Upload and manage featured images for posts
- Write posts using a rich text editor (TinyMCE)
- View only active posts
- Edit/delete their own posts

## ✨ Features

### Authentication
- User registration with validation
- Email/password login
- Session management
- Protected routes for authenticated users
- Auto-logout functionality

### Blog Management
- Create posts with rich text content
- Auto-generate URL-friendly slugs
- Upload featured images
- Edit existing posts
- Delete posts (with image cleanup)
- View all active posts
- Individual post pages

### UI/UX
- Responsive design with Tailwind CSS
- Loading states
- Error handling
- Form validation with React Hook Form
- Password visibility toggle
- Dynamic navigation based on auth status

## 🛠 Technology Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.13.0** - Client-side routing
- **Redux Toolkit 2.11.2** - State management
- **React Redux 9.2.0** - React bindings for Redux
- **React Hook Form 7.71.1** - Form validation
- **Tailwind CSS 4.1.18** - Utility-first CSS framework

### Backend & Services
- **Appwrite 22.0.0** - Backend as a Service (BaaS)
  - Authentication
  - Database (TablesDB)
  - Storage (File uploads)

### Rich Text Editor
- **TinyMCE React 6.3.0** - WYSIWYG editor
- **html-react-parser 5.2.17** - Parse HTML content

### Development Tools
- **Vite 7.3.1** - Build tool
- **ESLint 9.39.1** - Code linting
- **@vitejs/plugin-react 5.1.1** - React plugin for Vite

## 📁 Project Structure

```
12_MegaBlog/
├── public/                      # Static assets
├── src/
│   ├── AppWrite/               # Backend service integrations
│   │   ├── Auth.js            # Authentication service
│   │   └── Services.js        # Database & storage services
│   │
│   ├── Assets/                 # Application assets (logo, images)
│   │
│   ├── components/             # Reusable components
│   │   ├── Container/
│   │   │   └── Container.jsx  # Layout wrapper
│   │   ├── Footer/
│   │   │   └── Footer.jsx     # Footer component
│   │   ├── Header/
│   │   │   ├── Header.jsx     # Header/Navigation
│   │   │   └── LogOutBtn.jsx  # Logout button
│   │   ├── Post-form/
│   │   │   └── PostForm.jsx   # Post creation/editing form
│   │   ├── AuthLayout.jsx     # Protected route wrapper
│   │   ├── Button.jsx         # Reusable button component
│   │   ├── Input.jsx          # Form input component
│   │   ├── Login.jsx          # Login form component
│   │   ├── Logo.jsx           # Logo component
│   │   ├── PostCard.jsx       # Post preview card
│   │   ├── RTE.jsx            # Rich Text Editor wrapper
│   │   ├── Select.jsx         # Select dropdown component
│   │   ├── Signup.jsx         # Signup form component
│   │   └── index.js           # Component exports
│   │
│   ├── Conf/                   # Configuration
│   │   └── conf.js            # Environment variables
│   │
│   ├── Pages/                  # Page components
│   │   ├── AddPost.jsx        # Create new post page
│   │   ├── AllPosts.jsx       # View all posts page
│   │   ├── EditPost.jsx       # Edit post page
│   │   ├── Home.jsx           # Home page
│   │   ├── Login.jsx          # Login page wrapper
│   │   ├── Post.jsx           # Individual post page
│   │   └── Signup.jsx         # Signup page wrapper
│   │
│   ├── store/                  # Redux store
│   │   ├── AuthFile.js        # Auth slice
│   │   └── store.js           # Redux store configuration
│   │
│   ├── App.css                # Application styles
│   ├── App.jsx                # Root component
│   ├── index.css              # Global styles (Tailwind imports)
│   └── main.jsx               # Application entry point
│
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── Redux.md                   # Redux documentation/notes
├── README.md                  # Project documentation
└── vite.config.js             # Vite configuration
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 12_MegaBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Appwrite**
   - Create an account at [Appwrite Cloud](https://cloud.appwrite.io/)
   - Create a new project
   - Set up:
     - Authentication (Email/Password provider)
     - Database with a collection for posts
     - Storage bucket for images

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_TABLE_ID=your_table_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_EDITOR_ID=your_tinymce_api_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables (`src/Conf/conf.js`)

The configuration file safely exports environment variables:
- `appwriteUrl` - Appwrite API endpoint
- `appwriteProjectId` - Project identifier
- `appwriteDatabaseId` - Database identifier
- `appwriteTableId` - Posts table/collection identifier
- `appwriteBucketId` - File storage bucket identifier
- `tinymceEditorId` - TinyMCE API key

### Vite Configuration

- React plugin configured
- Tailwind CSS Vite plugin integrated
- Development server with hot module replacement

### ESLint Configuration

- React Hooks rules enforced
- React Refresh for fast development
- Browser globals configured
- Unused variables warning (capital letters/underscores ignored)

## 🏗 Architecture

### Authentication Flow

1. User submits login/signup form
2. `authService` methods communicate with Appwrite
3. On success, user data stored in Redux state
4. Protected routes check auth status before rendering
5. Logout clears sessions and Redux state

### Post Management Flow

1. **Create**: User fills form → uploads image → creates database entry → redirects
2. **Read**: Fetch posts from database → filter by status → display cards
3. **Update**: Load existing post → modify fields → update database → redirect
4. **Delete**: Remove database entry → delete associated image → redirect

### State Management

Redux Toolkit manages:
- User authentication status
- User data
- Actions: `login()`, `logout()`

Components access state via `useSelector()` and dispatch actions via `useDispatch()`

## 📦 Components Documentation

### Core Components

#### **AuthLayout.jsx** (Protected Routes)
- **Purpose**: Route protection wrapper
- **Props**: 
  - `children` - Components to protect
  - `authentication` (boolean) - If true, requires login; if false, requires logged out
- **Logic**: Redirects based on auth status

#### **Button.jsx**
- **Purpose**: Reusable styled button
- **Props**: `children`, `type`, `bgColor`, `textColor`, `className`, `...props`
- **Features**: Customizable colors and styling

#### **Input.jsx**
- **Purpose**: Form input with label
- **Features**: 
  - Uses `forwardRef` for React Hook Form integration
  - Auto-generated unique IDs
  - Consistent styling

#### **Select.jsx**
- **Purpose**: Dropdown selector
- **Props**: `options` (array), `label`, `className`, `...props`
- **Features**: `forwardRef` compatible

#### **RTE.jsx** (Rich Text Editor)
- **Purpose**: TinyMCE editor wrapper
- **Props**: `name`, `control`, `label`, `defaultValue`
- **Features**: 
  - Integrated with React Hook Form via Controller
  - Full toolbar with formatting options
  - Image upload support

#### **PostCard.jsx**
- **Purpose**: Display post preview
- **Props**: `$id`, `Title`, `FeaturedImage`
- **Features**: Links to individual post page

#### **Login.jsx**
- **Features**:
  - Email validation with regex
  - Password validation (min 8 chars)
  - Show/hide password toggle
  - Error display
  - Link to signup

#### **Signup.jsx**
- **Features**:
  - First/Last name fields
  - Email validation
  - Complex password validation (uppercase, lowercase, number, special char)
  - Show/hide password toggle
  - Form validation with React Hook Form

#### **Logo.jsx**
- **Purpose**: Display application logo
- **Props**: `width` (default: "100px")

### Layout Components

#### **Container.jsx**
- **Purpose**: Content width constraint and centering
- **Styling**: Max-width, auto margins, padding

#### **Header.jsx**
- **Features**:
  - Dynamic navigation based on auth status
  - Conditional rendering of menu items
  - Logout button for authenticated users
  - Logo linking to home

#### **Footer.jsx**
- **Features**:
  - Multi-column layout
  - Company and support links
  - Copyright information
  - Responsive design

#### **LogOutBtn.jsx**
- **Purpose**: Handle user logout
- **Logic**: Calls `authService.logout()` then dispatches Redux logout action

### Form Components

#### **PostForm.jsx**
- **Purpose**: Create/edit blog posts
- **Props**: `post` (optional, for editing)
- **Features**:
  - Auto-generate slug from title
  - Image upload (required for new posts)
  - Status selection (active/inactive)
  - Rich text content editor
  - Conditional rendering for edit mode
  - Image preview when editing

## 📄 Pages Documentation

### **Home.jsx**
- **Purpose**: Landing page
- **Logic**: 
  - Shows posts if logged in
  - Prompts login if not authenticated
  - Links to all posts page

### **Login.jsx** & **Signup.jsx** (Pages)
- **Purpose**: Wrapper pages for respective components
- **Features**: Adds padding for layout

### **AllPosts.jsx**
- **Purpose**: Display all active posts
- **Logic**: 
  - Fetches all posts on mount
  - Grid layout of PostCards
  - Empty state with link to add post

### **AddPost.jsx**
- **Purpose**: Create new post page
- **Features**: Renders PostForm without existing post data

### **EditPost.jsx**
- **Purpose**: Edit existing post
- **Logic**:
  - Fetches post by slug from URL params
  - Passes post data to PostForm
  - Loading state while fetching

### **Post.jsx**
- **Purpose**: Individual post view
- **Features**:
  - Displays featured image
  - Renders HTML content
  - Edit/Delete buttons (only for post author)
  - Delete confirmation with image cleanup

## 🔧 Services

### **Auth.js** (AuthService)

**Class**: `AuthService`

**Methods**:
- `createAccount({email, password, name})` - Register new user, auto-login on success
- `login({email, password})` - Create email/password session
- `getCurrentUser()` - Get current logged-in user data
- `logout()` - Delete all sessions

**Export**: Singleton instance `authService`

### **Services.js** (Service)

**Class**: `Service`

**Post Methods**:
- `createPost({title, slug, content, featuredImage, status, userId})` - Create new post
- `updatePost({title, slug, content, featuredImage, status, userId})` - Update existing post
- `deletePost(slug)` - Delete post by slug
- `getSinglePost(slug)` - Get single post
- `getAllPosts()` - Get all active posts (filtered by status)

**File Methods**:
- `uploadFile(file)` - Upload image to storage
- `deleteFile(fileId)` - Delete image from storage
- `previewFile(fileId)` - Get image URL for display (synchronous)

**Export**: Singleton instance `service`

## 🔄 State Management

### Redux Store (`store/store.js`)

```javascript
{
  auth: {
    status: boolean,    // Authentication status
    userData: object    // User data from Appwrite
  }
}
```

### Auth Slice (`store/AuthFile.js`)

**Initial State**:
- `status`: false
- `userData`: null

**Actions**:
- `login(userData)` - Set status to true, store user data
- `logout()` - Set status to false, clear user data

## 🛣 Routing

### Route Configuration

| Path | Component | Protection | Description |
|------|-----------|------------|-------------|
| `/` | Home | None | Landing page |
| `/login` | Login | Guest only | Login form |
| `/signup` | Signup | Guest only | Registration form |
| `/all-posts` | AllPosts | Auth required | View all posts |
| `/add-post` | AddPost | Auth required | Create new post |
| `/edit-post/:slug` | EditPost | Auth required | Edit existing post |
| `/post/:slug` | Post | None | View single post |

**Protected Routes**: Use `<Protected>` component with `authentication` prop

## 📜 Scripts

```json
{
  "dev": "vite",              // Start development server
  "build": "vite build",      // Build for production
  "lint": "eslint .",         // Run ESLint
  "preview": "vite preview"   // Preview production build
}
```

**Development**: `npm run dev` (default port: 5173)
**Production Build**: `npm run build`
**Lint Code**: `npm run lint`

## 🔐 Security Features

- Environment variables for sensitive data
- Password validation with complexity requirements
- Email validation with regex
- Protected routes prevent unauthorized access
- Session-based authentication
- CSRF protection via Appwrite

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Responsive Design** with mobile-first approach
- **Component-level styling** via className props
- **Consistent color scheme**: Gray scale with blue accents
- **Form styling**: Focus states, transitions, rounded corners

## 📝 Notes

- The project uses Appwrite's `TablesDB` API for database operations
- Slugs are auto-generated from titles and URL-encoded
- Featured images are required for new posts
- Only post authors can edit/delete their posts
- Posts must have "active" status to appear in listings
- HTML content is parsed and rendered safely using `html-react-parser`

## 🚧 Development Guidelines

1. **Component Creation**: Use forwardRef for form components
2. **State Management**: Use Redux for global state, useState for local
3. **Routing**: Protect routes using AuthLayout component
4. **Forms**: Use React Hook Form for validation
5. **API Calls**: Use try-catch for error handling
6. **Images**: Always clean up images when deleting posts

## 🐛 Known Issues & Fixes

- Environment variable naming issue fixed (mentioned in conf.js comments)
- Auth initialization check in App.jsx prevents flash of wrong content

## 🔮 Future Improvements

- Add post categories/tags
- Implement search functionality
- Add pagination for posts
- User profile pages
- Comment system
- Draft autosave
- Social media sharing
- Post analytics

## 📚 Learning Resources

See `Redux.md` for Redux Toolkit implementation patterns and examples.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Created as part of React learning journey.

---

**Last Updated**: February 2026