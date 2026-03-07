import { Baby, Bot } from "lucide-react";


export const USER_ROLES = {
    DEVELOPER: "developer",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.DEVELOPER,
        label: "Developer",
        icon: Baby,
    },
    {
        value: USER_ROLES.ADMIN,
        label: "Admin",
        icon: Bot,
    },
]

export const GENRES = [
    {
        id: 1,
        name: "Action-Based",
    },
    {
        id: 2,
        name: "Adventure-Based",
    },
    {
        id: 3,
        name: "Role-Playing",
    },
    {
        id: 4,
        name: "Simulation",
    },
    {
        id: 5,
        name: "Strategy",
    },
    {
        id: 6,
        name: "Sports",
    },
    {
        id: 7,
        name: "Puzzle",
    },
    {
        id: 8,
        name: "Shooter",
    },
    {
        id: 9,
        name: "Platformer",
    },
    {
        id: 10,
        name: "Indie",
    },
    {
        id: 11,
        name: "MMORPG",
    },
    {
        id: 12,
        name: "Sandbox",
    },
    {
        id: 13,
        name: "Horror",
    },
    {
        id: 14,
        name: "Comedy",
    },
    {
        id: 15,
        name: "Drama",
    },
] as const;

export const GENRES_OPTIONS = GENRES.map((genre) => ({
    value: genre.id,
    label: genre.name,
}));

export const STATUS = [
    "Available",
    "Pending",
    "Not Available",
] as const;

export const STATUS_OPTIONS = STATUS.map((status) => ({
    value: status,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const getEnvVar = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
}

export const CLOUDINARY_UPLOAD_URL = getEnvVar("VITE_CLOUDINARY_UPLOAD_URL");
export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");
export const BACKEND_BASE_URL = getEnvVar("VITE_BACKEND_BASE_URL");

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = getEnvVar("VITE_CLOUDINARY_UPLOAD_PRESET");