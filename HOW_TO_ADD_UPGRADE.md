# How To Add A New Upgrade

## Step 1

Open the upgrade configuration file.

Locate where upgrades are registered.

---

## Step 2

Add a new upgrade object.

Example:

```js
{
  name: "Critical Chance",
  effect: () => {
    this.scene.playerCritChance += 10;
  }
}
```

---

## Step 3

Add the upgrade to the available upgrade list.

---

## Step 4

Run the game.

The upgrade will automatically appear in the upgrade selection menu when chosen by the system.

---

## Notes

Upgrade effects can modify:

* Player stats
* Weapon stats
* Skill stats
* Drone behavior
* Future systems

## Upgrade Location

Open:

src/upgrades/XPSystem.js

Upgrades are currently defined inside:

levelUp()

---

## Existing Upgrades

* ATTACK SPEED
* MOVE SPEED
* MULTI SHOT
* BULLET SIZE
* MAX HEALTH
* SHOTGUN BUILD
* AUTO DRONE

---

## Example Upgrade

```js
{
  name: "MOVE SPEED",
  effect: () => {
    this.scene.playerSpeed += 40;
  }
}
```

---

## Upgrade Structure

Each upgrade contains:

```js
{
  name: "Upgrade Name",
  effect: () => {
    // Upgrade logic
  }
}
```

---

## Notes

New upgrades can modify:

* Player attributes
* Weapon attributes
* Health values
* Drone behavior

The UpgradeMenu automatically displays any upgrades provided by XPSystem.

