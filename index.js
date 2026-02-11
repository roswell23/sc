const config = {
    startHour: 7,
    endHour: 18,
    pixelsPerHour: 80
};

const scheduleData = [
    { day: "Mon", start: "10:00", end: "12:00", name: "GNED 09", desc: "Ronnel Jul M. Sebastian", loc: "TMA 101", type: "type-gen" },
    { day: "Thu", start: "07:00", end: "09:00", name: "ITEC 101", desc: "Richelle F. Rozol", loc: "Comlab 2", type: "type-lab" },
    { day: "Thu", start: "10:00", end: "12:30", name: "DCIT 26", desc: "Sherom Granada", loc: "Comlab 1", type: "type-lec" },
    { day: "Thu", start: "13:30", end: "16:00", name: "ITEC 106", desc: "Sherom Granada", loc: "Comlab 1", type: "type-lab" },
    { day: "Sat", start: "07:00", end: "09:00", name: "ITEC 105", desc: "Edison Feranil", loc: "Comlab 2", type: "type-lec" },
    { day: "Sat", start: "10:00", end: "12:30", name: "ITEC 100", desc: "Edison Feranil", loc: "Comlab 1", type: "type-lec" }
];

function timeToMinutes(timeStr) {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
}

function renderGrid() {
    const timeCol = document.getElementById('timeCol');
    const gridLines = document.getElementById('gridLines');

    // Render Time Labels
    for (let i = config.startHour; i <= config.endHour; i++) {
        const label = document.createElement('div');
        label.className = 'time-label';
        label.innerText = `${i % 12 || 12}:00 ${i >= 12 ? 'PM' : 'AM'}`;
        timeCol.appendChild(label);
    }

    // Render Vertical Grid Lines
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div');
        line.className = 'grid-column';
        gridLines.appendChild(line);
    }
}

function renderClasses() {
    scheduleData.forEach(item => {
        const column = document.querySelector(`.day-column[data-day="${item.day}"]`);
        if (!column) return;

        const startMins = timeToMinutes(item.start);
        const endMins = timeToMinutes(item.end);
        const duration = endMins - startMins;

        const offsetTop = ((startMins - (config.startHour * 60)) / 60) * config.pixelsPerHour;
        const height = (duration / 60) * config.pixelsPerHour;

        const block = document.createElement('div');
        block.className = `class-block ${item.type}`;
        block.style.top = `${offsetTop}px`;
        block.style.height = `${height}px`;

        block.innerHTML = `
                    <div class="class-name">${item.name}</div>
                    <div class="class-detail">${item.desc} • ${item.loc}</div>
                    <div class="class-time">${item.start} - ${item.end}</div>
                `;

        column.appendChild(block);
    });
}

// Initialize
renderGrid();
renderClasses();