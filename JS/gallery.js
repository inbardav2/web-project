// שימוש ב-Vanilla JavaScript במקום jQuery
document.addEventListener("DOMContentLoaded", function() {
    // שליפת הקטגוריה מה-localStorage כפי שעשינו במעבר בין דפים
    let category = localStorage.getItem("galleryCategory");
    
    // השגת האלמנטים מה-HTML לפי ה-ID שלהם
    let waterGallery = document.getElementById("waterGallery");
    let electricGallery = document.getElementById("electricGallery");
    let galleryTitle = document.getElementById("galleryTitle");

    // לוגיקה להצגת הגלריה המתאימה
    if (category === "water") {
        if (waterGallery) waterGallery.style.display = "block";
        if (electricGallery) electricGallery.style.display = "none";
        if (galleryTitle) galleryTitle.innerText = "Water Saving Inspiration 💧";
    } 
    else if (category === "electricity") {
        if (electricGallery) electricGallery.style.display = "block";
        if (waterGallery) waterGallery.style.display = "none";
        if (galleryTitle) galleryTitle.innerText = "Electricity Saving Inspiration ⚡";
    }
    else {
        // אם הגיעו ישירות לגלריה ללא בחירה - נציג את הכל
        if (waterGallery) waterGallery.style.display = "block";
        if (electricGallery) electricGallery.style.display = "block";
        if (galleryTitle) galleryTitle.innerText = "Green Inspiration Gallery 🌍";
    }

    // אופציונלי: ניקוי הבחירה כדי לאפשר התחלה חדשה בביקור הבא
    localStorage.removeItem("galleryCategory");
});