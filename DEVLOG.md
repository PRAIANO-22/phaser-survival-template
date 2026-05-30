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

EnemyPool Refactor

Antes

EnemySystem acessava:
- enemyPool.group.get()
- enemyPool.group.countActive()

Depois

EnemySystem usa:
- enemyPool.spawn()
- enemyPool.countActive()
- enemyPool.getChildren()

Benefícios

- menor acoplamento
- melhor encapsulamento
- arquitetura mais reutilizável
- framework mais escalável

Game Over UI Fix

Problema

Game Over aparecia parcialmente fora da tela
dependendo da posição da câmera

Causa

Uso de:
camera.centerX
camera.centerY

em elementos de HUD.

Solução

Uso de:
scale.width / 2
scale.height / 2
para posicionamento de UI fixa.

Resultado

Game Over sempre centralizado
independente da posição do jogador