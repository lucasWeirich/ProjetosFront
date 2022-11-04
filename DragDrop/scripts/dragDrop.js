// Declarations constants global
let cards = document.querySelectorAll('.card');
let dropzones = document.querySelectorAll('.dropzone');

// CARDS
cards.forEach(card => {
    card.addEventListener('dragstart', dragstart);
    //card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragend);
})

function dragstart() {
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
    this.classList.add('is-dragging')
}

//function drag() {}

function dragend() {
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging')
}

// DROPZONES
dropzones.forEach(dropzone => {
    //dropzone.addEventListener('dragenter', dragenter);
    dropzone.addEventListener('dragover', dragover);
    dropzone.addEventListener('dragleave', dragleave);
    dropzone.addEventListener('drop', drop);
})

//function dragenter() {}

function dragover() {
    this.classList.add('over');

    // get dragging card
    const cardBeingDragged = document.querySelector('.is-dragging');
    this.appendChild(cardBeingDragged);

    // Update status of task
    allTask.forEach(task => {
        if (task.id === cardBeingDragged.id) {
            task.status = this.id;
        }
        localStorage.setItem('allTask-save', JSON.stringify(allTask));
    })
}

function dragleave() {
    this.classList.remove('over');
}

function drop() {
    this.classList.remove('over');
}

function dragDropUpdate() {
    cards = document.querySelectorAll('.card');
    dropzones = document.querySelectorAll('.dropzone');

    // CARDS
    cards.forEach(card => {
        card.addEventListener('dragstart', dragstart);
        //card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragend);
    })

    // DROPZONES
    dropzones.forEach(dropzone => {
        //dropzone.addEventListener('dragenter', dragenter);
        dropzone.addEventListener('dragover', dragover);
        dropzone.addEventListener('dragleave', dragleave);
        dropzone.addEventListener('drop', drop);
    })
}