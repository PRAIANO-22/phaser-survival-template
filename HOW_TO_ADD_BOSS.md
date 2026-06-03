# How To Add A New Boss

## Boss Architecture

Bosses are composed of:

* BossPool
* BossSpawner
* BossSystem
* CollisionSystem

---

## Step 1

Open:

```text
src/core/BossSpawner.js
```

---

## Step 2

Create a new boss configuration.

Example:

```js
DASH_BOSS: {
  health: 1000,
  speed: 120,
  damage: 25,
  xp: 100,
  scale: 2,
  tint: 0xff0000
}
```

---

## Step 3

Create a new spawn method inside BossSpawner.

Example:

```js
spawnDashBoss()
```

---

## Step 4

Configure special behavior inside:

```text
BossSystem.js
```

---

## Step 5

Spawn the boss from:

```text
WaveSystem.js
```

Example:

```js
if (this.wave === 10) {
  this.scene.bossSpawner.spawnDashBoss();
}
```

---

## Current Bosses

* Tank Boss
