window.addEventListener("DOMContentLoaded", init);

function init() {
  loadData();
  console.log("hej");
}

async function loadData() {
  const response = await fetch(
    "http://mdesign.dk/recreate-bikeshop/wp-json/wp/v2/bike?_embed"
  );
  //   console.log(response);
  const bikeData = await response.json();

  displayBike(bikeData);
}

async function displayBike(bikes) {
  bikes.forEach((bike) => {
    console.log("bike", bike);
    //Step 1: Chose the <template>'s content
    const clone = document.querySelector("#myTemplate").content;

    //Step 2: Make a "clone"
    const copy = clone.cloneNode(true);

    //Step 3: Change the content
    copy.querySelector(".brand").textContent = bike.brand;
    copy.querySelector("h2").textContent = bike.title.rendered;
    copy.querySelector(".price span").textContent = `$${bike.price}`;
    copy.querySelector(".colours span").textContent = bike.colors;
    copy.querySelector(".stock span").textContent = bike.in_stock;
    copy.querySelector("article img").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium.source_url;

    //...

    //Step 4: Chose the new "parent" element
    const parentElement = document.querySelector("section");

    //Step 5: Add (Append) the clone to the DOM
    parentElement.appendChild(copy);
  });
}
