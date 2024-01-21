const message = "Welcome to Dapo's store. Press 1 to get started. (Enter 'checkout' to checkout.)\n"
const prodObj = {
    products: [{ item: "shoes", price: 500, id: 1 }, { item: "powerbank", price: 100, id: 2 }, { item: "bags", price: 600, id: 3 }, { item: "TV", price: 1500, id: 4 }],
    cart: [],
    order: { cartItems: [] },
    selectedItem: { item: "" }
}
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question(message, (userInput) => {
    if (userInput == 1) {
        listProducts()
        console.log("Enter item number you intend to purchase.");
    } else {
        console.log("Please enter 1 to get started.");
    }
})

rl.on('line', (line) => {
    //convert input to lowercase.
    line = line.toLowerCase()

    let itemValue = prodObj.selectedItem.item
    if (itemValue) {
        addToCart(itemValue, line)
        console.log(`YOUR CART:\n`, prodObj.cart)
        console.log("Enter item number you intend to purchase. Press 'checkout' to leave application")
        return
    }
    switch (line) {
        case "1": {
            prodObj.selectedItem.item = 1
            askForQuantity(1)
            break;
        }
        case "2": {
            prodObj.selectedItem.item = 2
            askForQuantity(2)
            break;
        }
        case "3": {
            prodObj.selectedItem.item = 3
            askForQuantity(3)
            break;
        }
        case "4": {
            prodObj.selectedItem.item = 4
            askForQuantity(4)
            break;
        }
        case "checkout": {
            if (prodObj.cart.length > 0) {
                checkout()
            }
        }
    }
})


function checkout() {
    let total = 0
    for (let i = 0; i < prodObj.cart.length; i++) {
        prodObj.order.cartItems.push(prodObj.cart[i])
        total = total + prodObj.cart[i].price
    }

    prodObj.order.TOTAL = `#${total}`
    console.log(`CHECKOUT:\n`, prodObj.order)

}

function addToCart(id, quantity) {
    let qty = Number(quantity)
    let products = prodObj.products
    for (let i = 0; i < prodObj.products.length; i++) {
        if (products[i].id == id) {
            prodObj.cart.push({ item: products[i].item, price: products[i].price * qty })
        }
        prodObj.selectedItem.item = ""
    }

}

function askForQuantity(id, quantity) {
    let products = prodObj.products
    for (let i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            console.log(`How many ${products[i].item} do you want to get?`)

        }
    }
}

function listProducts() {
    let products = prodObj.products
    console.log("Here is a list of the available products at our store currently: \n")
    for (let i = 0; i < products.length; i++) {
        console.log(`${i + 1}. ${products[i].item} ($${products[i].price})`)
    }
}