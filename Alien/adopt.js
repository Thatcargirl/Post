let currentAlien;

/**
 * Retrieve the current currency from localStorage.
 * @returns {number} - The current currency balance.
 */
function getCurrency() {
    return parseInt(localStorage.getItem('alienCurrency')) || 0; // Ensure it's always a number
}

/**
 * Update the currency in localStorage and refresh the display.
 * @param {number} amount - The amount to add or subtract.
 */
function updateCurrency(amount) {
    const currentCurrency = getCurrency();
    const newCurrency = currentCurrency + amount;
    localStorage.setItem('alienCurrency', newCurrency); // Save as a number
    updateCurrencyDisplay(); // Refresh display
}

/**
 * Update the currency display on the page.
 */
function updateCurrencyDisplay() {
    const currencyAmountElement = document.getElementById('currencyAmount');
    if (currencyAmountElement) {
        const currentCurrency = getCurrency(); // Get current balance
        currencyAmountElement.textContent = `${currentCurrency} Tokens`; // Ensure only one "Tokens"
    } else {
        console.error("Currency display element not found.");
    }
}

/**
 * Generate a random alien for adoption.
 * @returns {Object} - A newly generated alien object.
 */
function generateAlien() {
    const colors = ['Green', 'Blue', 'Purple', 'Red', 'Yellow', 'Orange', 'Pink'];
    const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
    const ageCategories = ['Newborn', 'Young', 'Adult', 'Elder'];
    const names = ['Zog', 'Blip', 'Nox', 'Xel', 'Frogger', 'Zorak', 'Lume', 'Torp'];

    // Define a list of potential skills
    const skills = [
        "Excellent night vision.",
        "Can breathe underwater.",
        "Highly adaptable to different environments.",
        "Can sprint long distances.",
        "Telepathic communication."
    ];

    // Define a list of potential weaknesses
    const weaknesses = [
        "Weak against bright lights.",
        "Slow in cold temperatures.",
        "Hates loud noises.",
        "Cannot swim.",
        "Easily distracted by shiny objects."
    ];

    return {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        age: ageCategories[Math.floor(Math.random() * ageCategories.length)],
        power: Math.random() < 0.5 ? "Telepathy" : null, // 50% chance of having a power
        rarity: Math.random() < 0.2 ? "Rare" : "Common", // 20% chance of being rare
        xp: 0, // Initialize XP at 0
        level: 1, // Initialize level at 1
        aggressionLevel: {
            level: Math.floor(Math.random() * 5),
            description: ["Passive", "Neutral", "Aggressive", "Fierce", "Deadly"][Math.floor(Math.random() * 5)]
        },
        skill: skills[Math.floor(Math.random() * skills.length)], // Randomly assign a skill
        weakness: Math.random() < 0.15 ? weaknesses[Math.floor(Math.random() * weaknesses.length)] : null // 15% chance of having a weakness
    };
}

/**
 * Display a randomly generated alien for adoption.
 */
function displayAlien() {
    currentAlien = generateAlien(); // Generate a new alien

    const cost = 10; // Cost to adopt an alien

    const alienHtml = `
       <h2>Generated Alien</h2>
       Name: ${currentAlien.name}<br>
       Color: ${currentAlien.color}<br>
       Size: ${currentAlien.size}<br>
       Age: ${currentAlien.age}<br>
       Power: ${currentAlien.power ? currentAlien.power : "None"}<br>
       Rarity: ${currentAlien.rarity}<br>
       Aggression Level: ${currentAlien.aggressionLevel.description}<br>
       Skill: ${currentAlien.skill}<br> <!-- Display skill -->
       Weakness: ${currentAlien.weakness ? currentAlien.weakness : "None"}<br> <!-- Display weakness only if it exists -->
       
       <button onclick="adoptAlien()">Adopt Alien (Cost: ${cost} Tokens)</button>
   `;
    
   document.getElementById('alienDisplay').innerHTML = alienHtml;
}

/**
 * Adopt the currently displayed alien if the user has enough currency.
 */
function adoptAlien() {
    const cost = 10; // Cost to adopt an alien
    let currentCurrency = getCurrency(); // Get current currency

    if (currentCurrency >= cost) {
        updateCurrency(-cost); // Deduct cost from currency

        let aliens = JSON.parse(localStorage.getItem('aliens')) || [];
        aliens.push(currentAlien); // Add the current alien to the collection
        localStorage.setItem('aliens', JSON.stringify(aliens)); // Save updated aliens

        displayMessage(`Success! ${currentAlien.name} has been adopted and stored in your inventory.`, "green");
        updateCurrencyDisplay(); // Refresh balance after adoption
    } else {
        displayMessage("Not enough currency to adopt this alien!", "red");
    }
}

/**
 * Display a status message to the user.
 */
function displayMessage(message, color) {
    const messageDiv = document.getElementById('adoptionMessage');
    messageDiv.innerHTML = message;
    messageDiv.style.color = color;
}

/**
 * Initialize the page by displaying an alien and updating the currency display.
 */
window.onload = function () {
    displayAlien(); // Generate and display an alien on page load
    updateCurrencyDisplay(); // Show initial token balance
};