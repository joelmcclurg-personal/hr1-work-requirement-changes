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

// Map card IDs to their D3 re-render functions
const cardVizRenderers = {
    'card-age': () => createAgeVisualization(getData()),
    'card-parents': () => createParentVisualization(getData()),
    'card-exemptions': () => createExemptionsTable(getData()),
};

// Share card as PNG image
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-card-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation(); // Prevent card from expanding

            if (button.classList.contains('sharing')) return; // Prevent double-click
            button.classList.add('sharing');

            const cardId = button.getAttribute('data-card-id');
            const cardElement = document.getElementById(cardId);
            const cardTitle = cardElement.querySelector('.card-title')?.textContent
                || cardElement.querySelector('h3')?.textContent
                || 'SNAP Work Requirements';

            const shareUrl = `${window.location.origin}${window.location.pathname}#${cardId}`;

            // Determine if card is an accordion and whether it's collapsed
            const header = cardElement.querySelector('.card-header');
            const content = cardElement.querySelector('.card-content');
            const isAccordion = !!(header && content);
            const wasCollapsed = isAccordion && header.getAttribute('aria-expanded') !== 'true';

            // Add watermark element if not already present
            if (!cardElement.querySelector('.capture-watermark')) {
                const watermark = document.createElement('div');
                watermark.className = 'capture-watermark';
                watermark.textContent = 'SNAP Work Requirements | H.R. 1 Visual Explainer';
                cardElement.appendChild(watermark);
            }

            try {
                // If collapsed, expand silently (no animation) for capture
                if (wasCollapsed) {
                    content.style.transition = 'none';
                    header.setAttribute('aria-expanded', 'true');
                    content.setAttribute('aria-hidden', 'false');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    // Force reflow so styles apply immediately
                    content.offsetHeight;

                    // Re-render D3 visualization at the correct width
                    if (cardVizRenderers[cardId]) {
                        cardVizRenderers[cardId]();
                    }
                }

                // Wait for rendering to settle
                await new Promise(r => setTimeout(r, 150));

                // Hide UI chrome during capture
                cardElement.classList.add('capturing-card');

                // Capture the card as a PNG
                const canvas = await html2canvas(cardElement, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    scrollY: -window.scrollY,
                    useCORS: true,
                });

                // Convert canvas to blob
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                const fileName = `snap-${cardId.replace('card-', '')}.png`;
                const file = new File([blob], fileName, { type: 'image/png' });

                // Try Web Share API with file (mobile)
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: `SNAP Work Requirements: ${cardTitle}`,
                            files: [file],
                            url: shareUrl,
                        });
                    } catch (err) {
                        if (err.name !== 'AbortError') {
                            downloadBlob(blob, fileName);
                            showToast('Image downloaded!');
                        }
                    }
                } else {
                    // Desktop fallback: download image + copy link
                    downloadBlob(blob, fileName);
                    try {
                        await navigator.clipboard.writeText(shareUrl);
                        showToast('Image downloaded & link copied!');
                    } catch {
                        showToast('Image downloaded!');
                    }
                }
            } catch (err) {
                console.error('Card capture failed:', err);
                showToast('Share failed — try again');
            } finally {
                // Restore card state
                cardElement.classList.remove('capturing-card');
                button.classList.remove('sharing');

                if (wasCollapsed) {
                    header.setAttribute('aria-expanded', 'false');
                    content.setAttribute('aria-hidden', 'true');
                    content.style.maxHeight = '0';
                    // Restore transition after a tick
                    requestAnimationFrame(() => {
                        content.style.transition = '';
                    });
                }
            }
        });
    });
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
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
