# Upgrade Menu Pause Fix

## Problema

O jogo continuava rodando durante o menu de upgrade.

Tentativas usando:
- physics.world.pause()
- scene.pause()
- body.moves = false

causavam travamento do input do menu.

Os botões ficavam impossíveis de clicar.

---

## Causa

O projeto possui múltiplos systems independentes:
- EnemySystem
- DroneSystem
- WeaponSystem
- SkillSystem

Além de:
- delayedCall()
- time.addEvent()

Parar apenas o update principal não congelava o gameplay completamente.

---

## Solução

Foi implementado um controle global usando:

```js
this.scene.isMenuOpen

Cada system agora respeita esse estado.

Exemplo:

if (this.scene.isMenuOpen) return;

Também foram pausados:

spawnEvent
waveEvent

Sem pausar a physics engine inteira.

Resultado

Durante o menu de upgrade:

gameplay congela
inimigos param
drone para
tiros param
waves param
menu continua clicável

---

