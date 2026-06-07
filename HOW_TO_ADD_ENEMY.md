## Existing Enemy Types

NORMAL
FAST
TANK
ELITE

## Example Enemy Configuration

```js
FAST: {
  health: 2,
  speedBonus: 45,
  xp: 2,
  scale: 0.7,
  tint: 0xffff00
}
```
## Spawn Table Example

```js
SPAWN_TABLE: [
  { chance: 8, type: "ELITE" },
  { chance: 27, type: "FAST" },
  { chance: 20, type: "TANK" },
  { chance: 45, type: "NORMAL" }
]
```

## Notes

EnemySystem is fully data-driven.

Adding new enemy types does not require modifications to EnemySystem.js.

Only GameConfig.js needs to be updated.

## Configuration Location

Open:

src/config/GameConfig.js

Enemy types are configured inside:

GameConfig.ZOMBIES.TYPES

Spawn chances are configured inside:

GameConfig.ZOMBIES.SPAWN_TABLE