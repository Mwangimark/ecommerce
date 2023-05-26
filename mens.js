fetch('https://fakestoreapi.com/products/')
  .then(res => res.json())
  .then((data) => {
    const filteredData = data.filter(item => item.category === "men's clothing");
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

  //In this code, the filter method is applied to the data array to create a new array (filteredData) containing only the items with the category "men's clothing." Then, the code proceeds to map over the filtered data to generate the HTML content and display it on the web page.

//Please note that the URL used for fetching the data does not include a specific category filter. Instead, all the products are fetched first, and then the filtering is performed on the client side