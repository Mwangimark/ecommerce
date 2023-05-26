// JavaScript code

// Fetching data
fetch('https://fakestoreapi.com/products/')
  .then(res => res.json())
  .then((data) => {
    let products = "";
    data.map((values, i) => {
      products += `
        <div class="card" data-index="${i}">
          <h3 class="category">${values.category}</h3>
          <img src="${values.image}" alt="image" class="image">
          
          <h4 class="price">${values.price} KSH</h4>
          <button class="add-cart">Add Cart</button>
        </div>
      `;
    });
    document.getElementById("products").innerHTML = products;

    let cards = document.querySelectorAll('#products .card .image');

    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        displayProductPopup(data[i]);
      });
    
      let addCartButton = card.parentElement.querySelector('.add-cart');
      addCartButton.addEventListener('click', () => {
        cartNumbers(data[i]);
        addToCart(data[i]);
        totalCost(data[i]);
      });
    });
    

    //=========display product======================
    function displayProductPopup(product) {
      let popupContainer = document.createElement('div');
      popupContainer.className = 'popup-container';

      let popupContent = document.createElement('div');
      popupContent.className = 'popup-content';
      popupContent.innerHTML = `
        <h2>${product.category}</h2>
        <img src="${product.image}" alt="Product Image" class="product-image">
        <p>${product.description}</p>
        <h4>${product.price} KSH</h4>
        <button class="close-button" onclick="closePopup()">Close</button>
      `;

      popupContainer.appendChild(popupContent);
      document.body.appendChild(popupContainer);

      // Add event listener to the close button
      let closeButton = popupContent.querySelector('.close-button');
      closeButton.addEventListener('click', closePopup);
    }

    function closePopup() {
      let popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        document.body.removeChild(popupContainer);
      }
    }

    // Rest of the code...

    function cartNumbers(product) {
      let productNumbers = localStorage.getItem('cartNumbers');
      productNumbers = parseInt(productNumbers);

      if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        productNumbers = productNumbers + 1; // Update the productNumbers variable
      } else {
        localStorage.setItem('cartNumbers', 1);
        productNumbers = 1; // Set productNumbers to 1
      }
      document.querySelector('.cart span').textContent = productNumbers; // Update the cart count in the HTML
    }

    function addToCart(product) {
      let cartItems = localStorage.getItem('productInCart');
      cartItems = JSON.parse(cartItems) || {};

      if (Array.isArray(cartItems[product.category])) {
        cartItems[product.category].push(product);
      } else {
        cartItems[product.category] = [product];
      }

      localStorage.setItem('productInCart', JSON.stringify(cartItems));
    }

    function totalCost(product) {
      let cartCost = localStorage.getItem('total cost');

      if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        cartCost += product.price;
      } else {
        cartCost = product.price;
      }

      localStorage.setItem('total cost', cartCost.toString());
    }

    function displayCartItems() {
      let cartItems = localStorage.getItem('productInCart');
      cartItems = JSON.parse(cartItems);
    
      if (cartItems && Object.keys(cartItems).length > 0) {
        let table = document.createElement('table');
        table.innerHTML = `
          <tr>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        `;
    
        for (let category in cartItems) {
          cartItems[category].forEach((product, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
              <td>${category}</td>
              <td><img src="${product.image}" alt="Product Image" style="width: 50px;"></td>
              <td>${product.price} KSH</td>
              <td><button class="delete-item" data-category="${category}" data-index="${index}">Delete</button></td>
            `;
            table.appendChild(row);
          });
        }
    
        let popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
    
        let popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.innerHTML = `
          <h2>Cart Items</h2>
          <button class="close-button">Close</button>
        `;
        popupContent.appendChild(table);
    
        popupContainer.appendChild(popupContent);
        document.body.appendChild(popupContainer);
    
        let closeButton = popupContent.querySelector('.close-button');
        closeButton.addEventListener('click', closePopup);
    
        let deleteButtons = popupContent.querySelectorAll('.delete-item');
        deleteButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            const index = parseInt(button.getAttribute('data-index'));
    
            deleteCartItem(category, index);
            updateCartDisplay();
          });
        });
      } else {
        alert('No items in the cart.');
      }
    }
    
    function deleteCartItem(category, index) {
      let cartItems = localStorage.getItem('productInCart');
      cartItems = JSON.parse(cartItems);
    
      if (Array.isArray(cartItems[category])) {
        cartItems[category].splice(index, 1);
        localStorage.setItem('productInCart', JSON.stringify(cartItems));
      }
    
      let productNumbers = localStorage.getItem('cartNumbers');
      productNumbers = parseInt(productNumbers);
      if (productNumbers && productNumbers > 0) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
      }
    }
    
    function updateCartDisplay() {
      let popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        document.body.removeChild(popupContainer);
      }
    
      displayCartItems();
    }
    

    document.querySelector('.cart img').addEventListener('click', displayCartItems);
  });
