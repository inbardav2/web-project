function joinChallenge(btn) {
    const card = btn.parentElement;
    card.classList.toggle("active");

    const name = card.querySelector("h3").textContent;
    let list = JSON.parse(localStorage.getItem("challenges")) || [];

    if (card.classList.contains("active")) {
        if (!list.includes(name)) list.push(name);
        document.getElementById("message").textContent = "Great choice! 🌱";
        document.getElementById("impact-link").classList.remove("hidden");
    } else {
        list = list.filter(c => c !== name);
        updateCounter();
    }

    localStorage.setItem("challenges", JSON.stringify(list));
}
function filterChallenges(type) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (type === "all" || card.dataset.type === type) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function updateCounter() {
    const selected = JSON.parse(localStorage.getItem("challenges")) || [];
    document.getElementById("counter").textContent = "Selected: " + selected.length;
}