document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('.create');

    form.addEventListener('submit', (e) => {
        // e.preventDefault();
        console.log('submitted');

        const formData = new FormData(form);

        const formDataObject = {
            image:formData.get('image'),
            title:formData.get('title'),
            story:formData.get('story'),
            story:formData.get('brand')
        }
        fetch('/posts', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
});