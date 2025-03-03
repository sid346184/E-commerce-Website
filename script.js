function reinitializeScripts(page) {
    console.log(`${page} loaded, reloading scripts...`);

    if (page === "cart.html") {
        loadCartFunctionality();
    } else if (page === "contact.html") {
        loadMap();
    }
}

/*----------------------Load different html pages from navbar--------------------------*/ 
window.onload=function(){
    loadCommonElements();
    loadPage('home.html');
};

function loadCommonElements(){
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => document.getElementById('navbar-section').innerHTML=data);

    fetch('footer.html')
    .then(response=> response.text())
    .then(data=> document.getElementById('footer-section').innerHTML=data)
}

function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html; 
            window.scrollTo(0, 0); 
            reinitializeScripts(page);
            console.log("object")
        })
        .catch(error => console.log("Error loading page:", error));
}

function loadMap() {
    var map = L.map('map').setView([28.609619, 77.344601], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([28.609619, 77.344601]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
}

/*--------------------------------Google Maps---------------------------------*/



  /*---------------------Add-items to Cart--------------------------------*/
let cart = [];

function loadCartFunctionality() {
    // Initialize cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Add event listeners for remove buttons
    document.querySelectorAll('.cart-items .fa-xmark').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const index = Array.from(row.parentNode.children).indexOf(row) - 1;
            removeFromCart(index);
        });
    });
}

function addToCart(product) {
    cart.push({
        image: product.image || "images/products/f1.jpg",
        name: product.name || "Cartoon Astronaut T-shirts",
        price: product.price || 118.19,
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartTable = document.querySelector('.cart-items');
    if (!cartTable) return;

    let html = `
        <tr>
            <th>REMOVE</th>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
        </tr>
    `;

    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <tr>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <select name="Quantity" onchange="updateQuantity(${index}, this.value)">
                        ${[1,2,3,4,5].map(num => 
                            `<option value="${num}" ${item.quantity === num ? 'selected' : ''}>${num}</option>`
                        ).join('')}
                    </select>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartTable.innerHTML = html;
    updateCartTotal(total);
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartTotal(total) {
    const subtotalElem = document.querySelector('.cart-total td:nth-child(2)');
    const totalElem = document.querySelector('.cart-total tr:last-child td:last-child');
    if (subtotalElem && totalElem) {
        subtotalElem.textContent = `$${total.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;
    }
}

// Update the existing cart button click handlers
document.querySelectorAll('.fa-cart-shopping').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.box');
        if (productCard) {
            const product = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('.product-name').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
            };
            addToCart(product);
        }
    });
});