const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function weekButtons() {
  const weekButtonSection = document.querySelector('.week-buttons');

  weeks.forEach((day) => {
    const button = document.createElement('button');
    button.textContent = day;
    button.classList.add(day);
    button.classList.add('day');
    weekButtonSection.appendChild(button);

    button.addEventListener('click', () => {
      filterDays(button, day);
    });
  })
}

function filterDays(button, day) {
  const inputs = document.querySelectorAll('.page');

  inputs.forEach((eachInput) => {
    eachInput.style.display = '';

    if (!eachInput.classList.contains(day) && button.classList.contains(day)) {
      eachInput.style.display = 'none';
    }
  })
}

weekButtons();