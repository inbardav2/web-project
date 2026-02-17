document.addEventListener("DOMContentLoaded", () => {
  const category = localStorage.getItem("galleryCategory");
  const waterGallery = document.getElementById("waterGallery");
  const electricGallery = document.getElementById("electricGallery");
  const title = document.getElementById("galleryTitle");

  if (category === "water") {
    title.textContent = "Showing inspiration based on: Saving Water 💧";
    waterGallery.style.display = "block";
    electricGallery.style.display = "none";
  } else if (category === "electricity") {
    title.textContent = "Showing inspiration based on: Saving Electricity ⚡";
    electricGallery.style.display = "block";
    waterGallery.style.display = "none";
  } else {
    // אם הגיעו מדף הבית - נציג את שניהם כהשראה כללית
    waterGallery.style.display = "block";
    electricGallery.style.display = "block";
  }
  
  // ניקוי הבחירה כדי שבפעם הבאה המשתמש יצטרך לבחור שוב
  localStorage.removeItem("galleryCategory");
});







$(function () {
    // אירוע לחיצה על תמונה בגלריה [cite: 1135]
    $('.gallery-item img').on('click', function() {
        const imgSrc = $(this).attr('src'); 
        
        // חיפוש הפסקה המוסתרת שנמצאת בתוך אותו 'figure' של התמונה [cite: 1138]
        const longDescription = $(this).siblings('.hidden-tip').text(); 

        $('#img01').attr('src', imgSrc);
        
        // כתיבת הטקסט המפורט לתוך אלמנט התיאור במודאל [cite: 1136]
        $('#caption').text(longDescription); 
        
        // הצגה חלקה של החלון כפידבק למשתמש [cite: 1112, 1159]
        $('#imageModal').css('display', 'flex').hide().fadeIn(400);
    });

    // סגירת החלון
    $('.close, #imageModal').on('click', function() {
        $('#imageModal').fadeOut(300);
    });
});
