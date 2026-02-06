/**
 * D3.js visualizations for HR1 SNAP Work Requirements
 * Creates age bars, parent timeline, exemptions table, and implementation timeline
 */

// Wait for data to load
document.addEventListener('dataLoaded', (event) => {
    const data = event.detail;
    createAgeVisualization(data);
    createParentVisualization(data);
    createExemptionsTable(data);
    createTimelineVisualization(data);
});

/**
 * Age Requirements Visualization
 * Overlapping horizontal bars showing age range expansion
 */
function createAgeVisualization(data) {
    const container = document.getElementById('age-viz');
    if (!container) return;

    const ageData = data.age_requirements;

    // Clear existing content
    container.innerHTML = '';

    // Dimensions
    const margin = { top: 20, right: 40, bottom: 60, left: 60 };
    const containerWidth = container.clientWidth || 600;
    const width = containerWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#age-viz')
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', 200)
        .attr('role', 'img')
        .attr('aria-label', `Age requirements comparison: old rule 18-54, new rule 18-64`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale
    const xScale = d3.scaleLinear()
        .domain([15, 70])
        .range([0, width]);

    // Old rule bar
    svg.append('rect')
        .attr('x', xScale(ageData.pre_hr1.min))
        .attr('y', 30)
        .attr('width', xScale(ageData.pre_hr1.max) - xScale(ageData.pre_hr1.min))
        .attr('height', 30)
        .attr('fill', '#d1d5db')
        .attr('rx', 4);

    // Old rule label
    svg.append('text')
        .attr('x', 0)
        .attr('y', 18)
        .attr('text-anchor', 'start')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('Before HR1');

    // "18" label on left edge of Before HR1 bar
    svg.append('text')
        .attr('x', xScale(ageData.pre_hr1.min) + 6)
        .attr('y', 49)
        .attr('text-anchor', 'start')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#2d3748')
        .text('18');

    // "54" label on right edge of Before HR1 bar
    svg.append('text')
        .attr('x', xScale(ageData.pre_hr1.max) - 6)
        .attr('y', 49)
        .attr('text-anchor', 'end')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#2d3748')
        .text('54');

    // New rule bar
    svg.append('rect')
        .attr('x', xScale(ageData.post_hr1.min))
        .attr('y', 90)
        .attr('width', xScale(ageData.pre_hr1.max) - xScale(ageData.post_hr1.min))
        .attr('height', 30)
        .attr('fill', '#4b5563')
        .attr('rx', 4);

    // New rule label
    svg.append('text')
        .attr('x', 0)
        .attr('y', 78)
        .attr('text-anchor', 'start')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('After HR1');

    // Highlight new range (55-64)
    svg.append('rect')
        .attr('x', xScale(ageData.pre_hr1.max))
        .attr('y', 90)
        .attr('width', xScale(ageData.post_hr1.max) - xScale(ageData.pre_hr1.max))
        .attr('height', 30)
        .attr('fill', '#fca5a5')
        .attr('rx', 4);

    // "NEW" label
    svg.append('text')
        .attr('x', xScale(59.5))
        .attr('y', 108)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .text('NEWLY AFFECTED');

    // X axis
    const xAxis = d3.axisBottom(xScale)
        .tickValues([20, 30, 40, 50, 60])
        .tickFormat(d => d);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr('font-size', '12px');

    // X axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('fill', '#4a5568')
        .text('Age (years)');
}

/**
 * Parent Exemption Visualization
 * Timeline showing child age and exemption status
 */
function createParentVisualization(data) {
    const container = document.getElementById('parent-viz');
    if (!container) return;

    const parentData = data.parent_exemption;

    // Clear existing content
    container.innerHTML = '';

    // Dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const containerWidth = container.clientWidth || 600;
    const width = containerWidth - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#parent-viz')
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', 220)
        .attr('role', 'img')
        .attr('aria-label', 'Parent exemption timeline showing exemption applies until child is 14, not 18')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale
    const xScale = d3.scaleLinear()
        .domain([0, 18])
        .range([0, width]);

    // Old rule (exempt until 18)
    svg.append('rect')
        .attr('x', 0)
        .attr('y', 20)
        .attr('width', xScale(18))
        .attr('height', 30)
        .attr('fill', '#166534')
        .attr('rx', 4);

    svg.append('text')
        .attr('x', 0)
        .attr('y', 15)
        .attr('text-anchor', 'start')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('Before HR1: Exempt');

    // New rule (exempt until 14)
    svg.append('rect')
        .attr('x', 0)
        .attr('y', 80)
        .attr('width', xScale(14))
        .attr('height', 30)
        .attr('fill', '#166534')
        .attr('rx', 4);

    svg.append('text')
        .attr('x', 0)
        .attr('y', 75)
        .attr('text-anchor', 'start')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('After HR1: Exempt');

    // Highlight lost exemption (14-18)
    svg.append('rect')
        .attr('x', xScale(14))
        .attr('y', 80)
        .attr('width', xScale(18) - xScale(14))
        .attr('height', 30)
        .attr('fill', '#fca5a5')
        .attr('rx', 4);

    svg.append('text')
        .attr('x', xScale(16))
        .attr('y', 99)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .text('LOST EXEMPTION');

    // X axis
    const xAxis = d3.axisBottom(xScale)
        .tickValues([0, 2, 4, 6, 8, 10, 12, 14, 16, 18])
        .tickFormat(d => d);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr('font-size', '12px');

    // X axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 40)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('fill', '#4a5568')
        .text('Child\'s Age (years)');
}

/**
 * Exemptions Table
 * Simple HTML table showing what changed
 */
function createExemptionsTable(data) {
    const container = document.getElementById('exemptions-viz');
    if (!container) return;

    const exemptions = data.exemptions_removed;

    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Before HR1</th>
                    <th>After HR1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="An individual who served in the active military, naval, air, or space service. (Food and Nutrition Act §6(o), per FRA 2023; broader than 38 U.S.C. §101 — includes all discharge statuses.)">Veterans</span></strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="An individual who lacks a fixed and regular nighttime residence, or whose primary nighttime residence is: a supervised shelter, a halfway house, a temporary stay (≤90 days) with another person, or a place not designed for sleeping. (7 CFR 271.2)">Homeless</span></strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="An individual aged 24 or younger who was in foster care under the responsibility of a State on their 18th birthday. Eligible until their 25th birthday regardless of whether the State extends foster care. (7 CFR 273.24(g))">Foster Youth (18-24)</span></strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="An individual who is pregnant, as verified per State agency procedures. (7 CFR 273.7(b)(1))">Pregnant</span></strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-yes">✓ Exempt</td>
                </tr>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="An individual who receives federal or State disability benefits, or who is medically certified as physically or mentally unfit for employment. (7 CFR 273.7(b)(1))">Disabled</span></strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-yes">✓ Exempt</td>
                </tr>
                <tr>
                    <td><strong><span class="def-tooltip" tabindex="0" data-tip="A member of a federally recognized Indian Tribe, as defined under the Indian Health Care Improvement Act (25 U.S.C. §1603(13)). (Added by H.R. 1)">Tribal Member</span></strong></td>
                    <td class="status-no">✗ Not Exempt</td>
                    <td class="status-yes">✓ Exempt</td>
                </tr>
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

/**
 * Implementation Timeline
 * Horizontal timeline with key dates
 */
function createTimelineVisualization(data) {
    const container = document.getElementById('timeline-viz');
    if (!container) return;

    const timeline = data.timeline;

    // Clear existing content
    container.innerHTML = '';

    // Dimensions
    const margin = { top: 30, right: 40, bottom: 80, left: 40 };
    const containerWidth = container.clientWidth || 600;
    const width = containerWidth - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#timeline-viz')
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', 250)
        .attr('role', 'img')
        .attr('aria-label', 'Timeline from July 2025 to March 2026')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Timeline data
    const events = [
        { date: new Date(2025, 6, 4), label: 'Bill Signed', description: 'HR1 signed into law' },
        { date: new Date(2025, 10, 1), label: 'Enforcement Begins', description: 'States began full enforcement' },
        { date: new Date(2026, 2, 1), label: 'First Terminations', description: 'First benefit terminations' }
    ];

    // Scale
    const xScale = d3.scaleTime()
        .domain([new Date(2025, 6, 1), new Date(2026, 2, 1)])
        .range([0, width]);

    // Timeline line
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', height / 2)
        .attr('y2', height / 2)
        .attr('stroke', '#cbd5e0')
        .attr('stroke-width', 3);

    // Events
    events.forEach((event, i) => {
        const x = xScale(event.date);
        const isEven = i % 2 === 0;
        const yOffset = isEven ? -60 : 60;

        // Dot on timeline
        svg.append('circle')
            .attr('cx', x)
            .attr('cy', height / 2)
            .attr('r', 8)
            .attr('fill', '#4b5563')
            .attr('stroke', 'white')
            .attr('stroke-width', 2);

        // Line to label
        svg.append('line')
            .attr('x1', x)
            .attr('x2', x)
            .attr('y1', height / 2)
            .attr('y2', height / 2 + yOffset * 0.7)
            .attr('stroke', '#cbd5e0')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3');

        // Determine text anchor based on position
        const anchor = i === 0 ? 'start' : i === events.length - 1 ? 'end' : 'middle';

        // Label
        svg.append('text')
            .attr('x', x)
            .attr('y', height / 2 + yOffset)
            .attr('text-anchor', anchor)
            .attr('font-size', '13px')
            .attr('font-weight', '700')
            .attr('fill', '#2d3748')
            .text(event.label);

        // Date
        const monthYear = d3.timeFormat('%b %Y')(event.date);
        svg.append('text')
            .attr('x', x)
            .attr('y', height / 2 + yOffset + (isEven ? -15 : 15))
            .attr('text-anchor', anchor)
            .attr('font-size', '11px')
            .attr('fill', '#718096')
            .text(monthYear);
    });
}

// Responsive resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const data = getData();
        if (data) {
            createAgeVisualization(data);
            createParentVisualization(data);
            createTimelineVisualization(data);
        }
    }, 250);
});
