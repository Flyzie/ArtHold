# ArtHold

ArtHold is a web application designed for artists and art enthusiasts to showcase, share, and interact with artworks. The platform allows users to create albums, upload artworks, comment on artworks, and like their favorite pieces.

## Features

- **User Authentication**: Secure user authentication using NextAuth.js.
- **Artwork Management**: Users can create albums, upload artworks, and manage their collections.
- **Comments and Replies**: Users can comment on artworks and reply to comments.
- **Likes**: Users can like artworks.
- **Responsive Design**: A responsive design that works well on both desktop and mobile devices.
- **Seamless user experience**: Reactivity of vue and features like infinite scroll, lazy loading, etc make sure the user get a seamless smooth experience.

## Technical Features

- **Infinite Scroll**: Implemented using Intersection Observer API to load more artworks as the user scrolls down.
- **Debounced Search**: Search functionality with debouncing to reduce the number of API calls.
- **File Uploads**: Handled using Formidable for parsing form data and file uploads.
- **Error Handling**: Global error handling using Nuxt's error handler with error Toasts.
- **State Management**: Managed using Vue's Composition API and reactive state.
- **CSS Utilities**: Tailwind CSS for styling and utility classes.
- **Database ORM**: Prisma ORM for database interactions with PostgreSQL.
- **Middleware**: Custom middleware for route protection and redirection based on authentication status.
  
 ## Tech Stack

- **Frontend**: Vue.js, Nuxt.js, Tailwind CSS
- **Backend**: Node.js, Nitro, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel, Netlify

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/arthold.git
    cd arthold
    ```

2. **Install dependencies**:

    ```bash
    # npm
    npm install

    # yarn
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the [ArtHold](http://_vscodecontentref_/1) directory and add the necessary environment variables. Here is an example:

    ```env
    DATABASE_URL=your_database_url
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    ```

4. **Run database migrations**:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the development server**:

    ```bash
    # npm
    npm run dev

    # yarn
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.
