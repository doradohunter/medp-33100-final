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

    form.addEventListener('submit', (e) => {
      form.style.display = 'none';

      e.preventDefault();

      const formData = new FormData(form);

      const formDataObject = {
        title: formData.get('title'),
        memory: formData.get('memory'),
        authorId: '67589ab2c23df25a12718523',
        day: formData.get('weekday'),
      };

      fetch('/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });
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
      addEntry.style.display = 'block';
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

      saveButton.addEventListener('click', async (e) => {
        e.preventDefault();
        addEntry.style.display = 'none';
        const newTitle = inputTitle.value;
        const newMemory = inputText.value;
        const newDay = inputDay.value;

        const updatedMemory = {
          title: newTitle,
          memoryID: memory.id,
          memory: newMemory,
          day: newDay,
        };

        await updateMemory(updatedMemory);

        memoryTitle.textContent = newTitle;
        memoryText.textContent = newMemory;
        memoryDay.textContent = newDay;
      });
    });
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
