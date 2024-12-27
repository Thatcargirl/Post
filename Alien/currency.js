/**
 * Initialize currency if it doesn't exist in localStorage.
 */
function initializeCurrency() {
    if (!localStorage.getItem('alienCurrency')) {
        localStorage.setItem('alienCurrency', 100); // Start with 100 tokens
    }
}

/**
 * Retrieve the current currency as a number.
 * @returns {number} - The current currency balance.
 */
function getCurrency() {
    return parseInt(localStorage.getItem('alienCurrency')) || 0;
}

/**
 * Update the currency by adding or subtracting an amount.
 * @param {number} amount - The amount to add or subtract.
 */
function updateCurrency(amount) {
    const currentCurrency = getCurrency();
    const newCurrency = currentCurrency + amount;
    localStorage.setItem('alienCurrency', newCurrency); // Save updated value
    updateCurrencyDisplay(); // Update display after change
}

function updateCurrencyDisplay() {
    const currencyAmountElement = document.getElementById('currencyAmount');
    if (currencyAmountElement) {
        const currentCurrency = getCurrency();
        currencyAmountElement.textContent = `${currentCurrency} Tokens`; // Ensure only one "Tokens"
    } else {
        console.error("Currency display element not found.");
    }
}


// Initialize currency when the page loads
initializeCurrency();