import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b7d7b', // Dark moss green
        primaryHover: '#2c5e5b',
        secondary: '#a3b18c', // Pale moss green
        secondaryHover: '#8f9a7f',
        accent: '#28a745', // Success green
        error: '#d9534f',   // Error red
        neutralText: '#3b3a36',
        lightBg: '#f1f5f4',
        lightBgAlt: '#f9f9f9',
        grayBg: '#e0e0e0',
        profileBg: '#e8eedf',
        inputBg: '#f7f7f7',
        contactInput: '#fafafa',
        borderGray: '#ccc',
        mutedText: '#777',
        darkText: '#444',
      },
      fontFamily: {
        body: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        nav: '0 2px 6px rgba(0, 0, 0, 0.1)',
        card: '0 4px 10px rgba(0, 0, 0, 0.05)',
        modal: '0 10px 25px rgba(0, 0, 0, 0.3)',
        discussion: '0 4px 14px rgba(0, 0, 0, 0.1)',
        light: '0 0 4px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        'card': '1rem',
        'form': '2rem',
        'navbar-y': '12px',
        'navbar-x': '24px',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/WellnessRNC.png')",
        'body-pattern': "url('/assets/WellnessRNC.png')",
      },
    },
  },
  plugins: [flowbiteReact],
}