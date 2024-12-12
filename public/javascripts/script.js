function displayPages() {
  const pages = document.querySelectorAll('.page');
  let left = 0;
  let right = 1;

  pages.forEach((eachPage, index) => {
    if (index < left || index > right) {
      eachPage.style.display = 'none';
    }
  })

  changePage(left, right);
}

function changePage(left, right) {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  const pages = document.querySelectorAll('.page');

  rightButton.addEventListener('click', () => {
    left++;
    right++;

    pages.forEach((eachPage, index) => {
      if (index < left || index > right) {
        eachPage.style.display = 'none';
      } else {
        eachPage.style.display = '';
      }
    })
  })

  leftButton.addEventListener('click', () => {
    left--;
    right--;

    pages.forEach((eachPage, index) => {
      if (index < left || index > right) {
        eachPage.style.display = 'none';
      } else {
        eachPage.style.display = '';
      }
    })
  })
}

displayPages();

