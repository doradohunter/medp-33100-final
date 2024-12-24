document.addEventListener('DOMContentLoaded', () => {

    const Intro = document.querySelector('.firstAct');
    const Page = document.querySelector('.secondAct');
    
    Page.style.display = 'none';
    const start = document.querySelector('.start');
    start.addEventListener('click', () =>{
        console.log('clicked');
        Intro.style.display = 'none';
        Page.style.display = 'block';
    })
    //form appears and disappears
    create = document.querySelector('.createModal');
    create.style.display = 'none';
    newPost = document.querySelector('.create_post');
    newPost.addEventListener('click', () => {
        newPost.style.display = 'none';
        create.style.display = 'block';
        Page.style.display = 'none';
    })

    SubmitNewPost = document.querySelector('.createPost');
    SubmitNewPost.addEventListener('click', () =>{
        newPost.style.display = 'block';
        Page.style.display = 'none';
        create.style.display = 'none';
    })
    //Form submission
    const form = document.querySelector('.create');
    form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const formDataObject = {
            image: formData.get('image'),
            title: formData.get('title'),
            story: formData.get('story'),
            brand: formData.get('brand')
        };
        formDataObject.brand = formDataObject.brand.charAt(0).toUpperCase() + formDataObject.brand.slice(1).toLowerCase();
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
    //Form edit
    const posts = document.querySelectorAll('.post')
    posts.forEach(post => {
        const edit = post.querySelector('.editbtn'); //for edit button
        edit.addEventListener('click', () => {
            const title = post.querySelector('.post_title');
            const titleInput = document.createElement('input');
            titleInput.value = title.innerHTML;
            title.innerHTML = '';
            title.appendChild(titleInput);

            const story = post.querySelector('.post_story');
            const storyInput = document.createElement('input');
            storyInput.value = story.innerHTML;
            story.innerHTML = '';
            story.appendChild(storyInput);

            const saveBtn = document.createElement('button');
            saveBtn.classList.add(".save_brand");
            saveBtn.innerHTML = 'Save';
            story.appendChild(saveBtn);

            saveBtn.addEventListener('click', () => {
                const updatedPost = {
                    img: post.querySelector('.post_img').src,
                    title: titleInput.value,
                    story: storyInput.value,
                    brand: post.querySelector('.post_brand').innerHTML
                }
                updatePost(updatedPost);
                title.innerHTML = '';
                story.innerHTML = '';
                const updatedStoryContent = document.createElement('h3');
                const updatedTitleContent = document.createElement('h3');
                updatedStoryContent.innerHTML = storyInput.value;
                updatedTitleContent.innerHTML = titleInput.value;
                story.appendChild(updatedStoryContent);
                title.appendChild(updatedTitleContent);
                saveBtn.remove();
            })
        })
        //Form delete
        const deletebtn = post.querySelector('.deletebtn');
        const updatedPost = {
            img: post.querySelector('.post_img').src,
            title: post.querySelector('.post_title').innerHTML,
            story: post.querySelector('.post_story').innerHTML,
            brand: post.querySelector('.post_brand').innerHTML
        }
        deletebtn.addEventListener('click', async () => {
            deletePost(updatedPost)
        })
    })

    //Backend Edit/update call
    async function updatePost(updatedPost) {
        fetch('/posts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
    }
    //Backend delete call
    async function deletePost(postobject) {
        console.log(postobject.img)
        fetch('/posts/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postobject)
        })
    }
});

