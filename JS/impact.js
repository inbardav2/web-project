function calculateImpact() {
    const list = JSON.parse(localStorage.getItem("challenges")) || [];

    let water = 0, co2 = 0, plastic = 0;

    list.forEach(c => {
        if (c === "No Plastic Day") plastic += 10;
        if (c === "Bike to Work") co2 += 20;
        if (c === "Reusable Cup") water += 15;
    });

    document.getElementById("water").textContent = water;
    document.getElementById("co2").textContent = co2;
    document.getElementById("plastic").textContent = plastic;
}

function resetImpact() {
    // מוחק את האתגרים
    localStorage.removeItem("challenges");

    // מאפס מספרים
    document.getElementById("water").textContent = 0;
    document.getElementById("co2").textContent = 0;
    document.getElementById("plastic").textContent = 0;

    // מאפס רשימה
    const ul = document.getElementById("list");
    if (ul) ul.innerHTML = "";

    // מאפס progress bar
    const progress = document.getElementById("progress");
    if (progress) progress.style.width = "0%";

    // מאפס הודעה
    const status = document.getElementById("status");
    if (status) status.textContent = "Start a challenge 🌱";
}
function showSelected() {
    const list = JSON.parse(localStorage.getItem("challenges")) || [];
    const ul = document.getElementById("list");

    ul.innerHTML = "";

    list.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        ul.appendChild(li);
    });
}

function updateProgress() {
    const list = JSON.parse(localStorage.getItem("challenges")) || [];

    const progress = document.getElementById("progress");
    const status = document.getElementById("status");

    let percent = list.length * 30;
    if (percent > 100) percent = 100;

    progress.style.width = percent + "%";

    if (percent === 0) {
        status.textContent = "Start a challenge 🌱";
    } else if (percent < 60) {
        status.textContent = "Good start, keep going!";
    } else {
        status.textContent = "Amazing impact! 🌍🔥";
    }
}
document.getElementById("score").textContent = "Score: " + (percent);