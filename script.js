document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const tutorialBtn = document.getElementById("tutorialBtn");
    const exitBtn = document.getElementById("exitBtn");
    const menuMusic = document.getElementById("menuMusic");
  
    // Música começa suave
    menuMusic.volume = 0.5;
  
    startBtn.addEventListener("click", () => {
        fadeOutMenu(() => {
          window.location.href = "iniciar.html";
        });
      });
      
  
    tutorialBtn.addEventListener("click", () => {
      alert("Entrando no modo tutorial (bot IA)...");
      // Depois aqui será a parte do tutorial
    });
  
    exitBtn.addEventListener("click", () => {
      fadeOutMenu(() => {
        window.close(); // só funciona em ambiente local
      });
    });
  
    function fadeOutMenu(callback) {
      document.querySelector(".menu-container").style.opacity = "0";
      setTimeout(() => {
        callback();
      }, 1000);
    }
  });
  
