fetch('https://fakestoreapi.com/products/')
  .then(res => res.json())
  .then((data) => {
    const filteredData = data.filter(item => item.category === "electronics");
    let products = "";
    filteredData.map((values) => {
      products += `
        <div class="card">
          <h3 class="category">${values.category}</h3>
          <img src=${values.image} alt="image" class="image">
          <h5 class="description">${values.description}</h5>
          <h4 class="price">${values.price} KSH</h4>
          <button>Add Cart</button>
        </div>
      `;
    });
    document.getElementById("products").innerHTML = products;
  })
  .catch((error) => {
    console.log("Error:", error);
  });

 