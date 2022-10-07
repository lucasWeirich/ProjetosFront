const data = Array.from({ length: 100 })
    .map((_, i) => `Item ${i + 1}`);

// ==========================================================================
// ==========================================================================

const html = {
    get(e) {
        return document.querySelector(e);
    }
}

let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5
}

const controls = {
    next() {
        const lastPage = state.page >= state.totalPage;
        if (!lastPage) state.page++;
    },
    prev() {
        const lastPage = state.page === 1;
        if (!lastPage) state.page--;
    },
    goTo(page) {
        state.page = +page;
        if (page < 1) state.page = 1;
        if (page > state.totalPage) state.page = page.totalPage;
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1);
            update()
        })
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage);
            update()
        })
        html.get('.next').addEventListener('click', () => {
            controls.next();
            update()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update()
        })
    }
}

const list = {
    create(item) {
        html.get('.list').innerHTML += `<div class="item">${item}</div>`;
    },
    update() {
        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;

        html.get('.list').innerHTML = '';

        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(list.create)
    }
}

const buttons = {
    element: html.get('.controls .numbers'),
    create(number) {
        const button = document.createElement('div');

        button.innerHTML = number;

        if (state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (e) => {
            const page = e.target.innerText;

            controls.goTo(page); // 3
            update();
        })

        buttons.element.appendChild(button);
    },
    update() {
        buttons.element.innerHTML = '';
        const { maxLeft, maxRight } = buttons.calulateMaxVisible();

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page);
        }
    },
    calulateMaxVisible() {
        const { maxVisibleButtons } = state;
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2));

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = maxVisibleButtons;
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1);
            maxRight = state.totalPage;
        }

        return { maxLeft, maxRight }
    }
}

function update() {
    list.update();
    buttons.update();
}

function init() {
    update();
    controls.createListeners();
}

init()