document.addEventListener("DOMContentLoaded", () => {
    const arenas = document.querySelectorAll(".arena");
    const loadingScreen = document.getElementById("loadingScreen");
    const countdown = document.getElementById("countdown");
  
    arenas.forEach(arena => {
      arena.addEventListener("click", () => {
        const arenaName = arena.querySelector("span").textContent;
        startLoading(arenaName);
      });
    });
  
    function startLoading(arenaName) {
      document.getElementById("arenaSelect").style.display = "none";
      loadingScreen.style.display = "flex";
  
      let counter = 3;
      countdown.textContent = counter;
  
      const interval = setInterval(() => {
        counter--;
        if (counter > 0) {
          countdown.textContent = counter;
        } else if (counter === 0) {
          countdown.textContent = "FIGHT!";
        } else {
          clearInterval(interval);
          // redireciona para a tela de luta (próxima parte)
          window.location.href = "fight.html";
        }
      }, 1000);
    }
  });
  
