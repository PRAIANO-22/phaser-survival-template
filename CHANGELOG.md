# Changelog

## Framework Refactor

## Systems Migration

## Pooling Architecture

## EnemyPool Architecture

## Data Driven Enemy Architecture

## Wave System Recovery

## Upgrade Menu Pause Architecture

## Collision System Improvements

## UI Improvements

## Boss Framework

## Current Architecture State

# Changelog

## Upgrade Menu Pause Architecture

### Problem

Gameplay continued running while the upgrade menu was open.

Attempts using:

* physics.world.pause()
* scene.pause()
* body.moves = false

caused menu interaction problems.

Upgrade buttons became impossible to click.

### Cause

The framework contains multiple independent systems:

* EnemySystem
* DroneSystem
* WeaponSystem
* SkillSystem

Additionally:

* delayedCall()
* time.addEvent()

continued executing.

Stopping only the main update loop was insufficient.

### Solution

A global gameplay state was introduced:

```js
this.scene.isMenuOpen
```

All gameplay systems now respect this state.

Example:

```js
if (this.scene.isMenuOpen) return;
```

Additional changes:

* spawnEvent paused
* waveEvent paused

without pausing the Phaser physics engine.

### Result

During upgrade selection:

* gameplay frozen
* enemies frozen
* drones frozen
* projectiles frozen
* waves frozen
* menu remains interactive

---

## EnemyPool Encapsulation Refactor

### Previous State

EnemySystem accessed internal pool implementation:

```js
enemyPool.group.get()
enemyPool.group.countActive()
```

### New State

EnemyPool now exposes:

```js
enemyPool.spawn()
enemyPool.countActive()
enemyPool.getChildren()
```

### Benefits

* reduced coupling
* improved encapsulation
* reusable architecture
* framework scalability

---

## Game Over UI Fix

### Problem

Game Over UI appeared partially off-screen depending on camera position.

### Cause

HUD elements used:

```js
camera.centerX
camera.centerY
```

which move together with the game world.

### Solution

UI now uses:

```js
scale.width / 2
scale.height / 2
```

for screen-space positioning.

### Result

* Game Over always centered
* camera independent UI
* cleaner separation between gameplay and interface
