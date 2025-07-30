# RecipeAI - AI-Powered Recipe Generator

<div align="center">
  <img src="https://via.placeholder.com/200x200/EA580C/FFFFFF?text=RecipeAI" alt="RecipeAI Logo" width="200" height="200">
  
  <p><strong>Transform your ingredients into culinary masterpieces with the power of AI</strong></p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/recipe-ai-generator)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
</div>

## ✨ Features

- 🎯 **AI-Powered Recipe Generation** - Get personalized recipes based on your available ingredients
- 🔐 **Magic Link Authentication** - Secure, passwordless login with Supabase
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion animations
- 🗄️ **Dual Database** - Supabase for auth, MongoDB for recipe storage
- 🔄 **Real-time Updates** - Live recipe generation and updates
- 🌟 **Personalization** - Learns your preferences and dietary restrictions

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Supabase account
- MongoDB database
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/recipe-ai-generator.git
   cd recipe-ai-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   MONGODB_URI=your_mongodb_connection_string
   N8N_API_URL=your_n8n_instance_url
   N8N_API_KEY=your_n8n_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth with Magic Links
- **Database**: Supabase (PostgreSQL) + MongoDB
- **AI Integration**: n8n + OpenAI
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

### Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   └── dashboard/       # Dashboard pages
├── components/          # React components
├── lib/                # Utility functions
├── types/              # TypeScript types
└── styles/             # Global styles

grand-project/
├── docs/               # Documentation
├── api/                # Backend API files
├── app/                # Frontend application
└── ai/                 # AI logic and n8n workflows
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable Email authentication
3. Configure magic link settings
4. Copy your project URL and anon key

### MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Create a database named `recipe-generator`
3. Set up collections: `recipes`, `users`
4. Copy your connection string

### n8n Setup (Optional)

1. Set up n8n instance
2. Create workflows for AI recipe generation
3. Configure OpenAI integration
4. Set up API endpoints

## 🎯 Usage

### Basic Recipe Generation

1. **Sign in** with your email (magic link)
2. **Enter ingredients** you have available
3. **Set preferences** (dietary restrictions, cuisine, etc.)
4. **Generate recipe** with AI
5. **Save and manage** your recipes

### API Usage

```javascript
// Generate a recipe
const response = await fetch('/api/recipes/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    ingredients: ['chicken', 'rice', 'vegetables'],
    dietaryRestrictions: ['gluten-free'],
    cuisine: 'Asian',
    servings: 4
  })
});

const { recipe } = await response.json();
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npm run type-check

# Run tests (when available)
npm run test

# Build for production
npm run build
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Endpoints

#### `POST /api/recipes/generate`
Generate a new recipe based on ingredients and preferences.

**Request Body:**
```json
{
  "ingredients": ["chicken", "rice", "vegetables"],
  "dietaryRestrictions": ["gluten-free"],
  "cuisine": "Asian",
  "difficulty": "easy",
  "prepTime": 30,
  "servings": 4
}
```

**Response:**
```json
{
  "recipe": {
    "id": "recipe_id",
    "title": "Asian Chicken Rice Bowl",
    "ingredients": [...],
    "instructions": [...],
    "nutritionInfo": {...}
  }
}
```

#### `GET /api/recipes`
Get user's saved recipes.

#### `POST /api/recipes/:id/favorite`
Toggle favorite status for a recipe.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for authentication and database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OpenAI](https://openai.com/) for AI capabilities

## 📞 Support

For support, email support@recipeai.com or create an issue in this repository.

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Social recipe sharing
- [ ] Meal planning features
- [ ] Shopping list generation
- [ ] Recipe rating system
- [ ] Advanced AI personalization

---

<div align="center">
  <p>Made with ❤️ by the RecipeAI Team</p>
</div>
