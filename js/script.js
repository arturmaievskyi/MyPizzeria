async function getProducts (){
    let response = await fetch("store_db.json")
    let products = await response.json()
    return products
}


function getCardHTML(product) {
    let productData = JSON.stringify(product); 
    return      `<div class="card text-bg-dark" style="max-width: 25rem;">
                    <img src="${product.image}" class="card-img" >
                    <div class="card-img-overlay">
                      <h5 class="card-title">${product.name}<h5>
                      <p class="card-text ">${product.description}</p>
                      <div><p class="badge rounded-pill text-bg-warning">Price: ${product.price} euro</p></div>
                      <button type="button" class="btn btn-danger">Order</button>
                    </div>
                  </div>`
}


getProducts().then(function(products){
    let productsList = document.querySelector('.pizzas')
    if (productsList) { 
        products.forEach(function(product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
})
