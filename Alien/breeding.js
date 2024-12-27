function loadAliensForBreeding() {
    const aliens = JSON.parse(localStorage.getItem('aliens')) || [];
    const alienListElement = document.getElementById('alienList');

    if (aliens.length === 0) {
        alienListElement.innerHTML = 'No aliens available for breeding.';
        return;
    }

    // Display available aliens for breeding
    let alienHtml = '';
    
    aliens.forEach((alien, index) => {
        alienHtml += `
            <div class="alien-item">
                <input type="checkbox" id="alienCheckbox${index}" value="${index}">
                Name: ${alien.name}<br>
                Color: ${alien.color}<br>
                Size: ${alien.size}<br>
                Age: ${alien.age}<br>
                Rarity: ${alien.rarity}<br>
            </div>
        `;
    });

    alienListElement.innerHTML = alienHtml;
}

function breedAliens() {
    const selectedAliens = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    
    if (selectedAliens.length !== 2) {
        displayMessage("Please select exactly two aliens to breed.", "red");
        return;
    }

    const alienIndices = selectedAliens.map(checkbox => parseInt(checkbox.value));
    
    const aliens = JSON.parse(localStorage.getItem('aliens'));
    
    const parent1 = aliens[alienIndices[0]];
    const parent2 = aliens[alienIndices[1]];
    
    const offspring = generateOffspring(parent1, parent2);
    
    // Add the new alien to the collection
    aliens.push(offspring);
    localStorage.setItem('aliens', JSON.stringify(aliens));

    displayBreedingResult(offspring);
}

function generateOffspring(parent1, parent2) {
    return {
        id: Date.now(),
        name: `Offspring of ${parent1.name} and ${parent2.name}`,
        color: Math.random() < 0.5 ? parent1.color : parent2.color,
        size: Math.random() < 0.5 ? parent1.size : parent2.size,
        age: 'Newborn',
        power: Math.random() < 0.5 ? parent1.power : parent2.power,
        rarity: Math.random() < 0.5 ? parent1.rarity : parent2.rarity,
        xp: 0,
        level: 1,
        aggressionLevel: {
            level: Math.floor(Math.random() * 5),
            description: ["Passive", "Neutral", "Aggressive", "Fierce", "Deadly"][Math.floor(Math.random() * 5)]
        },
        skill: Math.random() < 0.5 ? parent1.skill : parent2.skill,
        weakness: Math.random() < 0.5 ? parent1.weakness : parent2.weakness
    };
}

function displayBreedingResult(offspring) {
    const resultElement = document.getElementById('breedingResult');
    
    resultElement.innerHTML = `
        <h2>New Offspring Created!</h2>
        Name: ${offspring.name}<br>
        Color: ${offspring.color}<br>
        Size: ${offspring.size}<br>
        Age: ${offspring.age}<br>
        Power: ${offspring.power ? offspring.power : "None"}<br>
        Rarity: ${offspring.rarity}<br>
        Aggression Level: ${offspring.aggressionLevel.description}<br>
        Skill: ${offspring.skill}<br> 
        Weakness: ${offspring.weakness ? offspring.weakness : "None"}<br> 
    `;
}

function displayMessage(message, color) {
   const messageDiv = document.getElementById('breedingResult');
   messageDiv.innerHTML = message;
   messageDiv.style.color = color;
}

// Load available aliens when the page is loaded
window.onload = loadAliensForBreeding;