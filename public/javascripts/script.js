document.addEventListener('DOMContentLoaded', () =>{
    const start = document.querySelector(".start")
    //click star button
    start.addEventListener("click", () => {

        const secondPage = document.querySelector("#main-content")
        const firstPage = document.querySelector("#intro-screen")
        firstPage.style.display = "none"
        secondPage.style.display = "block"
    })

    //get form information and POST it
    const form = document.getElementById("review-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formDataObject = {
            name: formData.get('name'),
            restaurantName: formData.get('restaurantName'),
            rating: formData.get('rating'),
            notes: formData.get('notes'),
            tags: formData.get('tags')
        };
        console.log(formDataObject)
        fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        //reload page
        window.location.reload();
        form.reset();
    })

    const reviews = document.querySelectorAll('.review')
    reviews.forEach(review => {

        const delete_button = review.querySelector(".delete")
        delete_button.addEventListener("click", () => {
            const reviewId = delete_button.getAttribute('review-id');
            fetch(`/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(window.location.reload())
        })
    })

    const reset = document.querySelector(".reset")
    reset.addEventListener("click", () => {

        window.location.reload();
    })


    //used help from chatgpt to figure out how to filter using the "foo-tag"
    const filterButtons = document.querySelectorAll('.filter-button');

    function filterReviews(tag) {
        reviews.forEach(function(review) {
          const tags = review.getAttribute('food-tag');
          if (tags.includes(tag)) {
            review.style.display = 'block';
          } else {
            review.style.display = 'none';
          }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tag = this.getAttribute('food-tag'); 
          filterReviews(tag); 
        });
      });
})

