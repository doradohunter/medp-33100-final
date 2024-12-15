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
    //if first time user lands on webpage show instructions
    if(sessionStorage.getItem('newUser') === null){
        sessionStorage.setItem('newUser', false);
        header.addEventListener('click', () => {
            header_toggle()
        })
    }else{  //else don't show instructions while webpage is open on users browser
        header.style.display='none';
        header.style.opacity='0%';
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

    //mobile category
    const stage_button = document.querySelector('.cate_stage')
    const cate = document.querySelectorAll('.cate');
    const setSelectedMob = (selectedStage) => {
        cate.forEach(stage => {
            stage.classList.remove('selected_cate')
            if(stage.innerHTML === selectedStage){
                stage.classList.add('selected_cate')
            }
        })
    }

    let entryList = {};
    let entryToggle = false;
    let allEntryElements = [];
    
    //display all entries (default view)
    const renderAllEntries = () => {
        allEntryElements.forEach(element => {
            entry_container.appendChild(element)
        })
    }

    //get filtered entries
    let curr_web_stage;
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
            curr_web_stage = selectedStage;
            stage_button.innerHTML = selectedStage
            renderAllEntries() //reset document
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
            if(element === stage_categories){
                select.value = false;
                setSelectedMob('None');
                stage_button.innerHTML = 'None';
            }
            select.style.color = 'black'
            select.style.backgroundColor = '#FAAF90'
            select.style.boxShadow = 'none'
            renderAllEntries()
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
                setSelectedMob(curr_web_stage)  //FE
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

    // create plant entry stage options
    let plant_stage = '67537aff65d259ca6d6088c5'
    let plant_stage_name = 'Sprouting'
    stage_options.forEach(opt => {
        if(opt.innerHTML === 'Sprouting'){
            opt.classList.add('default_stage')
        }
        opt.addEventListener('click', () => {
            selected_stage(stage_options, opt)
            plant_stage_name = opt.innerHTML
            plant_stage = opt.id
        })
    })

    // CREATE plant entry
    const denied_post = document.querySelector('.post_denied');
    const post_entry_container = document.querySelector('.post_container');
    const create_icon = document.querySelector('.add_post_icon');
    create_icon.addEventListener('click', () => {
        post_entry_container.style.display = "flex";
        denied_post.style.display = 'none';
    })
    
    // CANCEL plant entry
    const cross_icon = document.querySelector('.cancel_post_entry');
    cross_icon.addEventListener('click', () => {
        post_entry_container.style.display = "none";
    })

    // DELETE a plant entry
    const cut_sfx = document.querySelector('.cut_sfx');
    const cut_away = document.querySelectorAll('.delete_cut');
    cut_away.forEach(entry => {
        entry.addEventListener('click', () => {
            deletePlantPosted(entry.parentElement.id)
            dropLeaf(`.${entry.parentElement.classList[0]}.${entry.parentElement.classList[1]}`)
            cut_sfx.play()
            document.querySelector('body').style.cursor = 'wait'
            stallReload(1500);
        })
    })

    //post plant entry
    const post_sfx = document.querySelector('.bubble_pop');
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

            const formData = new FormData(form);

            // grow a temp new entry leaf
            post_sfx.play();
            const new_plant_entry = document.createElement('div')
            const clone_cut = document.querySelector('.delete_cut').cloneNode(true);
            const clone_preview = document.querySelector('.plant_preview').cloneNode(true);
            new_plant_entry.appendChild(clone_cut)
            new_plant_entry.appendChild(clone_preview)
            new_plant_entry.classList.add('plant_entry', 'new_plant_entry', `entry_${document.querySelectorAll('.plant_entry').length+1}`)
            new_plant_entry.querySelector('.plantName').innerHTML = formData.get('name')
            new_plant_entry.querySelector('.plantStage').innerHTML = plant_stage_name + ' stage'
            entry_container.appendChild(new_plant_entry);

            post_entry_container.style.display = 'none'
            growLeaf(`.new_plant_entry.entry_${document.querySelectorAll('.plant_entry').length}`);

            //add plant entry to entries
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

    // edit a post
    let postID = ''
    const allEditIcons = document.querySelectorAll('.edit_icon');
    const og_plant_stage_input = document.querySelector('.stage_drop')
    const plant_stage_input = og_plant_stage_input.cloneNode(true)
    // keep current/old information
    let edit_icon, current_name, current_entry, current_stage, current_comment_subheader, current_comment_section, clone_confirm_edit_button, editing;

    // GET AND SET/RESET new values from edited changes (reseting changes are depreciated)
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
        const content_comment = document.querySelector(`.comment_entry_section.${entryNum}`);
        content_comment.innerHTML = ''
        content_comment.appendChild(current_comment_subheader);
        content_comment.appendChild(current_comment_section);
        const content_planted_entry = document.querySelector(`.planted.${entryNum}`);
        content_planted_entry.querySelector('.comment_section').style.display = (save === true) ? 'none' : 'block';
        content_planted_entry.appendChild(clone_confirm_edit_button)
    }

    // OPEN to view post
    const planted_container = document.querySelector('.planted_container')
    plantEntries.forEach(entry => {
        let entry_area = entry.querySelector('.plant_preview') 
        entry_area.addEventListener('click', () => {
            sessionStorage.setItem('viewPost', `.planted.${entry.classList[1]}`)
            
            planted_container.style.display = 'flex';
            document.querySelector(`.planted.${entry.classList[1]}`).style.display = 'block'
        })
    })

    // EDIT view post
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
            const comment_section = document.querySelector(`.comment_entry_section.${thisPostID.classList[1]}`)
            //keep current data
            edit_icon = content_header.querySelector('.edit_icon');
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

            //hide comment_section
            document.querySelector(`.planted.${thisPostID.classList[1]}`).querySelector('.comment_section').style.display = 'none'

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
                stallReload(200)

            })
        })
    }) 


    // CLOSE viewing post
    const allPostedEntires = document.querySelectorAll('.planted')
    const close_post = document.querySelectorAll('.close_post')
    close_post.forEach(icon => {
        icon.addEventListener('click', () => {
            sessionStorage.setItem('viewPost', 'close')

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

    // keep a post open for comment to load
    if(sessionStorage.getItem('viewPost') === 'close'){
        planted_container.style.display = 'none';
    }else if(typeof(sessionStorage.getItem('viewPost')) != typeof(null) ){
        planted_container.style.display = 'flex';
        document.querySelector(sessionStorage.getItem('viewPost')).style.display = 'block';
    }
    // POST a comment
    const comment_input = document.querySelectorAll('.create_comment');
    comment_input.forEach(input => {
        input.addEventListener('change', () => {
            if(input.value != 0){
                const comment_input_button = document.querySelector(`.comment_button.${input.classList[1]}`)
                const submit_comments = () => {
                   
                    let post_comment = {
                        postID: input.parentElement.parentElement.parentElement.id
                        ,text: input.value
                    }

                    fetch('/comments', {
                        method: 'POST'
                        ,headers: {
                            'Content-Type': 'application/json'
                        }
                        ,body: JSON.stringify(post_comment)
                    });
                    
                    stallReload(200)
                }
                comment_input_button.addEventListener('click', submit_comments)
                comment_input_button.addEventListener('keypress', (e) => {
                    if(e.key == 'Enter'){
                        submit_comments()
                    }
                })
            }
        })
    })
    //DELETE a comment
    const del_comment = document.querySelectorAll('.del_comment');
    del_comment.forEach(comment => {
        comment.addEventListener('click', () => {
            deleteComment(comment.parentElement.id)
            stallReload()
        })
    })

    // wait to reload
    const stallReload = (delay) => {
        setTimeout(() => {
            location.reload();
        }, delay)
    }

    //mobile sort by stage
    const cate_stage_container = document.querySelector('.cate_container');
    const cate_dropdown = document.querySelector('.cate_dropdown');
    stage_button.innerHTML = 'None';
    cate_dropdown.addEventListener('click', () => {
        cate_stage_container.style.display = 'flex';
    })
    let curr_mob_stage;

    cate.forEach(stage => {
        stage.addEventListener('click', () => {
            setSelectedMob(stage.innerHTML)
            stage.classList.add('selected_cate')
            if(stage.innerHTML === 'None'){
                curr_mob_stage.value = true;
                selected_stage(stage_categories, document.querySelector(`.category.${curr_mob_stage}`))
                renderAllEntries()
                stage_button.innerHTML = 'None';
            }else{
                selected_stage(stage_categories, document.querySelector(`.category.${stage.classList[1]}`));
                getSortedData(stage.innerHTML);
                curr_mob_stage = stage.classList[1];
            }
        })
    })
    cate_stage_container.addEventListener('click', () => {
       cate_stage_container.style.display = 'none'
    })

    //GSAP animation
    // Delete animation
    const dropLeaf = (entryClassNum) => {
        let leaf = gsap.timeline();
        let rotateAngle = (entryClassNum.slice(-1)%2===0) ? -1 : 1; 
        leaf.to(entryClassNum, {duration: .5, rotate:30*rotateAngle, ease: "circ.out", y:50})
            .to(entryClassNum, {duration: .5,rotate:0, ease: "circ.out", y:70, opacity: 0})
    }

    // Grow animation
    const growLeaf = (entryClassNum) => {
        let scaleAngle = (entryClassNum.slice(-1)%2===0) ? 'left bottom' : 'right bottom'
        gsap.to(entryClassNum, {duration: 2, ease:"circ.out", opacity: 1, scale: 1, transformOrigin: scaleAngle})
    }

});

async function deletePlantPosted(postID){
    fetch('entry/' + postID, {
        method: 'DELETE'
    })
}

async function deleteComment(commentID){
    fetch('comments/' + commentID, {
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