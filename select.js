document.addEventListener("DOMContentLoaded", () => {
    const characters = [
      { name: "Blaze Fang", symbol: "🔥", img: "https://i.imgur.com/2RzvLrK.png" },
      { name: "Frost Viper", symbol: "❄️", img: "https://i.imgur.com/IsjYzSO.png" },
      { name: "Thunder Wraith", symbol: "⚡", img: "https://i.imgur.com/zvJl6no.png" },
      { name: "Shadow Lotus", symbol: "🌀", img: "https://i.imgur.com/ewDd3AQ.png" },
      { name: "Dragon Pulse", symbol: "🐉", img: "https://i.imgur.com/5v4m0nb.png" },
      { name: "Iron Fist", symbol: "💥", img: "https://i.imgur.com/DqV33Pw.png" },
      { name: "Venom Kiss", symbol: "🎬", img: "https://i.imgur.com/VYbQFQZ.png" },
      { name: "Skull Razor", symbol: "🔪", img: "https://i.imgur.com/ZRjC9ta.png" },
      { name: "Jade Serpent", symbol: "💋", img: "https://i.imgur.com/VOByHn1.png" },
      { name: "Storm Hat", symbol: "👒", img: "https://i.imgur.com/XZMIj2W.png" },
      { name: "Titan Slam", symbol: "💪", img: "https://i.imgur.com/Vm7a95e.png" },
      { name: "Crystal Lizard", symbol: "🦎", img: "https://i.imgur.com/ebMKFeV.png" },
    ];
  
    const grid1 = document.getElementById("grid1");
    const grid2 = document.getElementById("grid2");
    const info1 = document.getElementById("info1");
    const info2 = document.getElementById("info2");
    const arenaBtn = document.getElementById("selectArenaBtn");
  
    let selectedP1 = null;
    let selectedP2 = null;
    let p1Locked = false;
  
    // Cria os grids
    characters.forEach((char, index) => {
      const el1 = createCharacterElement(char, index, 1);
      const el2 = createCharacterElement(char, index, 2);
      grid1.appendChild(el1);
      grid2.appendChild(el2);
    });
  
    function createCharacterElement(char, index, player) {
      const div = document.createElement("div");
      div.classList.add("character");
      div.innerHTML = `<img src="${char.img}" alt="${char.name}">
                       <span class="symbol">${char.symbol}</span>`;
      div.addEventListener("click", () => selectCharacter(char, player, div));
      return div;
    }
  
    function selectCharacter(char, player, element) {
      if (player === 1) {
        if (p1Locked) return; // já escolheu
        clearSelection(1);
        element.classList.add("selected");
        selectedP1 = char;
        info1.innerHTML = `<h3>${char.name}</h3>
                           <p>Movimento: WASD | Ataque: F | Poder: G</p>`;
        document.addEventListener("keydown", function enterLock(e) {
          if (e.key === "Enter") {
            p1Locked = true;
            info1.innerHTML += `<p style="color:red;">Personagem bloqueado!</p>`;
            document.removeEventListener("keydown", enterLock); // remove listener para não travar
          }
        });
      } else if (player === 2) {
        if (!p1Locked) return; // só libera após P1 escolher
        clearSelection(2);
        element.classList.add("selected");
        selectedP2 = char;
        info2.innerHTML = `<h3>${char.name}</h3>
                           <p>Movimento: ←↑↓→ | Ataque: 1 | Poder: 2</p>`;
      }
  
      // Habilita o botão apenas quando ambos selecionaram
      if (selectedP1 && selectedP2) {
        arenaBtn.disabled = false;
        arenaBtn.style.boxShadow = "0 0 25px #f5c518";
      }
    }
  
    function clearSelection(player) {
      const grid = player === 1 ? grid1 : grid2;
      grid.querySelectorAll(".character").forEach(c => c.classList.remove("selected"));
    }
  
    // 🔗 Redireciona para a Parte 3 (arena.html)
    arenaBtn.addEventListener("click", () => {
      if (selectedP1 && selectedP2) {
        // Aqui você pode adicionar um som ou animação antes
        window.location.href = "arena.html"; // vai para a seleção de arena
      }
    });
  });
  
