document.addEventListener("DOMContentLoaded", () => {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const hp1Fill = document.getElementById("hp1-fill");
    const hp2Fill = document.getElementById("hp2-fill");
    const name1 = document.getElementById("name1");
    const name2 = document.getElementById("name2");
    const countdown = document.getElementById("countdown");
    const bgMusic = document.getElementById("bgMusic");
    const arena = document.getElementById("arena");

    const arenaWidth = arena.offsetWidth;
    const arenaHeight = arena.offsetHeight;

    const selectedP1 = JSON.parse(localStorage.getItem("player1"));
    const selectedP2 = JSON.parse(localStorage.getItem("player2"));

    if (selectedP1) {
        player1.style.backgroundImage = `url('${selectedP1.img}')`;
        name1.textContent = selectedP1.name;
    }
    if (selectedP2) {
        player2.style.backgroundImage = `url('${selectedP2.img}')`;
        name2.textContent = selectedP2.name;
    }

    player1.style.backgroundSize = "cover";
    player1.style.backgroundPosition = "center";
    player2.style.backgroundSize = "cover";
    player2.style.backgroundPosition = "center";

    let p1 = { x: 200, y: 0, hp: 100 };
    let p2 = { x: 600, y: 0, hp: 100 };

    const keys = {};
    document.addEventListener("keydown", e => { keys[e.key] = true; });
    document.addEventListener("keyup", e => { keys[e.key] = false; });

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

    function attack(attacker, target) {
        // ataque básico só funciona se estiver próximo
        if (Math.abs(attacker.x - target.x) < 100 && Math.abs(attacker.y - target.y) < 150) {
            target.hp = Math.max(target.hp - 5, 0);

            if (target === p1) hp1Fill.style.width = target.hp + "%";
            else hp2Fill.style.width = target.hp + "%";
        }
    }

    function gameLoop() {
        // movimento
        if (keys["w"] && p1.y < arenaHeight - 150) p1.y += 5;
        if (keys["s"] && p1.y > 0) p1.y -= 5;
        if (keys["a"] && p1.x > 0) p1.x -= 5;
        if (keys["d"] && p1.x < arenaWidth - 80) p1.x += 5;

        if (keys["ArrowUp"] && p2.y < arenaHeight - 150) p2.y += 5;
        if (keys["ArrowDown"] && p2.y > 0) p2.y -= 5;
        if (keys["ArrowLeft"] && p2.x > 0) p2.x -= 5;
        if (keys["ArrowRight"] && p2.x < arenaWidth - 80) p2.x += 5;

        player1.style.left = p1.x + "px";
        player1.style.bottom = p1.y + "px";
        player2.style.left = p2.x + "px";
        player2.style.bottom = p2.y + "px";

        // ataques básicos
        if (keys["f"]) attack(p1, p2);
        if (keys["1"]) attack(p2, p1);

        // fim de luta
        if (p1.hp <= 0 || p2.hp <= 0) {
            bgMusic.pause();
            alert(p1.hp <= 0 ? `Player 2 (${selectedP2.name}) VENCEU!` : `Player 1 (${selectedP1.name}) VENCEU!`);
            window.location.href = "menu.html";
            return;
        }

        requestAnimationFrame(gameLoop);
    }
});
