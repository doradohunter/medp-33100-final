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

weekButtons();