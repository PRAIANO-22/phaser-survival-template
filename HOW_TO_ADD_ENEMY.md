# How To Add A New Enemy

## Step 1

Open:

```text
src/config/GameConfig.js
```

---

## Step 2

Add a new enemy inside:

```js
GameConfig.ZOMBIES.TYPES
```

Example:

```js
FLYING: {
  health: 5,
  speedBonus: 60,
  xp: 10,
  scale: 1.2,
  tint: 0xff8800
}
```

---

## Step 3

Add the enemy to:

```js
GameConfig.ZOMBIES.SPAWN_TABLE
```

Example:

```js
{
  chance: 10,
  type: "FLYING"
}
```

---

## Step 4

Run the game.

EnemySystem will automatically use the new enemy type.

No EnemySystem modifications are required.
