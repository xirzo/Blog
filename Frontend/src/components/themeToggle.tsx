import {useEffect, useState} from "react";

const THEME_KEY = "theme";

function getPreferredTheme() {
    if (typeof window === "undefined") {
        return "dark";
    }

    const stored = localStorage.getItem(THEME_KEY);

    if (stored === "light" || stored === "dark") {
        return stored;
    }

    return "dark";
}

function setThemeAttribute(theme: string) {
    document.documentElement.setAttribute("data-theme", theme);
}

function ThemeToggle() {
    const [theme, setTheme] = useState<string>(() => getPreferredTheme());

    useEffect(() => {
        setThemeAttribute(theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        setThemeAttribute(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="
                px-4 py-2
                rounded-full
                transition-colors
                duration-200
                flex items-center justify-center
                w-12 h-12
                relative
            "
            aria-label="Toggle theme"
        >
            <span
                className="transition-transform duration-300"
                style={{transform: theme === "dark" ? "rotate(-10deg) scale(1.1)" : "rotate(60deg) scale(1.1)"}}
            >
                {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         style={{color: 'var(--color-link)'}}
                         className="bi bi-moon-fill" viewBox="0 0 16 16">
                        <path
                            d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         style={{color: 'var(--color-link)'}}
                         className="bi bi-brightness-high" viewBox="0 0 16 16">
                        <path
                            d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                    </svg>
                )}
            </span>
        </button>
    );
}

export default ThemeToggle;
