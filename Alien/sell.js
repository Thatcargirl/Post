function loadAliens() {
    const aliens = JSON.parse(localStorage.getItem('aliens')) || [];
    const alienListElement = document.getElementById('alienList');

    if (aliens.length === 0) {
        alienListElement.innerHTML = 'No aliens in your collection.';
        return;
    }

    let alienHtml = '';
    aliens.forEach((alien, index) => {
        alienHtml += `
            <div class="alien-item">
                <h3><input type="checkbox" id="alien${index}" class="alien-checkbox"> ${alien.name}</h3>
                Color: ${alien.color}<br>
                Size: ${alien.size}<br>
                Age: ${alien.age}<br>
                Power: ${alien.power ? alien.power : "None"}<br> <!-- Handle null power -->
                Rarity: ${alien.rarity}<br>
                Skill: ${alien.skill}<br>
            </div>
        `;
    });

    alienListElement.innerHTML = alienHtml;
}

function sellSelectedAliens() {
    let aliens = JSON.parse(localStorage.getItem('aliens')) || [];
    const checkboxes = document.querySelectorAll('.alien-checkbox:checked');

    // Get indices of selected aliens to remove
    const indicesToRemove = Array.from(checkboxes)
        .map(cb => parseInt(cb.id.replace('alien', '')))
        .sort((a, b) => b - a);

    if (indicesToRemove.length === 0) {
        displayMessage("No aliens selected for sale.", "red");
        return;
    }

    const earningsPerAlien = 10; // Minimum earnings per alien sold
    const totalEarnings = indicesToRemove.length * earningsPerAlien;

    // Remove selected aliens from the array
    indicesToRemove.forEach(index => {
        aliens.splice(index, 1);
    });

    localStorage.setItem('aliens', JSON.stringify(aliens)); // Update local storage

    updateCurrency(totalEarnings); // Add earnings to currency
    displayMessage(`${indicesToRemove.length} alien(s) have been sold! You earned ${totalEarnings} Tokens.`, "green");

    loadAliens(); // Reload the list of aliens after selling
}

function sellAllAliens() {
    let aliens = JSON.parse(localStorage.getItem('aliens')) || [];

    if (aliens.length === 0) {
        displayMessage("No aliens to sell.", "red");
        return;
    }

    const earningsPerAlien = 10; // Minimum earnings per alien sold
    const totalEarnings = aliens.length * earningsPerAlien;

    localStorage.setItem('aliens', JSON.stringify([])); // Clear all aliens
    updateCurrency(totalEarnings); // Add earnings to currency

    displayMessage(`All aliens have been sold! You earned ${totalEarnings} Tokens.`, "green");
    
    loadAliens(); // Reload the list of aliens after selling
}

function displayMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
    messageDiv.style.color = color;
}

// Ensure the page loads with the current list of aliens and token balance
window.onload = function () {
   loadAliens(); // Load all available aliens for sale
   updateCurrencyDisplay(); // Update token balance display
};