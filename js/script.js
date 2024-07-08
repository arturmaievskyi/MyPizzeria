async function getData(db_name) {
    let response = await fetch(db_name)
    let products = await response.json()
    return products
}

function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')


    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли


        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу "="
        }
    }


    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return ''
}


function getCardHTML(product) {
    let productData = JSON.stringify(product);
    return `   <div class="card text-bg-dark" style="max-width: 25rem;">
                    <img src="${product.image}" class="card-img" >
                    <div class="card-img-overlay">
                        <h5 class="card-title">${product.title}<h5>
                        <p class="card-text ">${product.description}</p>
                        <div><p class="badge rounded-pill text-bg-warning">Price: ${product.price} euro</p></div>
                            <button type="button" class="btn btn-danger cart-btn add-to-cart" data-product='${JSON.stringify(product)}'>Order</button>
                        </div>
                    </div>`
}



getData("store_db.json").then(function (products) {
    let productsList = document.querySelector('.pizzas')

    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
    // Отримуємо всі кнопки "Додати в кошик" на сторінці
    let buyButtons = document.querySelectorAll('.add-to-cart');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart)
        });
    }

})




function getSlavesHTML(slaves) {
    let slavesData = JSON.stringify(slaves);
    return `   <div class="slave card text-bg-dark">
                        <img src="${slaves.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${slaves.name}</h5>
                            <p class="card-text">${slaves.about}</p>
                            <p>He recievs ${slaves.pay}</p>
                            <p>He is: ${slaves.work}<p>
                        </div>
                    </div>`
}



getData("slaves.json").then(function (slaves) {
    let slavesList = document.querySelector('.slaves')
    if (slavesList) {
        slaves.forEach(function (slaves) {
            slavesList.innerHTML += getSlavesHTML(slaves)
        })
    }
})



class ShoppingCart {
    constructor() {
        this.items = {}
        this.total = 0

        this.loadCartFromCookies()
        this.showCart()
    }

    showCart() {

        let cart_list = document.querySelector('.cart')
        if (cart_list) {
            cart_list.innerHTML = ''
            for (let title in this.items) {
                cart_list.innerHTML += getCartItem(this.items[title])
            }
        }

        let totalPrice = document.querySelector(".total-price")
        totalPrice.innerHTML = this.calculateTotalPrice()
    }



    addItem(item) {
        if (this.items[item.title]) {
            this.items[item.title].quantity += 1
        }
        else {
            this.items[item.title] = item
            this.items[item.title].quantity = 1
        }
        console.log(this.items)
        this.saveCartToCookies()
        this.showCart()
    }



    calculateTotalPrice() {
        let total = 0;
        for(let item in this.items){
            total += this.items[item].price * this.items[item].quantity;
        }
        return total
    }
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items)
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`
    }



    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart')
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie)
        }
    }
}



let cart = new ShoppingCart()
function addToCart(event) {
    let productData = event.target.getAttribute('data-product')
    let product = JSON.parse(productData)
    // тут буде додавання в кошик
    cart.addItem(product)
}


function getCartItem(item) {
    return `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${item.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}<h5>
                    <p class="card-text">${item.quantity}<p>
                    <p class="card-text">${item.price * item.quantity} euro</p>
                </div>
        </div>
    </div>
</div>`
}