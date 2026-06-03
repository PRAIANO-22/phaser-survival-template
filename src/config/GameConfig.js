const GameConfig = {
  PLAYER: {
    SPEED: 250,
    MAX_HEALTH: 100,
    INVULNERABLE_TIME: 250,
    DASH_SPEED: 450,
    DASH_DURATION: 180,
  },
  WEAPON: {
    FIRE_RATE: 300,
    BULLET_SCALE: 1,
    MULTI_SHOT: 1,
    BULLET_SPEED: 600,
    BULLET_DAMAGE: 1,
    BULLET_LIFETIME: 1200,
    SHOTGUN_FIRE_RATE: 550,
    SHOTGUN_DAMAGE: 2,
  },
  WAVES: {
    START_WAVE: 1,
    START_ZOMBIE_SPEED: 100,
    START_SPAWN_RATE: 2000,
    MIN_SPAWN_RATE: 600,
    WAVE_INTERVAL: 30000,
    SPEED_INCREASE: 10,
    SPAWN_REDUCTION: 100,
  },
  ZOMBIES: {
    MAX_ZOMBIES: 120,
    SPAWN_DISTANCE: 900,
    DESPAWN_DISTANCE: 1800,
    ACTIVE_DISTANCE: 1200,
    ELITE_CHANCE: 0.08,
    FAST_CHANCE: 0.14,
    TANK_CHANCE: 0.05,

    TYPES: {
      NORMAL: {
        health: 3,
        speedBonus: 0,
        xp: 1,
        scale: 1,
        tint: null,
      },

      FAST: {
        health: 2,
        speedBonus: 45,
        xp: 2,
        scale: 0.7,
        tint: 0xffff00,
      },

      TANK: {
        health: 14,
        speedBonus: -30,
        xp: 6,
        scale: 1.6,
        tint: 0x00ffff,
      },

      ELITE: {
        health: 8,
        speedBonus: 20,
        xp: 5,
        scale: 1,
        tint: 0xaa00ff,
      },
    },
  
    SPAWN_TABLE: [
      {
        chance: 8,
        type: "ELITE",
      },

      {
        chance: 27,
        type: "FAST",
      },

      {
        chance: 20,
        type: "TANK",
      },

      {
        chance: 45,
        type: "NORMAL",
      },
    ],
  },
 
    BOSSES: {
  TANK_BOSS: {
    health: 500,
    speed: 60,
    damage: 20,
    xp: 100,
    scale: 1,
    tint: 0xff00ff,
  },
},

  XP: {
    START_LEVEL: 1,
    START_XP: 0,
    START_NEXT_LEVEL_XP: 5,
    XP_PER_LEVEL: 5,
  },
  WORLD: {
    WIDTH: 2400,
    HEIGHT: 2400,
    GRID_SIZE: 40,
  },
  CAMERA: {
    SHAKE_DURATION: 80,
    SHAKE_INTENSITY: 0.003,
  },
};

export default GameConfig;
