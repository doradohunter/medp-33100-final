document.addEventListener("DOMContentLoaded", (event) => {
    gsap.fromTo("t1", { opacity: 0 }, { opacity: 1, duration: 3});
    gsap.fromTo("t2", { opacity: 0 }, { opacity: 1, duration: 3, delay: 3});
    gsap.fromTo("t3", { opacity: 0 }, { opacity: 1, duration: 3, delay: 6});
   });

interact('.post')
    .draggable({
        autoScroll: true,
        listeners: {
            move: dragMoveListener,
        }
    })
function dragMoveListener(event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

function bindAsc() {
    const ascButton = document.querySelector('#ascButton')
    ascButton.addEventListener('click', async function () {
        console.log('che')
        const updatedPosts = await getPosts('createdAt:asc');
        refreshPosts(updatedPosts);
    }, false);
}

function bindDesc() {
    const descButton = document.querySelector('#descButton')
    descButton.addEventListener('click', async function () {
        console.log('ck')
        const updatedPosts = await getPosts('createdAt:desc');
        refreshPosts(updatedPosts);
    }, false);
}

const introBlock = document.querySelector('intro');
introBlock.addEventListener('click', introClick);
function introClick(){
    introBlock.removeEventListener('click', introClick);
    gsap.fromTo("intro", { opacity: 1 }, { opacity: 0, duration: 2 });
    setTimeout(function () {
        introBlock.style.display = 'none';
    }, 2000)
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#post_form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('#submit_button');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Uploading...';

        const formData = new FormData(form);
        form.reset()
        await fetch('/posts', {
            method: 'POST',
            body: formData
        });
        submitButton.disabled = false;
        submitButton.innerHTML = 'Submit';
        const updatedPosts = await getPosts('createdAt:desc');
        form.reset()
        refreshPosts(updatedPosts);
    })
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const postID = post.id;
    });
});

async function editMessage(messageId) {
    const newText = prompt('Enter new text or press cancel to return.');
    if (newText) {
        const updatedItem = { text: newText };
        const response = await fetch(`/posts/${messageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });
        const updatedPosts = await getPosts('createdAt:desc');
        refreshPosts(updatedPosts);
    }
}


async function deleteMessage(messageId) {
    const check = confirm('Are you sure you want to delete this memory?')
    if (check == true) {
        setTimeout(async function () {
            const updatedPosts = await getPosts('createdAt:desc');
            refreshPosts(updatedPosts);
        }, 1500)
        const response = await fetch(`/posts/${messageId}`, {
            method: 'DELETE',
        })
    }
}

function bindTrash() {
    const trash = document.getElementsByClassName("fa-solid fa-trash");
    for (var i = 0; i < trash.length; i++) {
        trash[i].addEventListener('click', function () {
            const messageId = this.id;
            deleteMessage(messageId);
        }, false);
    }
}

function bindEdit() {
    const edit = document.getElementsByClassName("fa-solid fa-pencil");
    for (var i = 0; i < edit.length; i++) {
        edit[i].addEventListener('click', function () {
            const messageId = this.id;
            editMessage(messageId);
        }, false);
    }
}


function refreshPosts(posts) {
    const postsContainer = document.querySelector('main');
    postsContainer.innerHTML = '';
    const form = document.querySelector('#post_form');
    form.reset()
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.id = post._id;
        postElement.innerHTML = `
        <icons>
            <i class="fa-solid fa-pencil" id="${post._id}"></i>
            <span class="dot"></span>
            <i class="fa-solid fa-trash" id="${post._id}"></i>
        </icons>
        <holder>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
            <p>${post.content}</p>
        </holder>`;
        postsContainer.appendChild(postElement);
        bindEdit();
        bindTrash();
    })
}

async function getPosts(sort) {
    let url = '/posts';
    if (sort) {
        url += `?sort=${encodeURIComponent(sort)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

bindEdit();
bindTrash();
bindAsc()
bindDesc()