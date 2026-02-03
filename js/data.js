/**
 * Data loader for HR1 SNAP Work Requirements
 * Loads and exposes requirements data from JSON file
 */

let requirementsData = null;

// Load data on page load
async function loadData() {
    try {
        const response = await fetch('data/requirements.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        requirementsData = await response.json();
        console.log('Requirements data loaded successfully');

        // Dispatch custom event to notify other scripts
        const event = new CustomEvent('dataLoaded', { detail: requirementsData });
        document.dispatchEvent(event);

        return requirementsData;
    } catch (error) {
        console.error('Error loading requirements data:', error);
        // Fallback: show error message to user
        showDataError();
        return null;
    }
}

// Show error message if data fails to load
function showDataError() {
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'background-color: #fed7d7; color: #9b2c2c; padding: 1rem; margin: 1rem; border-radius: 8px; text-align: center;';
        errorDiv.innerHTML = '<strong>Error:</strong> Unable to load data. Please refresh the page or check your internet connection.';
        mainElement.insertBefore(errorDiv, mainElement.firstChild);
    }
}

// Getter function for other modules
function getData() {
    return requirementsData;
}

// Format numbers with commas
function formatNumber(num) {
    if (typeof num === 'string') {
        return num; // Already formatted (like "2.5 million")
    }
    return num.toLocaleString('en-US');
}

// Get human-readable date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);
