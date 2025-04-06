# Sargawan Palace Hotel Booking

A modern and elegant hotel booking web application built with React and Vite. This application provides a seamless experience for users to browse rooms, make bookings, and manage their reservations at the luxurious Sargawan Palace hotel.

![Sargawan Palace Hotel]([Add a screenshot URL here])

## Features

- **Modern UI/UX**: Clean and responsive design with elegant animations
- **Room Browsing**: Browse through various room types with detailed information
- **Advanced Filtering**: Filter rooms by type, capacity, and price range
- **Room Details**: 
  - High-quality room images
  - Detailed amenities list
  - Real user reviews and ratings
  - Dynamic pricing
- **Booking System**:
  - Date range selection
  - Guest count selection
  - Real-time availability checking
  - Booking confirmation system
- **User Reviews**:
  - Star rating system
  - Detailed comments
  - Photo upload capability
- **Responsive Design**: Fully responsive across all device sizes
- **Interactive Elements**: 
  - Hover effects
  - Smooth transitions
  - Loading states
  - Toast notifications

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**:
  - SASS/SCSS for advanced styling
  - Tailwind CSS for utility classes
  - CSS Modules for component-scoped styles
- **Icons**: React Icons
- **Date Handling**: React DatePicker
- **Notifications**: React Toastify
- **Routing**: React Router DOM
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd hotel-booking
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── styles/            # SASS styles
│   ├── abstracts/     # Variables, mixins, functions
│   ├── base/          # Base styles
│   ├── components/    # Component styles
│   ├── layout/        # Layout styles
│   ├── pages/         # Page-specific styles
│   ├── themes/        # Theme variations
│   └── vendors/       # Third-party styles
├── data/             # Mock data and constants
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
└── App.jsx           # Root component
```

## Styling Guide

The project uses a combination of SASS and Tailwind CSS:
- SASS for complex component styles and themes
- Tailwind for utility classes and rapid development
- CSS Modules for component-scoped styling

### SASS Structure
- `abstracts/`: Contains variables, mixins, and functions
- `base/`: Reset and typography rules
- `components/`: Individual component styles
- `layout/`: Header, footer, and grid styles
- `pages/`: Page-specific styles
- `themes/`: Light/dark theme variations
- `vendors/`: Third-party style overrides

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Images from Unsplash
- Icons from React Icons
- UI inspiration from luxury hotel websites

## Contact

Your Name - [your-email@example.com]

Project Link: [https://github.com/yourusername/hotel-booking] 