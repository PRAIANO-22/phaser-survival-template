# Architecture Overview

## High Level Structure

GameScene

↓

Systems

↓

Pools

↓

UI

---

## Systems

### Combat

WeaponSystem

CollisionSystem

### Core

PlayerSystem

HealthSystem

InputSystem

TweenManager

### Progression

XPSystem

SkillSystem

WaveSystem

### Enemies

EnemySystem

BossSystem

---

## Pools

EnemyPool

BossPool

XPOrbPool

---

## UI

HUD

UpgradeMenu

---

## Gameplay Flow

WaveSystem

↓

EnemySystem

↓

CollisionSystem

↓

XPSystem

↓

UpgradeMenu

↓

Player Progression
