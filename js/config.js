const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const GATE_API_BASE_URL = IS_LOCAL 
    ? 'http://localhost:8001' 
    : 'https://gate.michaelkorman.com';