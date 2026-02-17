document.getElementById('ecoForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    let formData = new FormData(this);

    if (!validateForm(formData)) {
        return; 
    }

    let score = 100;
    let tips = [];

    let showerTime = parseInt(formData.get('shower_time'));
    if (showerTime > 10) {
        score -= 20;
        tips.push("Reducing your shower by just 2 minutes can save a lot of water!");
    }

    if (formData.get('brush_teeth') === 'no') {
        score -= 10;
        tips.push("Turning off the tap while brushing can save about 6 liters of water per minute.");
    }

    if (formData.get('ac_temp') === 'cold') {
        score -= 15;
        tips.push("Setting the AC to 25°C can reduce electricity consumption by around 5%.");
    }

    if (formData.get('light') === 'regular') {
        score -= 15;
        tips.push("LED bulbs use up to 80% less energy than regular bulbs.");
    }

    let transport = formData.get('transport');
    if (transport === 'car') {
        score -= 20;
        tips.push("Using public transport or cycling can significantly reduce your carbon footprint.");
    } else if (transport === 'bus') {
        score -= 5; 
        tips.push("Great job using public transport! Try combining it with walking or biking.");
    }

    if (formData.get('recycle') === 'no') {
        score -= 20;
        tips.push("Recycling plastic and paper greatly reduces environmental waste.");
    }


    score = Math.max(0, score);

    showResult(score, tips);

    formData.append('score', score);

    fetch('calc.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        console.log('PHP response:', data);
    });
});

function showResult(score, tips) {

    let container = document.getElementById('result-container');
    let statusH2 = document.getElementById('result-status');
    let scoreH3 = document.getElementById('result-score-display');
    let tipsUl = document.getElementById('tips-list');


    if (score >= 80) {
        statusH2.innerText = "Eco Hero! 🏆";
        statusH2.style.color = "green";
    } else if (score >= 50) {
        statusH2.innerText = "On the Green Path! 🌿";
        statusH2.style.color = "orange";
    } else {
        statusH2.innerText = "Room for Improvement 🌍";
        statusH2.style.color = "red";
    }

    scoreH3.innerText = "Score: " + score + "/100";
    tipsUl.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');

    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });
}


document.getElementById('ecoForm').addEventListener('reset', function() {
    document.getElementById('result-container').style.display = "none";
});

// Function to validate the form inputs before submitting to the server
function validateForm(formData) {
    let nameValue = formData.get('name').trim();

    // Ensure the name contains at least 2 characters 
    if (nameValue.length < 2) {
        alert("Name must contain at least 2 letters");
        return false;
    }

    // Use Regular Expression to allow only letters (Hebrew and English) and spaces
    let lettersOnly = /^[א-תa-zA-Z\s]+$/;
   if (!lettersOnly.test(nameValue)) {
        alert("Name must contain letters only");
        return false;
    }

    // Beyond 'required', this ensures a valid email structure is present
    let emailValue = formData.get('email').trim();
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        alert("Please enter a valid email address");
        return false;
    }

    // Ensures the shower time is realistic (between 1 and 60 minutes)
    let showerTime = parseInt(formData.get('shower_time'));
    if (isNaN(showerTime) || showerTime <= 0 || showerTime > 60) {
        alert("Shower time must be between 1 and 60 minutes");
        return false;
    }

    return true;
}