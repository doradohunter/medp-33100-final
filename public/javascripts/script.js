document.addEventListener('DOMContentLoaded', ()=>{

    //create an account and add a new author
    const newAccountForm = document.querySelector('#new-account')
    newAccountForm.addEventListener('submit', ()=>{

        const formData = new FormData(newAccountForm);

        const formDataObject = {
            username: formData.get('usernameInput'),
            email: formData.get('emailInput')
        }

        fetch('/authors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })

    //create a new entry
    const newEntryForm = document.querySelector('#new-entry')
    newEntryForm.addEventListener('submit', ()=>{

        const formData = new FormData(newEntryForm);

        const formDataObject = {
            game_name: formData.get('nameInput'),
            image_url: formData.get('imageInput'),
            author: formData.get('authorInput'),
            platform: formData.get('platformInput'),
            entry_text: formData.get('bodyInput')
        }

        fetch('/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
})