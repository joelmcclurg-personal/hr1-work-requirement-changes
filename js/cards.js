/**
 * Card expand/collapse interactions
 * Handles accordion-style card behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.change-card');

    cards.forEach(card => {
        const header = card.querySelector('.card-header');
        const content = card.querySelector('.card-content');

        if (!header || !content) return;

        // Handle click and Enter/Space key
        header.addEventListener('click', () => toggleCard(header, content));
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(header, content);
            }
        });
    });
});

function toggleCard(header, content) {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        // Collapse
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        content.style.maxHeight = '0';
    } else {
        // Expand
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        // Set max-height to scrollHeight for smooth animation
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Age calculator
document.addEventListener('DOMContentLoaded', () => {
    const ageInput = document.getElementById('age-input');
    const ageCheckBtn = document.getElementById('age-check-btn');
    const ageResult = document.getElementById('age-result');

    if (ageCheckBtn && ageInput && ageResult) {
        ageCheckBtn.addEventListener('click', () => {
            const age = parseInt(ageInput.value);

            if (isNaN(age) || age < 0 || age > 120) {
                ageResult.textContent = 'Please enter a valid age.';
                ageResult.className = 'result-text show maybe';
                return;
            }

            if (age < 18) {
                ageResult.textContent = 'Under 18: Work requirements do not apply to you.';
                ageResult.className = 'result-text show not-affected';
            } else if (age >= 18 && age <= 54) {
                ageResult.textContent = `Age ${age}: You were already subject to work requirements before HR1, and remain subject to them.`;
                ageResult.className = 'result-text show affected';
            } else if (age >= 55 && age <= 64) {
                ageResult.textContent = `Age ${age}: You are NEWLY subject to work requirements under HR1. Before July 2025, you were exempt due to age.`;
                ageResult.className = 'result-text show affected';
            } else {
                ageResult.textContent = `Age ${age}: Work requirements do not apply to you (over 64).`;
                ageResult.className = 'result-text show not-affected';
            }
        });

        // Allow Enter key in input
        ageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                ageCheckBtn.click();
            }
        });
    }
});

// Children's age calculator
document.addEventListener('DOMContentLoaded', () => {
    const childrenInput = document.getElementById('children-input');
    const childrenCheckBtn = document.getElementById('children-check-btn');
    const childrenResult = document.getElementById('children-result');

    if (childrenCheckBtn && childrenInput && childrenResult) {
        childrenCheckBtn.addEventListener('click', () => {
            const age = parseInt(childrenInput.value);

            if (isNaN(age) || age < 0 || age > 20) {
                childrenResult.textContent = 'Please enter a valid age.';
                childrenResult.className = 'result-text show maybe';
                return;
            }

            if (age < 14) {
                childrenResult.textContent = `Child under 14: You remain exempt from work requirements (both before and after HR1).`;
                childrenResult.className = 'result-text show not-affected';
            } else if (age >= 14 && age < 18) {
                childrenResult.textContent = `Child age ${age}: You are NEWLY subject to work requirements under HR1. Before July 2025, parents with children under 18 were exempt.`;
                childrenResult.className = 'result-text show affected';
            } else {
                childrenResult.textContent = `Child age ${age}: Having a child 18 or older did not provide exemption before or after HR1. You may qualify for other exemptions.`;
                childrenResult.className = 'result-text show maybe';
            }
        });

        // Allow Enter key in input
        childrenInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                childrenCheckBtn.click();
            }
        });
    }
});
