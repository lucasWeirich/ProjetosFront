// ---------------------------------------------------
// inputs
const _title = document.getElementById('title');
const _time = document.getElementById('date-time');
const _descriptions = document.getElementById('descriptions');
// popup
const poppup = document.querySelector('.__popup');
// dropzones
const _todo = document.getElementById('todo');
const _progress = document.getElementById('progress');
const _done = document.getElementById('done');
// allTasks
let allTask = JSON.parse(localStorage.getItem('allTask-save')) || [];

function idGenerator() {
    return Math.floor(Date.now() * Math.random()).toString(36)
}

// ---------------------------------------------------
// Add new task
function addTask() {

    if (!validateInputs()) {
        return;
    }

    const newTask = {
        id: idGenerator(),
        title: _title.value,
        descriptions: _descriptions.value,
        timePublish: Date().substring(0, 24),
        timeFinal: _time.value,
        status: 'todo'
    };

    allTask.push(newTask);
    cardsTasks.create(newTask);
    localStorage.setItem('allTask-save', JSON.stringify(allTask));
}

// ---------------------------------------------------
// Validate inputs
function validateInputs() {
    const inputs = [_title, _time, _descriptions];
    let aux = true;

    inputs.forEach(({ id, value }) => {
        if (value === '') {
            alert(`Input ${id} not informed!`);
            aux = false;
        }
    })

    return aux;
};

// ---------------------------------------------------
// Create HTML of the tasks
const createHTML = (task) => {
    const x = {
        year: task.timeFinal.substring(0, 4),
        month: task.timeFinal.substring(5, 7),
        day: task.timeFinal.substring(8, 10),
        time: task.timeFinal.substring(12),
        ymd: task.timeFinal.substring(0, 10)
    };
    let auxtime = '';
    let timePrazo = ''

    if (x.day - 5 <= 0) {
        let day = 25;
        let month = x.month - 1;

        if (x.month <= 0) {
            month = month + 1;
            year = year - 1;
        }
        timePrazo = `${x.year}-${month}-${day}`;
    }

    if (new Date() >= new Date(x.ymd)) {
        auxtime = '--alto';
    } else if (new Date() >= new Date(timePrazo)) {
        auxtime = '--medio';
    } else {
        auxtime = '--baixo';
    }

    return `
        <div class="card" draggable="true" onclick="detailsTask('${task.id}')" id="${task.id}">
            <div class="status --todo"></div>
            <div class="content">${task.title}</div>
            <span class="finalTime ${auxtime}">${x.day}/${x.month}/${x.year} ${x.time}</span>
            <span class="material-symbols-outlined --edit" onclick="openPopup('${task.id}')">edit</span>
            <span class="material-symbols-outlined --delete" onclick="deleteTask('${task.id}')">delete</span>
        </div><!-- cards -->
    `;
}

// ---------------------------------------------------
// Create and Update cards of the tasks
const cardsTasks = {
    initialized() {
        const allTaskSave = JSON.parse(localStorage.getItem('allTask-save')) || [];
        _todo.innerHTML = '';
        _progress.innerHTML = '';
        _done.innerHTML = '';

        allTaskSave.forEach(task => {
            switch (task.status) {
                case 'todo':
                    _todo.innerHTML += createHTML(task);
                    break;

                case 'progress':
                    _progress.innerHTML += createHTML(task);
                    break;

                case 'done':
                    _done.innerHTML += createHTML(task);
                    break;
                default:
                    break;
            }
        });

        updateAll();
    },
    create(newTask) {
        _todo.innerHTML += (createHTML(newTask));
        updateAll();
    }
};

// ---------------------------------------------------
// Details task
function detailsTask(id) {
    const _details = document.querySelector('.__details');

    /* REMOVE CLASS STATUS */
    _details.classList.remove(`--todo`);
    _details.classList.remove(`--progress`);
    _details.classList.remove(`--done`);

    allTask.forEach(task => {
        if (task.id === id) {
            let timeFinal = new Date(task.timeFinal);
            timeFinal = `${timeFinal}`.substring(0, 24);

            _details.classList.add(`--${task.status}`);

            _details.innerHTML = `
                <div class="__id">${task.id}</div>
                <div class="__title">${task.title}</div>
                <div class="__descriptions">${task.descriptions}</div>
                <div class="__times">
                    <div class="__timePublish">${task.timePublish}</div>
                    <div class="__timeFinal">${timeFinal}</div>
                </div><!-- __times -->
                <div class="__status"></div>
            `;
        }
    })
}

// ---------------------------------------------------
// Variables inputs edit task
const e_id = document.getElementById('e_id');
const e_title = document.getElementById('e_title');
const e_descriptions = document.getElementById('e_descriptions');
const e_timeFinal = document.getElementById('e_date-time');

// ---------------------------------------------------
// Delete task
function deleteTask(id) {
    allTask = allTask.filter((task) => task.id !== id);
    localStorage.setItem('allTask-save', JSON.stringify(allTask));

    cardsTasks.initialized();
    updateAll();
}

// ---------------------------------------------------
// Edit task
function editTask() {
    const taskUpdate = {
        id: e_id.value,
        title: e_title.value,
        descriptions: e_descriptions.value,
    }

    allTask.forEach(task => {
        if (task.id === taskUpdate.id) {
            task.title = taskUpdate.title;
            task.descriptions = taskUpdate.descriptions;
        }
        localStorage.setItem('allTask-save', JSON.stringify(allTask));
    })

    cardsTasks.initialized();
    updateAll();
    closePopup();
}

// ---------------------------------------------------
// Open popup
function openPopup(id) {
    poppup.classList.add('--active')

    allTask.forEach(task => {
        if (task.id === id) {
            e_id.value = task.id;
            e_title.value = task.title;
            e_descriptions.value = task.descriptions;
            e_timeFinal.value = task.timeFinal;
        }
    });
}

// ---------------------------------------------------
// Close popup
function closePopup() {
    poppup.classList.remove('--active');
}

// ---------------------------------------------------
// Update everything but the page
function updateAll() {
    dragDropUpdate();
}

// Initialized created cards
cardsTasks.initialized();