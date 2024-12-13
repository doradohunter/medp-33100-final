document.addEventListener('DOMContentLoaded', () => {
    //manual screen
    const header_brand = document.querySelectorAll('.header_brand');
    const header = document.querySelector('header');
    const header_toggle = () => {
        header.style.display='none';
        header_brand.forEach(content => {
            content.style.animation = 'appear 3s forwards';
        })
    }
    if(sessionStorage.getItem('newUser') === null){
        sessionStorage.setItem('newUser', false);
        header.addEventListener('click', () => {
            header_toggle()
        })
    }else{
        header.style.display='none';
        header_brand.forEach(content => {
            content.style.opacity = '100%';
        })
    }

    //minimize
    const planting_positives = document.querySelector('.why_plant');
    const planting_image = document.querySelector('.plant_image')
    const minimize = document.querySelector('.minimize_icon');
    const plant_icon = document.querySelector('.plant_icon');
    minimize.addEventListener('click', () => {
        planting_positives.style.display = 'none';
        planting_image.style.display = 'none';
        plant_icon.style.visibility = 'visible';
        expand_bulb.style.visibility = 'visible';
    })
    const expand_bulb = document.querySelector('.expand_lightbulb');
    const expand_bubble = () => {
        planting_positives.style.display = 'block';
        planting_image.style.display = 'block';
        plant_icon.style.visibility = 'hidden';
        expand_bulb.style.visibility = 'hidden';
    }
    expand_bulb.addEventListener('click', expand_bubble)
    plant_icon.addEventListener('click', expand_bubble)

    //clicked sortby category
    const entry_container = document.querySelector('.plant_structure')
    const stage_categories = document.querySelectorAll('.category');
    const stage_options = document.querySelectorAll('.stage_option');
    const plantEntries = document.querySelectorAll('.plant_entry')

    let entryList = {};
    let entryToggle = false;
    let allEntryElements = [];
    const getSortedData = (selectedStage) => {
        let entryElement = []
        if(entryToggle === false){
            plantEntries.forEach(entry => {
                //create a full list of all entries once
                let entryStage = entry.querySelector('.plantStage').innerHTML
                let entryID = entry.classList[1]
                entryList[entryID] = entryStage
                allEntryElements.push(entry)
            })
            entryToggle = true;
        }else{
            allEntryElements.forEach(element => { //reset document
                entry_container.appendChild(element)
            })
            for (const key in entryList){   //get filter list
                if(entryList[key] === selectedStage + ' stage'){
                    entryElement.push(document.querySelector(`.${key}`))
                }
            }
            entry_container.innerHTML = ''
            entryElement.forEach(element => {   //set filtered result to document
                entry_container.appendChild(element)
            })
        }
    }
    getSortedData(null)

    const selected_stage = (element, select) => {
        if(select.value === true){ //clicked twice
            element===stage_categories ? select.value = false : null;
            select.style.color = 'black'
            select.style.backgroundColor = '#FAAF90'
            select.style.boxShadow = 'none'
            allEntryElements.forEach(element => {
                entry_container.appendChild(element)
            })
        }else{  //clicked once
            element.forEach(deselect =>{
                deselect.innerHTML != select.innerHTML? deselect.value = false : null
                if(element === stage_categories){
                    deselect.style.color = 'black'
                    deselect.style.backgroundColor = '#FAAF90'
                    deselect.style.boxShadow = 'none'
                }else{
                    deselect.style.color = 'black'
                    deselect.style.backgroundColor = '#D4E8DE'
                    deselect.style.boxShadow = 'none'
                }
            })
            if (element === stage_categories){
                getSortedData(select.innerHTML)
                select.value = true
            }
            select.style.color = 'white'
            select.style.backgroundColor = '#8BABF1'
            select.style.boxShadow = '#D4E8DE 2px 2px'
        }
    }
    stage_categories.forEach(cate =>{
        cate.addEventListener('click', () => {
            selected_stage(stage_categories, cate)
        })
    })

    let plant_stage = '67537aff65d259ca6d6088c5'
    let plant_stage_name = 'Sprouting'
    stage_options.forEach(opt => {
        if(opt.innerHTML === 'Sprouting'){
            opt.classList.add('default_stage')
        }
        opt.addEventListener('click', () => {
            selected_stage(stage_options, opt)
            plant_stage = opt.id
        })
    })

    //create plant entry
    const denied_post = document.querySelector('.post_denied');
    const post_entry_container = document.querySelector('.post_container');
    const create_icon = document.querySelector('.add_post_icon');
    create_icon.addEventListener('click', () => {
        post_entry_container.style.display = "flex";
        denied_post.style.display = 'none';
    })

    //cancel plant entry
    const cross_icon = document.querySelector('.cancel_post_entry');
    cross_icon.addEventListener('click', () => {
        post_entry_container.style.display = "none";
    })

    //post plant entry
    const form = document.querySelector('.post_entry_container');
    const plant_name = document.querySelector('.name_of_plant');
    const plant_entry = document.querySelector('.entry_description');
    const uploaded_image = document.querySelector('.upload_image');
    const select_dropdown = document.querySelector('.entry_stage_drop');

    select_dropdown.addEventListener('click', () => {
        const selection_dropdown = document.querySelector('.stage_drop')
        plant_stage = selection_dropdown[selection_dropdown.selectedIndex].id
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(plant_name.value.length != 0 && plant_entry.value.length != 0 && uploaded_image.value != 0){
            post_entry_container.style.display = 'none';

            //add plant entry to entries
            const formData = new FormData(form);
            if(formData.get('image') === null){
                console.log('nothing here')
            }
            formData.append('stageID', plant_stage)

            await fetch('/entry', {
                method: 'POST'
                ,body: formData
            });
            location.reload();
        }else{
            denied_post.style.display = 'block';
        }
    })

    // open to view post
    const planted_container = document.querySelector('.planted_container')
    
    // edit a post
    let postID = ''
    const allEditIcons = document.querySelectorAll('.edit_icon');
    
    const og_plant_stage_input = document.querySelector('.stage_drop')
    const plant_stage_input = og_plant_stage_input.cloneNode(true)

    //keep old information
    let edit_icon, current_name, current_entry, current_stage, current_comment_section, clone_confirm_edit_button, editing;

    //get and set/reset new values from edited changes
    let newPlantName, newPlantEntry = '';
    const getandputEdits = (entryNum, save) => {
        if(save === true){
            newPlantName = document.querySelector('.newPlantName').value
            newPlantEntry = document.querySelector('.newPlantEntry').value

            const viewName = document.querySelector(`.plant_entry.${entryNum}`).querySelector('.plantName')
            const viewStage = document.querySelector(`.plant_entry.${entryNum}`).querySelector('.plantStage')
            viewName.innerHTML = newPlantName;
            viewStage.innerHTML = (plant_stage_name != current_stage) ? plant_stage_name + ' stage': current_stage + ' stage';
        }
        
        //plant name
        const content_header = document.querySelector(`.header_edit_post.${entryNum}`);
        const edited_plant_name = document.createElement('h2');
        edited_plant_name.classList.add('plantedName', entryNum)
        edited_plant_name.innerHTML = (save === true) ? newPlantName : current_name;
        content_header.innerHTML = '';
        content_header.appendChild(edited_plant_name);
        content_header.appendChild(edit_icon);
        //plant entry
        const content_entry = document.querySelector(`.entry_edit_post.${entryNum}`);
        const edited_plant_entry = document.createElement('p');
        edited_plant_entry.classList.add('plantEntry', entryNum);
        edited_plant_entry.innerHTML = (save === true) ? newPlantEntry : current_entry;
        content_entry.innerHTML = '';
        content_entry.appendChild(edited_plant_entry)
        //stage
        const content_stage = document.querySelector(`.stage_edit_post.${entryNum}`);
        const edited_plant_stage = document.createElement('p');
        edited_plant_stage.classList.add('plantStage', entryNum);
        edited_plant_stage.innerHTML = (save === true) ? plant_stage_name : current_stage;
        content_stage.innerHTML = '';
        content_stage.appendChild(edited_plant_stage)
        //comment section
        const content_comment = document.querySelector(`.comment_section.${entryNum}`);
        content_comment.innerHTML = ''
        content_comment.appendChild(current_comment_subheader);
        content_comment.appendChild(current_comment_section);
        const content_planted_entry = document.querySelector(`.planted.${entryNum}`);
        content_planted_entry.appendChild(clone_confirm_edit_button)
    }

    // open to view post
    plantEntries.forEach(entry => {
        let entry_area = entry.querySelector('.plant_preview') 
        entry_area.addEventListener('click', () => {
            planted_container.style.display = 'flex';
            document.querySelector(`.planted.${entry.classList[1]}`).style.display = 'block'

            allEditIcons.forEach(edit => {
                edit.addEventListener('click', () => {
                    editing = true;
                    const thisPostID = edit.parentElement
                    postID = document.querySelector(`.planted.${thisPostID.classList[1]}`).id

                    //header elements
                    const edit_plant_name = document.querySelector(`.plantedName.${thisPostID.classList[1]}`);
                    const content_header = document.querySelector(`.header_edit_post.${thisPostID.classList[1]}`);
                    //entry elements
                    const edit_plant_entry = document.querySelector(`.plantEntry.${thisPostID.classList[1]}`);
                    const content_entry = document.querySelector(`.entry_edit_post.${thisPostID.classList[1]}`);
                    //stage elements
                    const edit_stage_entry = document.querySelector(`.plantStage.${thisPostID.classList[1]}`);
                    const content_stage = document.querySelector(`.stage_edit_post.${thisPostID.classList[1]}`);
                    //comment elements
                    const confirm_edit_button = document.querySelector(`.confirm_edit_button.${thisPostID.classList[1]}`)
                    const comment_section = document.querySelector(`.comment_section.${thisPostID.classList[1]}`)
                    //keep current data
                    edit_icon = content_header.querySelector('.edit_icon').cloneNode(true);
                    current_name = edit_plant_name.innerHTML;
                    current_entry = edit_plant_entry.innerHTML;
                    current_stage = edit_stage_entry.innerHTML;
                    current_comment_subheader = comment_section.querySelector('.subheader');
                    current_comment_section = comment_section.querySelector('.add_comment');
                    clone_confirm_edit_button = confirm_edit_button.cloneNode(true);
                    
                    //edit post header
                    const plant_official_name_input = document.createElement('input');
                    plant_official_name_input.classList.add('newPlantName');
                    plant_official_name_input.value = current_name;
                    content_header.innerHTML = '';
                    content_header.appendChild(plant_official_name_input);

                    //edit post entry
                    const plant_entry_input = document.createElement('textarea');
                    plant_entry_input.classList.add('newPlantEntry')
                    plant_entry_input.value = current_entry;
                    content_entry.innerHTML = '';
                    content_entry.appendChild(plant_entry_input);

                    //edit entry stage
                    content_stage.innerHTML = '';
                    plant_stage_input.classList.add('edit_stage')
                    plant_stage_input.value = current_stage
                    plant_stage = plant_stage_input[plant_stage_input.selectedIndex].id
                    content_stage.appendChild(plant_stage_input)
                    
                    content_stage.addEventListener('click', () => {
                        plant_stage_name = plant_stage_input[plant_stage_input.selectedIndex].innerHTML
                        plant_stage = plant_stage_input[plant_stage_input.selectedIndex].id
                    })
                    //put save changes button
                    comment_section.innerHTML = ''
                    comment_section.appendChild(confirm_edit_button)
                    confirm_edit_button.style.display = 'flex';
                    
                    //confirm changes
                    confirm_edit_button.addEventListener('click', () => {
                        getandputEdits(thisPostID.classList[1], true)
                        const updatedPost = {
                            postID: postID
                            ,name: newPlantName
                            ,entry: newPlantEntry
                            ,stageID: plant_stage
                        }
                        updatePlantPost(updatedPost)
                        setTimeout(() => {
                            location.reload();
                        }, 200)
                    })
                })
            })
        })
    })

    // close viewing post
    const allPostedEntires = document.querySelectorAll('.planted')
    const close_post = document.querySelectorAll('.close_post')
    close_post.forEach(icon => {
        icon.addEventListener('click', () => {
            planted_container.style.display = 'none';
            allPostedEntires.forEach(entry => {
                entry.style.display = 'none'
            })
            if(editing === true){
                getandputEdits(icon.classList[1],false)
                editing = false;
            }
            
        })
    })
    
    // delete a post
    const cut_away = document.querySelectorAll('.delete_cut')
    cut_away.forEach(entry => {
        entry.addEventListener('click', () => {
            deletePlantPosted(entry.parentElement.id)
            location.reload();
        })
    })
});

async function deletePlantPosted(postID){
    fetch('entry/' + postID, {
        method: 'DELETE'
    })
}

async function updatePlantPost(updatePost){
    fetch('/entry', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePost)
    });
}

//COMMENTS, responsive, gsap