document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const dailyLogForm = document.getElementById('dailyLogForm');
    const logsContainer = document.getElementById('logsContainer');

    const getHabits = () => JSON.parse(localStorage.getItem('habits')) || {};
    const setHabits = (habits) =>
        localStorage.setItem('habits', JSON.stringify(habits));
    const getLogs = () => JSON.parse(localStorage.getItem('logs')) || [];
    const setLogs = (logs) =>
        localStorage.setItem('logs', JSON.stringify(logs));

    const currentMonth = new Date().toISOString().slice(0, 7);
    const habits = getHabits();

    if (!habits[currentMonth]) {
        habitForm.style.display = 'block';
    } else {
        habitForm.innerHTML =
            'You have already set your 3 daily habits for this month! \n <b>Exercise, Read and Clean</b>';
    }

    let logs = getLogs();
    const today = new Date().toLocaleDateString();
    const hasLoggedToday = logs.some((log) => log.date === today);

    if (hasLoggedToday) {
        dailyLogForm.innerHTML = 'You have already logged today!';
    } else if (!habits[currentMonth]) {
        dailyLogForm.innerHTML = '';
    }

    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const exercise = habitForm.elements['exercise'].checked;
        const read = habitForm.elements['read'].checked;
        const clean = habitForm.elements['clean'].checked;
        habits[currentMonth] = { exercise, read, clean };
        setHabits(habits);
        habitForm.style.display = 'none';
        location.reload();
    });

    dailyLogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const proudOf = document.getElementById('proudOf').value;
        const exercise = document.getElementById('exercise').checked;
        const read = document.getElementById('read').checked;
        const clean = document.getElementById('clean').checked;
        const mood = document.getElementById('mood').value;

        const log = {
            date: new Date().toLocaleDateString(),
            proudOf,
            habits: {
                exercise: habits[currentMonth].exercise && exercise,
                read: habits[currentMonth].read && read,
                clean: habits[currentMonth].clean && clean,
            },
            mood,
        };

        logs = getLogs();
        logs.unshift(log);
        setLogs(logs);
        dailyLogForm.reset();
        renderLogs(logs);
        location.reload();
    });

    const renderLogs = (logs) => {
        fetch('/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ logs }),
        })
            .then((response) => response.text())
            .then((html) => {
                logsContainer.innerHTML = html;
            });
    };

    renderLogs(logs);
});
