document.addEventListener("DOMContentLoaded", function() {
    let waterTips = [
        "Close the tap while brushing your teeth.",
        "Shorten your shower by 2 minutes.",
        "Run the washing machine only when it’s full.",
        "Check for leaks (a small drip adds up)."
    ];

    let waterTipBtn = document.getElementById("waterTipBtn");
    let waterTipFeedback = document.getElementById("waterTipFeedback");

    // 1. טיפ אקראי
    if (waterTipBtn && waterTipFeedback) {
        
        waterTipBtn.addEventListener("click", function() {
            let idx = Math.floor(Math.random() * waterTips.length);
            
            waterTipFeedback.classList.remove("bad");
            waterTipFeedback.innerText = waterTips[idx];
            waterTipFeedback.classList.add("good");
        });
    }

    let waterMiniForm = document.getElementById("waterMiniForm");
    let showerMinutes = document.getElementById("showerMinutes");
    let tapHabit = document.getElementById("tapHabit");
    let waterMiniFeedback = document.getElementById("waterMiniFeedback");

    // 2. מיני-מחשבון מים
    if (waterMiniForm) {

        waterMiniForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let minutes = Number(showerMinutes.value);
            let habit = tapHabit.value;

            waterMiniFeedback.classList.remove("good", "bad");

            if (isNaN(minutes) || minutes < 3 || minutes > 30) {
                waterMiniFeedback.innerText = "Please enter shower time between 3 and 30 minutes.";
                waterMiniFeedback.classList.add("bad");
                return;
            }

            let msg = "";
            if (minutes <= 6 && habit === "yes") {
                msg = "Great! Your habits are already very water-friendly 💧";
            } else if (minutes > 6 && habit === "no") {
                msg = "Start with two changes: reduce shower time + close the tap while brushing.";
            } else {
                msg = "Nice! Improve one step: reduce shower time OR close the tap more consistently.";
            }

            waterMiniFeedback.innerText = msg;
            waterMiniFeedback.classList.add("good");
            // גם פה המלבן יופיע לבד בזכות ה-CSS
        });
    }

    // 3. מעבר לגלריה
    let goGalleryWater = document.getElementById("goGalleryWater");
    if (goGalleryWater) {
        goGalleryWater.addEventListener("click", function() {
            localStorage.setItem("galleryCategory", "water");
            window.location.href = "gallery.html";
        });
    }
});