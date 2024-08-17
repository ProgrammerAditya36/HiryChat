module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx,css,html}",
        "./index.html",
    ],
    theme: {
        extend: {
            colors: {
                "primary-bg": "rgb(239 68 68)",
                "secondary-bg": "#f6f6f6",
                "text-user": "#faf4e9",
                "text-sender": "#dddddd",
            },
        },
    },
    plugins: [],
};
