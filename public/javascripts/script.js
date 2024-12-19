const weeks = [
  'All',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function weekButtons() {
  const weekButtonSection = document.querySelector('.week-buttons');

  weeks.forEach((day) => {
    const button = document.createElement('button');
    button.textContent = day;
    button.classList.add(day);
    button.classList.add('day');
    weekButtonSection.appendChild(button);

    button.addEventListener('click', () => {
      resetColors();
      filterDays(button, day);
    });
  });
}

function filterDays(button, day) {
  const inputs = document.querySelectorAll('.page');

  inputs.forEach((eachInput) => {
    eachInput.style.display = '';

    if (!eachInput.classList.contains(day) && button.classList.contains(day)) {
      button.style.backgroundColor = '#777777';
      eachInput.style.display = 'none';
    }

    if (button.classList.contains('All')) {
      eachInput.style.display = '';
    }
  });
}

function resetColors() {
  const week = document.querySelectorAll('.day');

  week.forEach((day) => {
    day.style.backgroundColor = '#1e1e1e';
  });
}

function showForm() {
  const form = document.getElementById('add-entry');
  const addButton = document.querySelector('.add-more-button');

  addButton.addEventListener('click', () => {
    form.style.display = '';
  });
}

function addEntry() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-entry');
    const createButton = document.getElementById('create-memory');

    createButton.addEventListener('click', () => {
      form.style.display = 'none';

      const formData = new FormData(form);

      const formDataObject = {
        title: formData.get('title'),
        memory: formData.get('memory'),
        authorId: '67589ab2c23df25a12718523',
        day: formData.get('weekday'),
      };

      createMemory(formDataObject);
    });
  });
}

function editDeleteMemory() {
  const memories = document.querySelectorAll('.page');
  const addEntry = document.getElementById('edit-entry');

  memories.forEach((memory) => {
    const editButton = memory.querySelector('.edit');
    const saveButton = document.querySelector('.save-button');
    const deleteButton = memory.querySelector('.delete');

    deleteButton.addEventListener('click', async () => {
      deleteMemory(memory.id);
    });

    editButton.addEventListener('click', () => {
      addEntry.style.display = '';
      // Title
      const memoryTitle = memory.querySelector('.memory-title');
      const inputTitle = document.getElementById('edit-title');
      inputTitle.value = memoryTitle.textContent;
      // Memory
      const memoryText = memory.querySelector('.memory-text');
      const inputText = document.getElementById('edit-memory');
      inputText.value = memoryText.textContent;
      // Weekday
      const memoryDay = memory.querySelector('.memory-day');
      const inputDay = document.getElementById('edit-weekday');
      inputDay.value = memoryDay.textContent;


      saveButton.addEventListener('click', () => {
        addEntry.style.display = 'none';

        const newTitle = inputTitle.value;
        const newMemory = inputText.value;
        const newDay = inputDay.value;

        memoryTitle.textContent = newTitle;
        memoryText.textContent = newMemory;
        memoryDay.textContent = newDay;

        const updatedMemory = {
          title: newTitle,
          memoryID: memory.id,
          memory: newMemory,
          day: newDay,
        };

        updateMemory(updatedMemory);
      });
    });
  });
}

function displayEdits() {
  const diary = document.querySelector('.diary > div');
  const pages = document.querySelectorAll('.page');

  pages.forEach((page) => {
    const deleteButton = page.querySelector('.delete');

    deleteButton.addEventListener('click', () => {
      diary.removeChild(page);
    });
  });
}

function displayDelete() {
  const pages = document.querySelectorAll('.page');

  pages.forEach((page) => {
    const deleteButton = page.querySelector('.delete');

    deleteButton.addEventListener('click', () => {
      diary.removeChild(page);
    });
  });
}

function showDates() {
  const menu = document.querySelector('.heading > button');
  const weekButtons = document.querySelector('.week-buttons');
  const daysButton = document.querySelectorAll('.day');
  const x = window.matchMedia('(min-width: 1000px)')

  menu.addEventListener('click', () => {
    if (weekButtons.style.display === 'none') {
      weekButtons.style.display = 'grid';
    } else {
      weekButtons.style.display = 'none';
    }
  })

  daysButton.forEach(button => {
    button.addEventListener('click', () => {
      if (!x.matches) {
        weekButtons.style.display = 'none';
      }
    })
  })

  x.addEventListener('change', () => {
    if (x.matches) {
      weekButtons.style.display = 'grid';
    } else {
      weekButtons.style.display = 'none';
    }
  });
}


async function createMemory(createdMemory) {
  fetch('/memory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createdMemory),
  });
}

async function updateMemory(updatedMemory) {
  fetch('/memory', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMemory),
  });
}

async function deleteMemory(memoryID) {
  fetch('/memory/' + memoryID, {
    method: 'DELETE',
  });
}

weekButtons();
showForm();
addEntry();
editDeleteMemory();
displayDelete();
displayEdits();
showDates();
