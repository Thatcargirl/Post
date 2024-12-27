/**
 * Reset tokens to a specified value (default is 100).
 * @param {number} resetValue - The value to reset tokens to.
 */
function resetTokens(resetValue = 100) {
    localStorage.setItem('alienCurrency', resetValue); // Reset to specified amount
    updateCurrencyDisplay(); // Update display after reset
}

/**
 * Load bank functionality on page load.
 */
function loadBank() {
    updateCurrencyDisplay(); // Show current balance on load

    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => resetTokens(100));
    } else {
        console.error("Reset button not found.");
    }
}

// Call loadBank when the page loads
document.addEventListener('DOMContentLoaded', loadBank);