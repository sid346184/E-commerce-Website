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
/*--------------------------------Google Maps---------------------------------*/



// document.addEventListener("DOMContentLoaded", function() {
//     var map = L.map('map').setView([28.609619, 77.344601], 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
//     console.log("hi")

//     L.marker([28.609619, 77.344601]).addTo(map)
//         .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//         .openPopup();
// });

  /*---------------------Add-items to Cart--------------------------------*/
var cartButtons = document.querySelectorAll('.fa-cart-shopping');
var cartTable = document.querySelector('.cart-items tbody');
let noOfClicks = 0;



cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        noOfClicks++;
        let newRow = document.createElement('tr');
        console.log("cart button is clicked");

        if (noOfClicks === 1) {
            cartTable.innerHTML = `
                <tr>
                    <th>REMOVE</th>
                    <th>IMAGE</th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                </tr>
            `;
        }
        newRow.innerHTML = `
            <td><i class="fa-solid fa-xmark"></i></td>
            <td><img src="images/products/f1.jpg" alt="Cartoon Astronaut T-shirt"></td>
            <td>Cartoon Astronaut T-shirts</td>
            <td>$118.19</td>
            <td>
                <select name="Quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </td>
            <td>$118.19</td>
        `;

        cartTable.appendChild(newRow);
    });
});