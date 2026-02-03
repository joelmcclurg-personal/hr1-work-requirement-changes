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
        .domain([0, 70])
        .range([0, width]);

    // Old rule bar
    svg.append('rect')
        .attr('x', xScale(ageData.pre_hr1.min))
        .attr('y', 30)
        .attr('width', xScale(ageData.pre_hr1.max) - xScale(ageData.pre_hr1.min))
        .attr('height', 40)
        .attr('fill', '#718096')
        .attr('opacity', 0.7)
        .attr('rx', 4);

    // Old rule label
    svg.append('text')
        .attr('x', xScale((ageData.pre_hr1.min + ageData.pre_hr1.max) / 2))
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('Before HR1');

    // New rule bar
    svg.append('rect')
        .attr('x', xScale(ageData.post_hr1.min))
        .attr('y', 90)
        .attr('width', xScale(ageData.post_hr1.max) - xScale(ageData.post_hr1.min))
        .attr('height', 40)
        .attr('fill', '#2c5282')
        .attr('rx', 4);

    // New rule label
    svg.append('text')
        .attr('x', xScale((ageData.post_hr1.min + ageData.post_hr1.max) / 2))
        .attr('y', 80)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#2d3748')
        .text('After HR1');

    // Highlight new range (55-64)
    svg.append('rect')
        .attr('x', xScale(55))
        .attr('y', 90)
        .attr('width', xScale(64) - xScale(55))
        .attr('height', 40)
        .attr('fill', '#319795')
        .attr('rx', 4);

    // "NEW" label
    svg.append('text')
        .attr('x', xScale(59.5))
        .attr('y', 114)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', '700')
        .attr('fill', 'white')
        .text('NEWLY AFFECTED');

    // Age labels on bars
    svg.append('text')
        .attr('x', xScale(ageData.pre_hr1.min) + 5)
        .attr('y', 55)
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .text('18');

    svg.append('text')
        .attr('x', xScale(ageData.pre_hr1.max) - 5)
        .attr('y', 55)
        .attr('text-anchor', 'end')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .text('54');

    svg.append('text')
        .attr('x', xScale(ageData.post_hr1.min) + 5)
        .attr('y', 115)
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .text('18');

    svg.append('text')
        .attr('x', xScale(ageData.post_hr1.max) - 5)
        .attr('y', 115)
        .attr('text-anchor', 'end')
        .attr('font-size', '13px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .text('64');

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
        .attr('fill', '#718096')
        .attr('opacity', 0.7)
        .attr('rx', 4);

    svg.append('text')
        .attr('x', xScale(9))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
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
        .attr('fill', '#2c5282')
        .attr('rx', 4);

    svg.append('text')
        .attr('x', xScale(7))
        .attr('y', 75)
        .attr('text-anchor', 'middle')
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
        .attr('fill', '#e53e3e')
        .attr('opacity', 0.3)
        .attr('rx', 4);

    svg.append('text')
        .attr('x', xScale(16))
        .attr('y', 99)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#9b2c2c')
        .text('LOST EXEMPTION');

    // Arrow pointing to change
    svg.append('line')
        .attr('x1', xScale(14))
        .attr('y1', 60)
        .attr('x2', xScale(14))
        .attr('y2', 72)
        .attr('stroke', '#e53e3e')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)');

    // Arrow marker definition
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('markerWidth', 10)
        .attr('markerHeight', 10)
        .attr('refX', 5)
        .attr('refY', 3)
        .attr('orient', 'auto')
        .append('polygon')
        .attr('points', '0 0, 10 3, 0 6')
        .attr('fill', '#e53e3e');

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
                    <td><strong>Veterans</strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong>Homeless</strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong>Foster Youth (18-24)</strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-no">✗ Not Exempt</td>
                </tr>
                <tr>
                    <td><strong>Pregnant</strong></td>
                    <td class="status-yes">✓ Exempt</td>
                    <td class="status-yes">✓ Exempt</td>
                </tr>
                <tr>
                    <td><strong>Disabled</strong></td>
                    <td class="status-yes">✓ Exempt</td>
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
        .attr('aria-label', 'Timeline from July 2025 to June 2026')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Timeline data
    const events = [
        { date: new Date('2025-07-04'), label: 'Bill Signed', description: 'HR1 signed into law' },
        { date: new Date('2025-09-30'), label: 'USDA Guidance', description: 'Implementation guidance released' },
        { date: new Date('2025-12-01'), label: 'State Enforcement', description: 'Most states began checks' },
        { date: new Date('2026-06-01'), label: 'First Terminations', description: 'First possible terminations' }
    ];

    // Scale
    const xScale = d3.scaleTime()
        .domain([new Date('2025-07-01'), new Date('2026-06-30')])
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
            .attr('fill', '#319795')
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

        // Label
        svg.append('text')
            .attr('x', x)
            .attr('y', height / 2 + yOffset)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('font-weight', '700')
            .attr('fill', '#2c5282')
            .text(event.label);

        // Date
        const monthYear = d3.timeFormat('%b %Y')(event.date);
        svg.append('text')
            .attr('x', x)
            .attr('y', height / 2 + yOffset + (isEven ? -15 : 15))
            .attr('text-anchor', 'middle')
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
