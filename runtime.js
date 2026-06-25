let cloudCachedStore = null;

async function loadInitialDatabaseData() {
    try {
        const res = await fetch('/api/get-data');
        if (!res.ok) throw new Error("API call error");
        cloudCachedStore = await res.json();
        if (typeof render === 'function') render();
    } catch (err) {
        console.error("Database Connectivity Interruption: ", err);
        cloudCachedStore = { videos: [], blogs: [], resources: [], settings: {} };
        if (typeof render === 'function') render();
    }
}

function getData() {
    return cloudCachedStore || { videos: [], blogs: [], resources: [], settings: {} };
}

function applyGlobalSettings(s) {
    if (!s) return;
    if (s.name) {
        const logo = document.querySelector('.nav-logo');
        if (logo) logo.textContent = s.name;
    }
}

function getYouTubeId(input) {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : input.trim();
}

window.addEventListener('DOMContentLoaded', loadInitialDatabaseData);