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

    // update entry
    const entries = document.querySelectorAll(".entry");
    entries.forEach(entry => {
        const edit_button = entry.querySelector(".edit_button");
        edit_button.addEventListener('click', ()=>{

            //edit name
            const gameName = entry.querySelector(".game_name");   
            const gameEdit = document.createElement('input');
            gameEdit.value = gameName.innerText;
            gameName.innerHTML="";
            gameName.appendChild(gameEdit);

            //edit image url
            const image = entry.querySelector('.game_image');
            const image_url = entry.querySelector('.game_image_url')
            const imageEdit = document.createElement('input');
            image_url.style.display='none'
            imageEdit.value = image_url.src;
            image.appendChild(imageEdit);

            // //edit author
            // const username = entry.querySelector(".author");   
            // const usernameEdit = document.createElement('input');
            // usernameEdit.value = username.innerText;
            // username.innerHTML="";
            // username.appendChild(usernameEdit);

            //edit body text
            const body = entry.querySelector(".entry_text");   
            const bodyEdit = document.createElement('textarea');
            bodyEdit.value = body.innerText;
            bodyEdit.rows="4"
            bodyEdit.cols="50"
            body.innerHTML="";
            body.appendChild(bodyEdit);

            //hide date, author, platform, delete button

            const date = entry.querySelector('.date')
            const author = entry.querySelector('.author')
            const platform = entry.querySelector('.platform')
            const delete_button = entry.querySelector('.delete_button')

            date.style.display='none';
            author.style.display='none';
            platform.style.display='none';
            delete_button.style.display='none';

            //save changes
            const saveButton = document.createElement('button')
            saveButton.classList.add("saveButton");
            saveButton.innerText = "Save Changes"
            saveButton.addEventListener('click', async ()=>{
                const updatedGame = gameEdit.value;
                const updatedUrl = imageEdit.value;
                const updatedBody = bodyEdit.value

                const updatedInfo = {
                    id: entry.id,
                    game_name: updatedGame,
                    image_url: updatedUrl,
                    entry_text: updatedBody
                }
                await updateEntry(updatedInfo)
                location.reload();
            })
            entry.appendChild(saveButton)
        });

        // // delete entry
        // const deleteButton = entry.querySelector('.deleteButton')
        // deleteButton.addEventListener('click', async ()=>{
        //     await deleteentry(entry.id)
        //     location.reload();
        // })
    });

    async function updateEntry(info) {
        fetch('/entries', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
    }
})