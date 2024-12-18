document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('.create');

    form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const formDataObject = {
            image:formData.get('image'),
            title:formData.get('title'),
            story:formData.get('story'),
            brand:formData.get('brand')
        };
        formDataObject.brand = formDataObject.brand.charAt(0).toUpperCase() + formDataObject.brand.slice(1).toLowerCase();
        fetch('/posts', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
    const posts = document.querySelectorAll('.post')
    posts.forEach(post =>{
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
            saveBtn.classList.add("post_brand");
            saveBtn.innerHTML='Save';
            story.appendChild(saveBtn);
        })
    })
});

