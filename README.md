# 🎴 Memory Game (Vue + Vite + Three.js)

A simple memory game built with **Vue 3**, **Vite**, and **Three.js**.
Cards are rendered in 3D and have different rarities (`rarity`) which affect how often they appear in the game.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed:

- [Download Node.js](https://nodejs.org/)

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/Bartek-Nowak/FlipVue.git
   cd FlipVue
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the app in your browser at:

   ```
   http://localhost:5173
   ```

## 🖼️ Customizing the Tile Pool

The game uses a **tile pool** defined in:

```
src/memory-game/data/tilePool.json
```

Each entry represents a tile with its **image**, **rarity**, and **weight**.

### Example:

```json
[
  { "imageUrl": "/images/1.png", "rarity": "common", "weight": 40 },
  { "imageUrl": "/images/7.png", "rarity": "common", "weight": 40 },
  { "imageUrl": "/images/2.png", "rarity": "uncommon", "weight": 25 },
  { "imageUrl": "/images/3.png", "rarity": "rare", "weight": 15 },
  { "imageUrl": "/images/4.png", "rarity": "mythical", "weight": 10 },
  { "imageUrl": "/images/5.png", "rarity": "legendary", "weight": 5 },
  { "imageUrl": "/images/6.png", "rarity": "ancient", "weight": 3 },
  { "imageUrl": "/images/8.png", "rarity": "immortal", "weight": 1 }
]
```

### Fields:

- `imageUrl` – Path to the image used for the tile.

- `rarity` – Label that describes the rarity (common, rare, etc.).

- `weight` – Controls how often this tile appears in random selection. Higher weight = more frequent.

### Rules:

Each tile entry must be unique.

A tile is considered unique if the combination of imageUrl and rarity is different.

This means you can reuse the same image with different rarities – in that case, it will be treated as a separate unique tile.

You can add, remove, or adjust entries to create your own card pool.

Make sure all images are placed inside the `/public/images` directory.

## 🔗 Shareable Games

Each game is generated from a **seed** and can be shared using a unique link.
Anyone with the link will see the exact same board.

## 📜 License

MIT
