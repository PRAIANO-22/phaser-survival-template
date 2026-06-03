export default class BossSystem {
  constructor(scene) {
    this.scene = scene;
  }

  update() {
    const bosses = this.scene.bossPool.getChildren();

    for (const boss of bosses) {
      if (!boss.active) continue;

      const dx = this.scene.player.x - boss.x;

      const dy = this.scene.player.y - boss.y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        continue;
      }

      const vx = (dx / dist) * boss.speed;

      const vy = (dy / dist) * boss.speed;

      boss.setVelocity(vx, vy);

      boss.rotation = Math.atan2(dy, dx);
    }
  }
  pause() {
    const bosses = this.scene.bossPool.getChildren();

    for (const boss of bosses) {
      if (!boss.active) continue;

      boss.setVelocity(0, 0);
    }
  }
}
