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
            console.log(post);
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
            saveBtn.innerHTML='Save';
            story.appendChild(saveBtn);

            saveBtn.addEventListener('click', () => {
                const newTitle = titleInput.value;
                const newStory = storyInput.value; 
                const updatedPost = {
                    img: post.querySelector('.post_img').src,
                    title: newTitle,
                    story: newStory,
                    brand: post.querySelector('.post_brand').innerHTML
                }
                // console.log(updatedPost.title)
                // console.log(updatedPost.story)
                // console.log(updatedPost.brand)
                console.log(updatedPost)
                updatePost(updatedPost);
            })
        })
    })

    async function updatePost(updatedPost){
        fetch('/posts', {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
    }
});

