/**
 * Card expand/collapse interactions
 * Handles accordion-style card behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    setupCardInteractions();
    setupShareButtons();
    handleHashNavigation();
});

// Listen for hash changes for direct card links
window.addEventListener('hashchange', handleHashNavigation);

function setupCardInteractions() {
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
}

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

// Share card functionality
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-card-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation(); // Prevent card from expanding

            const cardId = button.getAttribute('data-card-id');
            const cardElement = document.getElementById(cardId);
            const cardTitle = cardElement.querySelector('.card-title')?.textContent
                || cardElement.querySelector('h3')?.textContent
                || 'SNAP Work Requirements';
            const cardSummary = cardElement.querySelector('.card-summary')?.textContent
                || cardElement.querySelector('p')?.textContent
                || '';

            const shareData = {
                title: `SNAP Work Requirements: ${cardTitle}`,
                text: `${cardSummary} - Learn more about H.R. 1 changes to SNAP work requirements.`,
                url: `${window.location.origin}${window.location.pathname}#${cardId}`
            };

            // Check if Web Share API is available (mobile devices)
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // User cancelled or error occurred
                    if (err.name !== 'AbortError') {
                        fallbackCopyLink(shareData.url);
                    }
                }
            } else {
                // Fallback: Copy link to clipboard
                fallbackCopyLink(shareData.url);
            }
        });
    });
}

function fallbackCopyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        // Show brief "Copied!" message
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Link copied to clipboard!';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy link:', err);
        alert(`Share this link: ${url}`);
    });
}

// Support direct links to cards via hash anchors
function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#card-')) {
        const cardId = hash.substring(1);
        const card = document.getElementById(cardId);
        if (card) {
            // Expand the card if it has expandable content (change-card)
            const cardHeader = card.querySelector('.card-header');
            const cardContent = card.querySelector('.card-content');
            if (cardHeader && cardContent) {
                cardHeader.setAttribute('aria-expanded', 'true');
                cardContent.setAttribute('aria-hidden', 'false');
                cardContent.style.maxHeight = cardContent.scrollHeight + 'px';
            }

            // Scroll to card with offset for header
            setTimeout(() => {
                const headerOffset = 80;
                const cardPosition = card.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: cardPosition - headerOffset,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}
