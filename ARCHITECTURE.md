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

## Scene Initialization Flow

GameScene

↓

EnemyPool

BossPool

XPOrbPool

↓

EnemySystem

BossSystem

WeaponSystem

WaveSystem

XPSystem

HealthSystem

↓

HUD

UpgradeMenu

---

## Update Flow

GameScene.update()

↓

InputSystem

↓

PlayerSystem

↓

EnemySystem

↓

BossSystem

↓

DroneSystem

↓

WeaponSystem

---

## Upgrade Flow

Enemy Death

↓

XP Orb Spawn

↓

XP Collection

↓

XPSystem

↓

Level Up

↓

UpgradeMenu

↓

Player Upgrade

---

## Boss Flow

WaveSystem

↓

BossSpawner

↓

BossPool

↓

BossSystem

↓

CollisionSystem

