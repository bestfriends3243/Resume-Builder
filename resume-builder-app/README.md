# Resume Builder Web App

## Overview
This project is a clean, modern, and user-friendly Resume Builder web application. Users can input their personal details, education, work experience, skills, and hobbies to generate a professional resume. The application features a live preview of the resume and allows users to download it as a PDF.

## Features
- Responsive design with a soft, professional color scheme.
- Clean typography with rounded edges and subtle shadows.
- Real-time preview of the resume as users fill out the form.
- Ability to add multiple entries for education and work experience.
- Download resume as a PDF using html2pdf.js.
- Minimal animations for form input focus and hover effects.

## Project Structure
```
resume-builder-app
├── src
│   ├── css
│   │   └── styles.css        # Contains styles for the web app
│   ├── js
│   │   └── script.js         # JavaScript code for dynamic functionality
│   ├── index.html            # Main HTML structure of the web app
├── assets
│   └── fonts                 # Custom fonts used in the project
├── README.md                 # Documentation for the project
└── package.json              # npm configuration file
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd resume-builder-app
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Open `src/index.html` in your web browser to view the application.

## Usage
- Fill out the form on the left side of the application.
- The resume preview will update in real-time as you type.
- Click the "Download PDF" button to save your resume as a PDF file.

## Dependencies
- html2pdf.js: A library used to generate PDF files from HTML content.

## License
This project is licensed under the MIT License.