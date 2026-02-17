// jQuery runs when DOM is ready
$(function () {
  // Element references
  const $mainUse = $("#mainUse");
  const $acWrap = $("#acHoursWrap");
  const $hoursAc = $("#hoursAc");
  const $feedback = $("#electricFeedback");

  // Hide AC hours initially
  $acWrap.hide();

  // When user changes the dropdown
  $mainUse.on("change", function () {
    const choice = $(this).val();

    // Clear previous feedback
    $feedback.text("").removeClass("good bad");

    // Show/Hide AC hours field
    if (choice === "ac") {
      $acWrap.slideDown(200);
    } else {
      $acWrap.slideUp(200);
      $hoursAc.val("");
    }
  });

  // On form submit
  $("#electricForm").on("submit", function (e) {
    e.preventDefault();

    const choice = $mainUse.val();
    const hours = Number($hoursAc.val());

    // Reset feedback style
    $feedback.removeClass("good bad");

    // Validation 1: must choose an option
    if (!choice) {
      $feedback.text("Please choose one option.").addClass("bad");
      return;
    }

    // Validation 2: if AC selected, hours must be 1-24
    if (choice === "ac") {
      if (Number.isNaN(hours) || hours < 1 || hours > 24) {
        $feedback
          .text("If you chose AC, enter hours between 1 and 24.")
          .addClass("bad");
        return;
      }
    }

    // Personalized recommendation
    const tips = {
      ac: "AC tip: keep a stable temperature + clean filters. Even 1°C higher can help.",
      waterheater: "Water heater tip: use a timer and heat only when needed.",
      lighting:
        "Lighting tip: switch to LED and turn off lights in empty rooms.",
      standby:
        "Standby tip: unplug chargers or use a power strip with a switch.",
    };

    $feedback.text(tips[choice]).addClass("good");
  });
  // Transfer data to Gallery (from Electricity page)
  $("#goGalleryElectric").on("click", function () {
    localStorage.setItem("galleryCategory", "electricity");
    window.location.href = "gallery.html"; // שניהם בתוך Includes
  });
});
