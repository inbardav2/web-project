document.addEventListener("DOMContentLoaded", () => {
  const waterTips = [
    "Close the tap while brushing your teeth.",
    "Shorten your shower by 2 minutes.",
    "Run the washing machine only when it’s full.",
    "Check for leaks (a small drip adds up).",
  ];

  const waterTipBtn = document.getElementById("waterTipBtn");
  const waterTipFeedback = document.getElementById("waterTipFeedback");

  if (waterTipBtn && waterTipFeedback) {
    waterTipBtn.addEventListener("click", () => {
      const idx = Math.floor(Math.random() * waterTips.length);
      waterTipFeedback.textContent = waterTips[idx];

      // עיצוב דינמי באמצעות class
      waterTipFeedback.classList.remove("bad");
      waterTipFeedback.classList.add("good");
    });
  }

  const waterMiniForm = document.getElementById("waterMiniForm");
  const showerMinutes = document.getElementById("showerMinutes");
  const tapHabit = document.getElementById("tapHabit");
  const waterMiniFeedback = document.getElementById("waterMiniFeedback");

  if (waterMiniForm && showerMinutes && tapHabit && waterMiniFeedback) {
    waterMiniForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const minutes = Number(showerMinutes.value);
      const habit = tapHabit.value;

      waterMiniFeedback.classList.remove("good", "bad");

      // ולידציה: דקות בין 3 ל-30 (לא רק "שדה חובה")
      if (Number.isNaN(minutes) || minutes < 3 || minutes > 30) {
        waterMiniFeedback.textContent =
          "Please enter shower time between 3 and 30 minutes.";
        waterMiniFeedback.classList.add("bad");
        return;
      }

      // ולידציה: בחירה אחת משלוש אפשרויות מוגדרות
      if (habit !== "yes" && habit !== "sometimes" && habit !== "no") {
        waterMiniFeedback.textContent =
          "Please choose an option about the tap habit.";
        waterMiniFeedback.classList.add("bad");
        return;
      }

      let msg = "";

      if (minutes <= 6 && habit === "yes") {
        msg = "Great! Your habits are already very water-friendly 💧";
      } else if (minutes > 6 && habit === "no") {
        msg =
          "Start with two changes: reduce shower time + close the tap while brushing.";
      } else {
        msg =
          "Nice! Improve one step: reduce shower time OR close the tap more consistently.";
      }

      waterMiniFeedback.textContent = msg;
      waterMiniFeedback.classList.add("good");
    });
  }

  // Transfer data to Gallery (from Water page)
  const goGalleryWater = document.getElementById("goGalleryWater");
  if (goGalleryWater) {
    goGalleryWater.addEventListener("click", () => {
      localStorage.setItem("galleryCategory", "water");
      window.location.href = "gallery.html";
    });
  }
});
