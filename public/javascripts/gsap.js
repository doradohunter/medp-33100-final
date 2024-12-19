document.addEventListener('DOMContentLoaded', () => {
    const Intro = document.querySelector('.firstAct');
    const Page = document.querySelector('.secondAct');
    const welcome = document.querySelector('.welcome');

    Intro.style.display = 'block';
    Page.style.display = 'none';
    welcome.style.display = 'block';

    const start = document.querySelector('.start');
    start.addEventListener('click', () =>{
        console.log('clicked');
    })
})