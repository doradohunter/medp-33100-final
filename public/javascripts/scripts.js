document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

    //function to create memory element
    function createMemoryElement(memory) {
      const memoryElement = document.createElement("div");
      memoryElement.classList.add("card");
  
      memoryElement.innerHTML = `
          <div class="content">
            <div class="memory" id="${memory._id}">
              <h3 class="title">${memory.title}</h3>
              <img class="image" src="${memory.imageUrl}" alt="post image">
              <h5 class="emotion">${memory.emotion}</h5>
              <p class="description">${memory.description}</p>
              <p class="author">By: ${memory.author}</p>
              <h4 class="date">${memory.date}</h4>
              <button class="edit_button">Edit</button>
              <button class="delete_button">Delete</button>
            </div>
          </div>
        `;
      return memoryElement;
    }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
    alert("Memory Posted!");

    //create new memory
    const formData = new FormData(form);

    //get emotion dropdown
    const emotion = document.getElementById("emotion").value;
    console.log("selected emotion: ", emotion);

    fetch("/memories", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((memories) => {
        //after posting, append new memory to the list
        const memoriesContainer = document.querySelector(".memories_container");
        memoriesContainer.innerHTML = "";
        memories.forEach((memory) => {
          const memoryElement = createMemoryElement(memory);
          memoriesContainer.appendChild(memoryElement);
        })
      })
      .catch((error) => {
        console.log("error creating memory", error);
      });
  });

  //edit
  const memories = document.querySelectorAll(".memory");
  memories.forEach((memory) => {
    const editButton = memory.querySelector(".edit_button");
    editButton.addEventListener("click", () => {
      console.log("edit post");

      //title input field
      const title = memory.querySelector(".title");
      const titleInput = document.createElement("input");
      titleInput.value = title.innerText;
      titleInput.name = "title";
      titleInput.classList.add("title_input");
      title.innerHTML = "";
      title.appendChild(titleInput);

      //descrtiption input field
      const desc = memory.querySelector(".description");
      const descInput = document.createElement("input");
      descInput.value = desc.innerText;
      descInput.name = "description";
      descInput.classList.add("desc_input");
      desc.innerHTML = "";
      desc.appendChild(descInput);

      //save button
      const saveButton = document.createElement("button");
      saveButton.classList.add("save_button");
      saveButton.innerText = "Save";

      saveButton.addEventListener("click", async () => {

        const originalDate = memory.querySelector(".date").innerText;
        // const editedDateText = `${originalDate} (Edited)`;

        let editedDateText = originalDate;
        if (!originalDate.includes("(Edited)")) {
          editedDateText = `${originalDate} (Edited)`;
        }

        const updatedMemory = {
          memoryID: memory.id,
          title: titleInput.value,
          date: editedDateText,
          description: descInput.value,
          author: memory.querySelector(".author").innerText,
        };

        alert("Memory Saved Successfully!");
        console.log(updatedMemory);
        await updateMemory(updatedMemory);

        //fetch updated memories and rerender
        const response = await fetch("/memories");
        const memories = await response.json();

        const memoriesContainer = document.querySelector(".memories_container");
        memoriesContainer.innerHTML = ""; // Clear current list
        memories.forEach((memory) => {
          const memoryElement = createMemoryElement(memory);
          memoriesContainer.appendChild(memoryElement);
        });

        //revert all the elements back
        title.innerHTML = "";
        const updatedTitleEl = document.createElement("h4");
        updatedTitleEl.innerText = titleInput.value;
        title.appendChild(updatedTitleEl);

        const dateElement = memory.querySelector(".date");
        dateElement.innerText = editedDateText;

        desc.innerHTML = "";
        const updatedDescEl = document.createElement("p");
        updatedDescEl.innerText = descInput.value;
        desc.appendChild(updatedDescEl);

        saveButton.remove();
      });
      memory.appendChild(saveButton);
    });

    const deleteButton = memory.querySelector(".delete_button");
    deleteButton.addEventListener("click", async () => {
      deleteMemory(memory.id);
      alert("Memory Deleted!");

      // Fetch the updated list of memories and re-render it
      const response = await fetch("/memories");
      const memories = await response.json();

      const memoriesContainer = document.querySelector(".memories_container");
      memoriesContainer.innerHTML = ""; // Clear current list
      memories.forEach((memory) => {
        const memoryElement = createMemoryElement(memory);
        memoriesContainer.appendChild(memoryElement);
      });
    });

    //filters
    const filterButtons = document.querySelectorAll(".filter-button");

    //event listeners
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedEmotion = button.getAttribute("data-emotion");

        //remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        //add active clss to clickd button
        button.classList.add("active");

        //fetch based on emotion
        fetchFilteredMemories(selectedEmotion);
      });
    });
  });

  async function fetchFilteredMemories(emotion) {
    const response = await fetch(`/memories?emotion=${emotion}`);
    const memories = await response.json();

    // Update the DOM with the filtered memories
    const memoriesContainer = document.querySelector(".memories_container");
    memoriesContainer.innerHTML = ""; // Clear current memories

    memories.forEach((memory) => {
      const memoryElement = createMemoryElement(memory);
      memoriesContainer.appendChild(memoryElement);
    });
  }



  async function updateMemory(updatedMemory) {
    await fetch("/memories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMemory),
    });
  }
  

  async function deleteMemory(memoryID) {
    fetch("/memories/" + memoryID, {
      method: "DELETE",
      // headers: {
      //     'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(updatedMemory)
    });
  }
  
});
