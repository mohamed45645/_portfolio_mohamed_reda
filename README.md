# Mohamed Reda Portfolio

A modern and responsive personal portfolio website created for a Data Analyst, Junior Data Scientist, and Web Developer profile.

## Project Description

This portfolio is designed to present a professional profile suitable for job opportunities, freelance work, and client outreach. It highlights:

- Data analysis and business intelligence skills
- Python and SQL capabilities
- Power BI and Tableau experience
- Web development and automation interests
- Project showcases and contact details

## Features

- Responsive design for desktop, tablet, and mobile
- Fixed navigation bar with mobile hamburger menu
- Hero section with professional summary and call-to-actions
- About section with profile summary and focus areas
- Skills grouped by category
- Services section for analytics and development work
- Filterable projects section with modal details
- Experience and education timelines
- Career focus and education sections
- Contact message builder using device sharing or clipboard
- Dark mode / light mode toggle
- Smooth scrolling and scroll-reveal effects
- Back-to-top button
- SEO metadata and accessible structure

## Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- Font Awesome
- Google Fonts

## Project Structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── hero-illustration.svg
├── README.md
└── .gitignore
```

## How to Run

Open the project in a browser directly, or run a local server from the project folder:

```bash
cd portfolio
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to Customize

The project showcase currently features this portfolio website. Add verified project details and repository URLs to `projectData` in `js/script.js` when they are available. Add real contact details before publishing if you want visitors to reach you directly.

## GitHub Pages Deployment

The workflow in `.github/workflows/pages.yml` deploys the repository root to GitHub Pages after each push to `main`. Create a GitHub repository, push these files to its `main` branch, and allow the Pages deployment workflow to finish. The published URL appears in the workflow run and the repository's Pages settings.

## Notes

- This is a professional portfolio template designed to be easy to customize.
- No unverified professional experience, company names, certifications, project results, or contact links are included.
- The contact form prepares a message for sharing or copying; it does not submit to a server.

## License

This project is intended for portfolio and personal use.
