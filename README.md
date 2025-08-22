# 🎨 Poster Maker - Interactive Design Editor

A modern, feature-rich poster and flyer maker built with React, Next.js, and Shadcn/ui. Create beautiful designs with an intuitive drag-and-drop interface.

![Poster Maker Screenshot](https://via.placeholder.com/800x400/6366f1/ffffff?text=Poster+Maker+Demo)

## ✨ Features

### 🎯 Core Functionality
- **Three-Panel Layout**: Elements panel, interactive canvas, and properties panel
- **Drag & Drop**: Intuitive element manipulation on the canvas
- **Real-time Editing**: Instant visual feedback for all changes
- **Undo/Redo**: Full history management for design changes

### 📝 Text Elements
- **Headlines & Body Text**: Add text elements with full formatting
- **Font Customization**: Multiple font families (Inter, Arial, Helvetica, Times New Roman)
- **Text Styling**: Bold, italic, underline, strikethrough
- **Color & Alignment**: Full color picker and text alignment options
- **Font Sizes**: 12px to 64px range

### 🎨 Visual Elements
- **Shapes**: Rectangle, circle, star, triangle with customizable colors
- **Images**: Upload from file or add from URL
- **Backgrounds**: Solid colors or background images
- **Layer Management**: Bring forward, send backward, delete elements

### 🎛️ Advanced Controls
- **9-Point Positioning**: Precise element alignment grid
- **Layer Stacking**: Full control over element layering
- **Selection Tools**: Click to select and edit any element
- **Properties Panel**: Context-sensitive editing options

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.0 with TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Drag & Drop**: Custom implementation
- **Styling**: Tailwind CSS v4

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/poster-maker.git
   cd poster-maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Adding Elements
1. **Text**: Click "Headline" or "Body Text" in the Elements panel
2. **Shapes**: Click any shape icon (square, circle, star, triangle)
3. **Images**: Use "Upload" or "From URL" options
4. **Backgrounds**: Choose solid color or image from URL

### Editing Elements
1. **Select**: Click any element on the canvas
2. **Move**: Drag elements to reposition
3. **Format**: Use the Properties panel to modify:
   - Text: font, size, color, alignment, styling
   - Shapes: fill color, stroke, size
   - Position: use the 9-point alignment grid
   - Layers: bring forward/backward, delete

### Canvas Controls
- **Undo/Redo**: Use the buttons below the canvas
- **Clear Canvas**: Remove all elements at once
- **Download**: Export your design (coming soon)

## 📁 Project Structure

```
poster-maker/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main application page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── PosterMakerLayout.tsx  # Main layout component
│   │   │   ├── Header.tsx             # Top header with title and download
│   │   │   ├── ElementsPanel.tsx      # Left sidebar - element library
│   │   │   ├── Canvas.tsx             # Center canvas area
│   │   │   └── PropertiesPanel.tsx    # Right sidebar - element properties
│   │   ├── canvas/
│   │   │   └── CanvasElementRenderer.tsx  # Individual element rendering
│   │   └── ui/                   # Shadcn/ui components
│   └── lib/
│       ├── store.ts              # Zustand state management
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── components.json               # Shadcn/ui configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 Sample Design

The application comes pre-loaded with a sample design featuring:
- Purple circular background
- Multi-line text with "This is an amazing design to be working on!"
- "Designer" label
- "#newday" hashtag
- "Company" and "@user.name" branding elements

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### State Management
The application uses Zustand for state management with the following key features:
- Canvas elements array
- Selected element tracking
- History management (undo/redo)
- Element properties and positioning

### Component Architecture
- **Layout Components**: Handle the three-panel structure
- **Canvas Components**: Manage element rendering and interactions
- **UI Components**: Reusable Shadcn/ui components
- **Store**: Centralized state management

## 🚧 Roadmap

### Planned Features
- [ ] **Export Functionality**: Download designs as PNG/PDF
- [ ] **Templates**: Pre-designed templates library
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **Advanced Shapes**: More shape options and custom paths
- [ ] **Effects**: Drop shadows, gradients, filters
- [ ] **Responsive Design**: Mobile-friendly interface
- [ ] **Save/Load**: Project persistence and sharing

### Known Limitations
- Image upload currently uses URL input (file upload coming soon)
- Limited font selection (expandable)
- No export functionality yet
- Canvas size is fixed (customizable coming soon)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Zustand](https://github.com/pmndrs/zustand) for simple state management

---

**Built with ❤️ using React, Next.js, and Shadcn/ui**
# Updated Thu Aug 21 20:18:07 EDT 2025
