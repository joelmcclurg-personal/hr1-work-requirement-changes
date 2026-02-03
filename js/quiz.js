/**
 * "Am I Affected?" Quiz
 * Decision tree to help users determine if they're affected by new work requirements
 */

const quizQuestions = [
    {
        id: 'snap_recipient',
        question: 'Do you currently receive SNAP benefits?',
        options: [
            { value: 'yes', text: 'Yes, I receive SNAP' },
            { value: 'no', text: 'No, I don\'t receive SNAP' }
        ]
    },
    {
        id: 'age',
        question: 'How old are you?',
        options: [
            { value: 'under_18', text: 'Under 18' },
            { value: '18_to_54', text: '18 to 54' },
            { value: '55_to_64', text: '55 to 64' },
            { value: 'over_64', text: '65 or older' }
        ]
    },
    {
        id: 'children',
        question: 'Do you have dependent children? If yes, how old is your youngest child?',
        options: [
            { value: 'no_children', text: 'No dependent children' },
            { value: 'under_14', text: 'Yes, youngest is under 14' },
            { value: '14_to_17', text: 'Yes, youngest is 14-17' },
            { value: 'over_18', text: 'Yes, but all are 18+' }
        ]
    },
    {
        id: 'exemptions',
        question: 'Do any of these apply to you?',
        options: [
            { value: 'disabled', text: 'I have a disability or receive disability benefits' },
            { value: 'pregnant', text: 'I am pregnant' },
            { value: 'medically_unable', text: 'I am medically certified as unable to work' },
            { value: 'caregiver', text: 'I care for an incapacitated household member' },
            { value: 'veteran', text: 'I am a veteran' },
            { value: 'homeless', text: 'I am experiencing homelessness' },
            { value: 'foster_youth', text: 'I aged out of foster care and am 18-24' },
            { value: 'none', text: 'None of these apply to me' }
        ]
    }
];

let currentQuestionIndex = 0;
let answers = {};

// Modal control
document.addEventListener('DOMContentLoaded', () => {
    const quizButton = document.getElementById('quiz-button');
    const modal = document.getElementById('quiz-modal');
    const closeButton = modal?.querySelector('.modal-close');

    if (quizButton && modal) {
        quizButton.addEventListener('click', openQuiz);
    }

    if (closeButton && modal) {
        closeButton.addEventListener('click', () => closeQuiz(modal));
    }

    // Close on background click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuiz(modal);
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('show')) {
            closeQuiz(modal);
        }
    });
});

function openQuiz() {
    const modal = document.getElementById('quiz-modal');
    if (!modal) return;

    // Reset quiz state
    currentQuestionIndex = 0;
    answers = {};

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    renderQuestion();
}

function closeQuiz(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scroll
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    if (currentQuestionIndex >= quizQuestions.length) {
        renderResult();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];

    const html = `
        <div class="quiz-question">
            <h3>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map(option => `
                    <button class="quiz-option" data-value="${option.value}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="quiz-nav">
            ${currentQuestionIndex > 0 ? '<button id="quiz-back">← Back</button>' : '<span></span>'}
            <span></span>
        </div>
    `;

    container.innerHTML = html;

    // Add event listeners
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => selectOption(question.id, option.dataset.value));
    });

    const backButton = container.querySelector('#quiz-back');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
}

function selectOption(questionId, value) {
    answers[questionId] = value;
    currentQuestionIndex++;
    renderQuestion();
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function renderResult() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const result = determineAffected();

    let resultClass = 'not-affected';
    let resultTitle = 'You Are Not Affected';
    let resultMessage = '';

    if (result.affected) {
        resultClass = 'affected';
        resultTitle = 'You May Be Affected by New Work Requirements';
        resultMessage = result.message;
    } else {
        resultClass = 'not-affected';
        resultTitle = 'You Are Not Affected by New Work Requirements';
        resultMessage = result.message;
    }

    const html = `
        <div class="quiz-result ${resultClass}">
            <h3>${resultTitle}</h3>
            <p>${resultMessage}</p>
            ${result.details ? `<p><strong>Why:</strong> ${result.details}</p>` : ''}
            ${result.action ? `<p><strong>What to do:</strong> ${result.action}</p>` : ''}
        </div>
        <div class="quiz-nav">
            <button id="quiz-restart">↺ Restart Quiz</button>
            <button id="quiz-close">Close</button>
        </div>
    `;

    container.innerHTML = html;

    // Event listeners
    const restartButton = container.querySelector('#quiz-restart');
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            answers = {};
            renderQuestion();
        });
    }

    const closeButton = container.querySelector('#quiz-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('quiz-modal');
            closeQuiz(modal);
        });
    }
}

function determineAffected() {
    // Not on SNAP
    if (answers.snap_recipient === 'no') {
        return {
            affected: false,
            message: 'SNAP work requirements only apply to SNAP recipients. If you apply for SNAP in the future, these requirements may apply to you.',
            details: null,
            action: null
        };
    }

    // Under 18 or over 64
    if (answers.age === 'under_18' || answers.age === 'over_64') {
        return {
            affected: false,
            message: 'Work requirements do not apply to people under 18 or over 64.',
            details: 'You are outside the age range for work requirements.',
            action: null
        };
    }

    // Has young children (under 14)
    if (answers.children === 'under_14') {
        return {
            affected: false,
            message: 'You remain exempt from work requirements because you have a dependent child under 14.',
            details: 'Parents with children under 14 are still exempt under HR1.',
            action: null
        };
    }

    // Has disability or pregnant or medically unable or caregiver
    if (['disabled', 'pregnant', 'medically_unable', 'caregiver'].includes(answers.exemptions)) {
        return {
            affected: false,
            message: 'You are exempt from work requirements due to your circumstances.',
            details: 'Disability, pregnancy, medical certification, and caregiver status remain exemptions under HR1.',
            action: 'Keep your documentation up to date when you recertify.'
        };
    }

    // Veteran, homeless, or foster youth - LOST EXEMPTION
    if (['veteran', 'homeless', 'foster_youth'].includes(answers.exemptions)) {
        return {
            affected: true,
            message: 'You previously had an exemption, but HR1 removed exemptions for veterans, homeless individuals, and foster youth ages 18-24.',
            details: 'Your exemption was removed under HR1. You now need to meet work requirements unless you qualify for a different exemption (like disability).',
            action: 'Contact your state SNAP office to understand your work requirement obligations and get help finding qualifying work or training programs.'
        };
    }

    // Ages 55-64 (newly affected)
    if (answers.age === '55_to_64') {
        if (answers.children === '14_to_17') {
            return {
                affected: true,
                message: 'You are affected by TWO major changes in HR1: the age range expanded to include 55-64, AND the parent exemption changed to only apply if your youngest child is under 14.',
                details: 'Before HR1, you were exempt due to age AND having a child under 18. Both of those exemptions were removed.',
                action: 'Contact your state SNAP office immediately. You are newly subject to work requirements and need to understand your obligations and options for meeting them.'
            };
        } else {
            return {
                affected: true,
                message: 'You are NEWLY subject to work requirements under HR1. Before July 2025, people ages 55-64 were exempt.',
                details: 'HR1 expanded the age range from 18-54 to 18-64. You were previously exempt due to age.',
                action: 'Contact your state SNAP office to learn about work requirements and E&T programs that can help you meet them.'
            };
        }
    }

    // Ages 18-54 with children 14-17 (lost parent exemption)
    if (answers.age === '18_to_54' && answers.children === '14_to_17') {
        return {
            affected: true,
            message: 'You are NEWLY subject to work requirements because the parent exemption changed. Before HR1, parents with children under 18 were exempt. Now you must have a child under 14 to be exempt.',
            details: 'Your youngest child is 14-17, so you lost the parent exemption under HR1.',
            action: 'Contact your state SNAP office to understand work requirements. You need to complete 80 hours/month of work, training, or volunteer activities.'
        };
    }

    // Ages 18-54, no qualifying exemption (were already affected, still affected)
    if (answers.age === '18_to_54') {
        return {
            affected: true,
            message: 'You were already subject to work requirements before HR1, and remain subject to them.',
            details: 'Work requirements applied to people ages 18-54 before HR1, and continue to apply.',
            action: 'Make sure you are meeting the 80 hours/month requirement and keep documentation. Check with your state SNAP office if you have questions.'
        };
    }

    // Default fallback
    return {
        affected: true,
        message: 'Based on your answers, you may be subject to work requirements. Contact your state SNAP office for personalized guidance.',
        details: null,
        action: 'Visit your state SNAP office or call to get accurate information about your specific situation.'
    };
}
