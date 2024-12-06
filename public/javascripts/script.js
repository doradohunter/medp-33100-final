document.addEventListener('DOMContentLoaded', () => {
    //manual screen
    const header_brand = document.querySelectorAll('.header_brand');
    const header = document.querySelector('header');
    header.addEventListener('click', () => {
        header.style.display='none';
        header_brand.forEach(content => {
            content.style.animation = 'appear 3s forwards';
        })
    })

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
    const stage_categories = document.querySelectorAll('.category');
    stage_categories.forEach(cate =>{
        cate.addEventListener('click', () => {
            stage_categories.forEach(resetCate =>{
                resetCate.style.color = 'black'
                resetCate.style.backgroundColor = '#FAAF90'
                resetCate.style.boxShadow = 'none'
            })
            if(cate.value === true){
                cate.value = false;
                cate.style.color = 'black'
                cate.style.backgroundColor = '#FAAF90'
                cate.style.boxShadow = 'none'
            }else{
                cate.value = true;
                cate.style.color = 'white'
                cate.style.backgroundColor = '#8BABF1'
                cate.style.boxShadow = '#D4E8DE 2px 2px'
            }
        })
    })

});