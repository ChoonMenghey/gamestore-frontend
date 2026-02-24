import { Game } from '../types';

export const mockGames: Game[] = [
    {
        id: 1,
        code: "GTA5",
        name: "Grand Theft Auto V",
        genre: "Action-Adventure",
        price: 29.99,
        description: "An open-world action-adventure game set in the sprawling city of Los Santos, featuring a gripping story and immersive gameplay.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        code: "MCJE",
        name: "Minecraft: Java Edition",
        genre: "Sandbox",
        price: 26.95,
        description: "A sandbox game that allows players to build, explore, and survive in a blocky, procedurally generated 3D world.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        code: "W3R",
        name: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        price: 39.99,
        description: "A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
        createdAt: new Date().toISOString()
    }
];