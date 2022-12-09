async function getItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/birds/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getAll() {
  try {
    const response = await fetch(`http://localhost:3000/birds`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteBird(id) {
  try {
    const options = { method: "DELETE" };
    await fetch(`http://localhost:3000/birds/${id}`, options);
    window.location.hash = "#birds";
  } catch (err) {
    console.log(err);
  }
}

async function postBird(e) {
  e.preventDefault();
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))), // IMPORTANT
    };
    const response = await fetch(`http://localhost:3000/birds`, options);
    const { id, err } = await response.json();
    if (err) {
      throw new Error(err);
    } else {
      window.location.hash = `#birds/${id}`;
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateBird(e) {
  e.preventDefault();
  let birdObj = Object.fromEntries(new FormData(e.target)); // uses name attribute as key
  console.log(birdObj);
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(birdObj),
    };
    let birdId = birdObj.id;
    const response = await fetch(
      `http://localhost:3000/birds/${birdId}`,
      options
    );
    const { id, err } = await response.json();
    if (err) {
      throw new Error(err);
    } else {
      window.location.hash = `#birds/${id}`;
    }
  } catch (err) {
    console.log(err);
  }
}
