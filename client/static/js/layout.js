const main = document.querySelector("main");

window.addEventListener("hashchange", updateContent);

function updateContent() {
  let hash = window.location.hash.substring(1);
  updateMain(hash);
}

function updateMain(hash) {
  main.innerHTML = "";
  if (hash) {
    let [root, id, key] = hash.split("/");
    if (key == "edit") {
      renderEditBirdForm(id);
    } else if (id) {
      getABird(id);
    } else {
      loadAllBirds();
    }
  } else {
    const header = document.createElement(h1);
    header.className = "title";
    header.textContent = "Welcome to BirdAir";
    main.appendChild(header);
  }

  async function loadAllBirds() {
    const data = await getAll();
    data.forEach((bird) => renderBird(bird));
  }

  async function getABird(id) {
    if (id == "new") {
      renderNewBirdForm();
    } else {
      const bird = await getItem(id);
      renderBird(bird);
      renderDelButton(bird);
      renderEditButton(bird);
    }
  }

  async function renderEditBirdForm(id) {
    let card = document.createElement("div");
    card.classList.add("card");
    const header = document.createElement("h2");
    header.classList.add("bird-header");
    header.textContent = `Editing bird with ID of ${id}`;
    card.appendChild(header);
    main.appendChild(card);

    const bird = await getItem(id);
    const form = document.createElement("form");
    const name = document.createElement("input");
    const age = document.createElement("input");

    const btn = document.createElement("button");
    btn.textContent = "Edit a bird";

    const formId = document.createElement("input");
    formId.value = id;
    formId.setAttribute("name", "id");
    formId.style.display = "none";

    name.setAttribute("name", "name");
    age.setAttribute("name", "age");

    name.value = bird.name;
    age.value = bird.age;

    form.onsubmit = updateBird;

    form.appendChild(name);
    form.appendChild(age);
    form.appendChild(formId);
    form.appendChild(btn);

    card.appendChild(header);
    card.appendChild(form);
    main.appendChild(card);
  }

  function renderNewBirdForm() {
    let card = document.createElement("div");
    card.classList.add("card");

    const header = document.createElement("h2");
    header.classList.add("bird-header");
    header.textContent = "Add a bird";

    const form = document.createElement("form");
    const name = document.createElement("input");
    const age = document.createElement("input");

    const btn = document.createElement("button");
    btn.textContent = "Add a bird";
    btn.setAttribute("type", "submit");

    name.setAttribute("name", "name");
    age.setAttribute("name", "age");
    name.setAttribute("placeholder", "Enter bird name...");
    age.setAttribute("placeholder", "Enter bird age...");

    form.onsubmit = postBird;
    form.appendChild(name);
    form.appendChild(age);
    form.appendChild(btn);

    card.appendChild(header);
    card.appendChild(form);
    main.appendChild(card);
  }

  function renderBird(bird) {
    let card = document.createElement("div");
    card.classList.add("card");

    const header = document.createElement("h2");
    header.classList.add("bird-header");

    const details = document.createElement("p");
    details.classList.add("bird-details");

    header.textContent = `${bird.name}`;
    details.textContent = `${bird.name} is ${bird.age} years old.`;

    const detlink = document.createElement("a");
    detlink.href = `#birds/${bird.id}`;
    detlink.textContent = "Click for more";

    card.appendChild(header);
    card.appendChild(details);
    card.appendChild(detlink);

    main.appendChild(card);
  }

  function renderDelButton(bird) {
    const card = document.querySelector(".card");
    const del = document.createElement("button");
    del.textContent = "Delete bird";
    del.addEventListener("click", () => {
      deleteBird(bird.id);
    });
    card.appendChild(del);
  }

  function renderEditButton(bird) {
    const card = document.querySelector(".card");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit bird";
    editBtn.addEventListener("click", () => {
      window.location.hash = `#birds/${bird.id}/edit`;
    });
    card.appendChild(editBtn);
  }
}
