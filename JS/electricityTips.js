document.addEventListener("DOMContentLoaded", function() {
    // רפרנסים לאלמנטים מה-HTML
    let mainUse = document.getElementById("mainUse");
    let acWrap = document.getElementById("acHoursWrap");
    let hoursAc = document.getElementById("hoursAc");
    let feedback = document.getElementById("electricFeedback");
    let electricForm = document.getElementById("electricForm");
    let goGalleryElectric = document.getElementById("goGalleryElectric");
    let factElement = document.getElementById("dailyTipText");

    // 1. הגרלת עובדה יומית למילוי החלל הריק (בקטנה)
    let electricFacts = [
        "LED bulbs use 80% less energy than regular bulbs.",
        "Unplugging your phone charger can save 'phantom' energy waste.",
        "Setting your AC to 25°C is the most efficient cooling temperature.",
        "Cleaning your AC filters once a month improves efficiency by 15%."
    ];

    if (factElement) {
        let randomFact = electricFacts[Math.floor(Math.random() * electricFacts.length)];
        factElement.innerText = randomFact;
    }

    // 2. הסתרת שדה שעות המזגן בהתחלה
    if (acWrap) {
        acWrap.style.display = "none";
    }

    // 3. שינוי תצוגה לפי בחירה בדרופדאון
    if (mainUse) {
        mainUse.addEventListener("change", function() {
            let choice = this.value;

            // הסתרת הפידבק הישן כשמשנים בחירה
            feedback.style.display = "none";
            feedback.classList.remove("good", "bad");
            feedback.innerText = "";

            if (choice === "ac") {
                acWrap.style.display = "block";
            } else {
                acWrap.style.display = "none";
                hoursAc.value = "";
            }
        });
    }

    // 4. טיפול בהגשת הטופס (Mini Check)
    if (electricForm) {
        electricForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let choice = mainUse.value;
            let hours = Number(hoursAc.value);

            // ניקוי מצב קודם - המלבן ייעלם ויופיע מחדש רק עם התוצאה החדשה
            feedback.style.display = "none";
            feedback.classList.remove("good", "bad");

            // ולידציה 1: חובה לבחור אפשרות
            if (!choice) {
                feedback.innerText = "Please choose one option.";
                feedback.classList.add("bad");
                feedback.style.display = "block"; // הצגת המלבן עם הודעת השגיאה
                return;
            }

            // ולידציה 2: אם נבחר מזגן, שעות חייבות להיות 1-24
            if (choice === "ac") {
                if (isNaN(hours) || hours < 1 || hours > 24) {
                    feedback.innerText = "If you chose AC, enter hours between 1 and 24.";
                    feedback.classList.add("bad");
                    feedback.style.display = "block";
                    return;
                }
            }

            // המלצות מותאמות אישית
            let tips = {
                ac: "AC tip: keep a stable temperature + clean filters. Even 1°C higher can help.",
                waterheater: "Water heater tip: use a timer and heat only when needed.",
                lighting: "Lighting tip: switch to LED and turn off lights in empty rooms.",
                standby: "Standby tip: unplug chargers or use a power strip with a switch."
            };

            // הצגת התוצאה הסופית
            feedback.innerText = tips[choice];
            feedback.classList.add("good");
            feedback.style.display = "block"; // המלבן מופיע רק עכשיו
        });
    }

    // 5. מעבר לגלריה עם שמירת קטגוריה ב-localStorage
    if (goGalleryElectric) {
        goGalleryElectric.addEventListener("click", function() {
            localStorage.setItem("galleryCategory", "electricity");
            window.location.href = "gallery.html";
        });
    }
});