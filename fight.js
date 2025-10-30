document.addEventListener("DOMContentLoaded", () => {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const hp1Fill = document.getElementById("hp1-fill");
    const hp2Fill = document.getElementById("hp2-fill");
    const countdown = document.getElementById("countdown");
    const bgMusic = document.getElementById("bgMusic");
  
    let arenaWidth = document.getElementById("arena").offsetWidth;
    let arenaHeight = document.getElementById("arena").offsetHeight;
  
    // posição inicial
    let p1 = { x: 200, y: 0, hp: 100 };
    let p2 = { x: 600, y: 0, hp: 100 };
  
    // movimento
    const keys = {};
    document.addEventListener("keydown", e => { keys[e.key] = true; });
    document.addEventListener("keyup", e => { keys[e.key] = false; });
  
    // contador inicial 3...2...1...FIGHT
    let counter = 3;
    countdown.textContent = counter;
    const interval = setInterval(() => {
      counter--;
      if (counter > 0) countdown.textContent = counter;
      else if (counter === 0) countdown.textContent = "FIGHT!";
      else {
        clearInterval(interval);
        countdown.style.display = "none";
        bgMusic.play();
        requestAnimationFrame(gameLoop);
      }
    }, 1000);
  
    function gameLoop() {
      // Movimentação P1 - WASD
      if (keys["w"] && p1.y < arenaHeight - 150) p1.y += 5;
      if (keys["s"] && p1.y > 0) p1.y -= 5;
      if (keys["a"] && p1.x > 0) p1.x -= 5;
      if (keys["d"] && p1.x < arenaWidth - 80) p1.x += 5;
  
      // Movimentação P2 - Setas
      if (keys["ArrowUp"] && p2.y < arenaHeight - 150) p2.y += 5;
      if (keys["ArrowDown"] && p2.y > 0) p2.y -= 5;
      if (keys["ArrowLeft"] && p2.x > 0) p2.x -= 5;
      if (keys["ArrowRight"] && p2.x < arenaWidth - 80) p2.x += 5;
  
      // Atualiza posições
      player1.style.left = p1.x + "px";
      player1.style.bottom = p1.y + "px";
      player2.style.left = p2.x + "px";
      player2.style.bottom = p2.y + "px";
  
      // Ataques básicos (tecla F para P1 e 1 para P2)
      if (keys["f"]) {
        // colide com P2?
        if (Math.abs(p1.x - p2.x) < 100 && Math.abs(p1.y - p2.y) < 120) {
          p2.hp -= 1;
          hp2Fill.style.width = p2.hp + "%";
        }
      }
      if (keys["1"]) {
        if (Math.abs(p2.x - p1.x) < 100 && Math.abs(p2.y - p1.y) < 120) {
          p1.hp -= 1;
          hp1Fill.style.width = p1.hp + "%";
        }
      }
  
      // verifica fim de luta
      if (p1.hp <= 0 || p2.hp <= 0) {
        bgMusic.pause();
        alert(p1.hp <= 0 ? "Player 2 VENCEU!" : "Player 1 VENCEU!");
        window.location.href = "iniciar.html"; // volta pro menu
        return;
      }
  
      requestAnimationFrame(gameLoop);
    }
  });
  
