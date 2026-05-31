# Phaser Survivor Framework — Progress Documentation

## Current Project State

The project evolved from a single survival shooter game into the foundation of a reusable modular framework.

The main architectural goals became:

* reusable systems
* scalable combat
* explicit pooling
* framework-ready organization
* commercial viability

---

# Architectural Refactor

## Previous Structure

```txt
src/
 ├── systems/
 ├── entities/
 ├── scenes/
 ├── ui/
```

### Problems

* systems folder becoming monolithic
* hidden coupling between gameplay systems
* difficult scalability
* weak commercial presentation

---

## New Structure

```txt
src/
 ├── combat/
 ├── core/
 ├── pooling/
 ├── upgrades/
 ├── waves/
 ├── entities/
 ├── scenes/
 ├── ui/
 ├── demo/
 └── config/
```

### Benefits

* domain separation
* clearer responsibilities
* reusable architecture
* easier documentation
* framework-ready organization

---

# Systems Migration

## Combat

Moved:

* WeaponSystem.js
* CollisionSystem.js

New location:

```txt
src/combat/
```

---

## Waves

Moved:

* WaveSystem.js
* EnemySystem.js

New location:

```txt
src/waves/
```

---

## Upgrades

Moved:

* SkillSystem.js
* XPSystem.js
* UpgradeMenu.js

New location:

```txt
src/upgrades/
```

---

## Core

Moved:

* InputSystem.js
* HealthSystem.js
* PlayerSystem.js

New location:

```txt
src/core/
```

---

# Refactor Recovery

After moving systems:

* imports broke
* GameScene failed to boot
* screen became black

The project was recovered by:

* fixing scene imports
* fixing duplicate imports
* restoring EnemySystem import
* validating Phaser boot pipeline
* isolating GameScene

Verification process:

```js
console.log("GAME SCENE RODANDO")
```

and temporary render tests.

---

# Wave System Recovery

WaveSystem survived the refactor correctly.

The real issue was inside EnemySystem.

A malformed conditional block caused zombie updates to fail.

Broken logic:

```js
if (...) if (...) {}
```

The update logic was cleaned and stabilized.

### Result

* zombies spawning again
* wave progression restored
* enemy AI functioning again

---

# Weapon System Evolution

## Initial State

WeaponSystem already supported:

* multishot
* shotgun mode
* fire rate control
* projectile scaling
* collision integration
* visual feedback
* cooldown handling

However, pooling implementation was inconsistent.

---

# Pooling Problems Found

## Problem 1 — Incorrect Bullet Recycling

Old behavior:

Bullets were being reactivated after lifetime expiration.

This caused:

* pool saturation
* objects staying active
* degraded performance

---

## Problem 2 — Shotgun Using .create()

Old behavior:

```js
this.scene.bullets.create()
```

This bypassed pooling and created unnecessary allocations.

---

# Pooling Refactor

## ObjectPool.js Created

Location:

```txt
src/pooling/ObjectPool.js
```

Responsibilities:

* activation
* deactivation
* visibility control
* physics reset

Core methods:

```js
activate(obj, x, y)
deactivate(obj)
```

---

## WeaponSystem Integration

WeaponSystem was updated to:

* use ObjectPool.activate()
* use ObjectPool.deactivate()
* stop manual pooling logic
* standardize bullet recycling

---

## Shotgun Pooling Fix

Shotgun logic was updated from:

```js
.create()
```

To:

```js
.get()
```

### Result

* real pooling behavior
* reusable projectiles
* reduced allocations
* scalable combat

---

# BulletPool Architecture

## BulletPool.js Created

Location:

```txt
src/pooling/BulletPool.js
```

Goal:

Separate bullet ownership from scene logic.

Before:

```js
this.scene.bullets.get()
```

After:

```js
this.scene.bulletPool.get()
```

### Benefits

* combat no longer directly owns physics groups
* pooling becomes independent
* reusable framework structure

---

# EnemyPool Migration Recovery

## Enemy Ownership Refactor

Enemies were migrated from:

```js
this.scene.zombies
```

To:

```js
this.scene.enemyPool.group
```

This changed the ownership model completely.

---

## Main Problems Found

### Missing EnemyPool Implementation

EnemyPool.js existed but was empty.

This caused:

* black screen boot failure
* silent scene crash
* undefined constructor problems

Solution:

EnemyPool was fully implemented with:

* physics group ownership
* get() abstraction
* centralized enemy pooling

---

### Invalid Nested Reference

Broken code:

```js
this.this.scene.enemyPool.group
```

Fixed:

```js
this.scene.enemyPool.group
```

---

### CollisionSystem Architecture Bug

Old behavior:

```js
this.collisionSystem.setup()
```

inside update loop.

Problems:

* overlap duplication
* performance degradation
* memory growth
* unstable boot behavior

Solution:

* removed CollisionSystem.update()
* overlaps initialize only once
* Phaser physics manages collisions automatically

---

### Hidden Dependency Problem

PlayerSystem depended implicitly on SkillSystem.

Old code:

```js
if (!this.scene.skillSystem.isDashing)
```

When SkillSystem was disabled:

* PlayerSystem crashed
* Scene boot failed

Solution:

```js
if (
  !this.scene.skillSystem ||
  !this.scene.skillSystem.isDashing
)
```

---

# Upgrade Menu Pause Fix

## Problem

The game continued running while the upgrade menu was open.

Attempts using:

* physics.world.pause()
* scene.pause()
* body.moves = false

caused menu input failures.

Buttons became impossible to click.

---

## Cause

The project contains multiple independent systems:

* EnemySystem
* DroneSystem
* WeaponSystem
* SkillSystem

Additionally:

* delayedCall()
* time.addEvent()

continued executing.

Stopping only the main update loop was not enough to freeze gameplay completely.

---

## Solution

A global state was introduced:

```js
this.scene.isMenuOpen
```

All gameplay systems now respect this state:

```js
if (this.scene.isMenuOpen) return;
```

Additionally:

* spawnEvent paused
* waveEvent paused

without disabling Phaser physics.

---

## Result

During upgrade selection:

* gameplay frozen
* enemies frozen
* drones frozen
* projectiles frozen
* waves frozen
* menu remains fully interactive

---

## Architectural Lesson

In modular architectures, pausing the entire engine can block UI components.

A global gameplay state provides better predictability and decoupling between gameplay and interface.

---

# EnemyPool Encapsulation Refactor

## Problem

EnemySystem was still accessing internal pool details directly:

```js
enemyPool.group.get(...)
enemyPool.group.countActive(...)
enemyPool.group.getChildren(...)
```

This created unnecessary coupling.

---

## Solution

EnemyPool now exposes:

```js
enemyPool.spawn(...)
enemyPool.countActive()
enemyPool.getChildren()
```

EnemySystem no longer depends on pool internals.

---

## Benefits

* reduced coupling
* improved encapsulation
* clearer ownership
* reusable architecture
* scalable framework design

---

## Current Flow

```txt
EnemySystem
    ↓
EnemyPool.spawn()
    ↓
EnemyPool.activate()
    ↓
Enemy Active
```

---

# Game Over UI Fix

## Problem

Game Over UI appeared partially off-screen depending on player position.

---

## Cause

HUD elements used camera world coordinates:

```js
camera.centerX
camera.centerY
```

These values move with the game world.

---

## Solution

UI now uses screen coordinates:

```js
const centerX = this.scene.scale.width / 2;
const centerY = this.scene.scale.height / 2;
```

instead of camera coordinates.

---

## Result

* Game Over always centered
* independent of player position
* UI fully decoupled from camera movement

---

## Architectural Lesson

Gameplay coordinates and UI coordinates should remain separated.

Mixing both concepts causes inconsistent behavior in games with moving cameras.

---

# Current Architecture State

## Combat

Status: Strong

Features:

* normal fire
* shotgun logic
* projectile scaling
* fire rate
* cooldowns
* visual feedback
* pooling integration

---

## Pooling

Status: Strong

Features:

* object activation
* object deactivation
* reusable bullets
* scalable projectile management
* centralized enemy pooling

Remaining work:

* EffectPool
* pooling metrics/debugging
* EnemyPool advanced abstractions

---

## Waves

Status: Stable

Features:

* wave progression
* spawn rate scaling
* speed scaling
* timers
* spawn throttling

Missing:

* elite pacing
* dynamic difficulty
* bosses
* event waves

---

## Upgrades

Status: Stable

Features:

* XP progression
* upgrade selection
* stat upgrades
* gameplay pause integration

---

## Enemy AI

Status: Functional

Features:

* chase behavior
* velocity steering
* despawn distance checks
* active distance optimization

Missing:

* states
* behaviors
* pathfinding
* formations
* flanking

---

# Current Architecture Quality

The framework now has:

* explicit enemy ownership
* centralized enemy pooling
* stable modular boot flow
* isolated system initialization
* resilient collision architecture
* safer inter-system dependencies
* centralized gameplay pause state
* UI independent from camera position

---

# Recent Improvements

Completed:

✓ Upgrade Menu Pause Architecture

✓ EnemyPool Encapsulation Refactor

✓ Game Over UI Stabilization

✓ Pool State Reset Improvements

Architecture quality continues to improve through ownership clarification, system decoupling and framework-oriented abstractions.

---

# Current Overall Evaluation

The project already demonstrates:

* scalable architecture
* modular gameplay systems
* reusable combat logic
* explicit pooling foundations
* framework-oriented organization
* commercial framework potential

The project is no longer in an experimental prototype stage.

It is transitioning into:

**Reusable Technical Product Infrastructure.**

Zombie Types Refactor

The zombie attribute system was migrated from scattered constants to a data-driven configuration model.

Before:

NORMAL_HEALTH
FAST_HEALTH
TANK_HEALTH
ELITE_HEALTH

FAST_SPEED_BONUS
TANK_SPEED_PENALTY
ELITE_SPEED_BONUS

After:

GameConfig.ZOMBIES.TYPES

Benefits:

- centralized configuration
- easier balancing
- simpler enemy creation
- reduced code duplication
- framework-oriented architecture

The EnemySystem now consumes configuration data instead of hardcoded enemy attributes.