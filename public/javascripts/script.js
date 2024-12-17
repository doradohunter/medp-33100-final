const weeks = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  })
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
  })
}

function resetColors() {
  const week = document.querySelectorAll('.day');

  week.forEach((day) => {
    day.style.backgroundColor = '#1e1e1e'
  })
}

function showForm() {
  const form = document.getElementById('add-entry');
  const addButton = document.querySelector('.add-more-button');

  addButton.addEventListener('click', () => {
    form.style.display = '';
  })
}

function addEntry() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-entry');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('submitted');

      const formData = new FormData(form);

      const formDataObject = {
        title: formData.get('title'),
        memory: formData.get('memory'),
        authorId: '67589ab2c23df25a12718523',
        day: formData.get('weekday'),
      }

      console.log(formDataObject);

      fetch('/memory', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataObject)
      })
    })
  })
}

weekButtons();
showForm();
addEntry();