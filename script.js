// Initial variables
const shopList = document.querySelector("#shop-list");
const form = document.querySelector("#submit-form");
const submitName = document.querySelector(".submit-text");
const submitPrice = document.querySelector(".submit-num.price");
const totalPrice = document.querySelector(".total-price-text");
let priceSum = 0;

/* 
Function to update of a shop item
Returns the amount that the price has changed
*/
const updatePrice = (e, qtyIncrement) => {
    const itemPrice = e.target.parentNode.parentNode.querySelector(".item-price").innerText;
    const itemQty = e.target.parentNode.querySelector(".item-qty-value").innerText;
    const costPerQty = parseFloat(itemPrice)/parseFloat(itemQty);
    const newPrice = costPerQty * (parseInt(itemQty) + qtyIncrement);

    e.target.parentNode.parentNode.querySelector(".item-price").innerText = newPrice;

    return (qtyIncrement * costPerQty);
}

/*
Function to check when submission has been made using the form
*/
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!submitName.value || !submitPrice.value) {
        alert("Incorrect input, try again");
        return;
    }

    const shopItem = document.createElement("div");
    shopItem.classList.add("shop-item");

    // Create item name
    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.textContent = submitName.value;
    shopItem.appendChild(itemName);

    // Create qty
    const itemQtyInput = document.createElement("div");
    itemQtyInput.classList.add("item-qty-input");

    const itemQty = document.createElement("p")
    itemQty.classList.add("item-qty-value");
    itemQty.textContent = 1;

    const itemAddQty = document.createElement("button");
    itemAddQty.classList.add("item-add-qty");
    const addQtyIcon = document.createElement("i");
    addQtyIcon.classList.add("fa-solid", "fa-plus");
    itemAddQty.appendChild(addQtyIcon);

    const itemMinusQty = document.createElement("button");
    itemMinusQty.classList.add("item-minus-qty");
    const minusQtyIcon = document.createElement("i");
    minusQtyIcon.classList.add("fa-solid", "fa-minus");
    itemMinusQty.appendChild(minusQtyIcon);
    itemMinusQty.disabled = true;

    itemQtyInput.appendChild(itemMinusQty);
    itemQtyInput.appendChild(itemQty);
    itemQtyInput.appendChild(itemAddQty);
    shopItem.appendChild(itemQtyInput);

    // Create item price
    const itemPrice = document.createElement("p")
    itemPrice.textContent = submitPrice.value;
    itemPrice.classList.add("item-price");
    shopItem.appendChild(itemPrice);

    // Create checkbox button
    const itemCheckBox = document.createElement("input");
    itemCheckBox.classList.add("item-checkbox");
    itemCheckBox.setAttribute("type", "checkbox");
    shopItem.appendChild(itemCheckBox);

    // Create remove button
    const itemRemove = document.createElement("button");
    itemRemove.classList.add("item-remove");
    const itemRemoveIcon = document.createElement("i");
    itemRemoveIcon.classList.add("fa-solid", "fa-trash");
    itemRemove.appendChild(itemRemoveIcon);
    shopItem.appendChild(itemRemove);

    // Put code into shop-list
    shopList.appendChild(shopItem);

    // Update the total price in cart
    priceSum += parseFloat(itemPrice.textContent);
    totalPrice.textContent = priceSum.toFixed(2);

    // Clear form fields
    form.reset();

    /*
    This function will allow items to be marked as "bought"
    Buttons will be disabled
    */
    itemCheckBox.addEventListener("click", (e) => {
        e.target.parentNode.style = "background-color: #32CD32";

        e.target.disabled = true;
        e.target.parentNode.querySelector(".item-qty-input .item-add-qty").disabled = true;
        e.target.parentNode.querySelector(".item-qty-input .item-minus-qty").disabled = true;
    })   

    /*
    This function will remove items when trash can button is clicked
    */
    itemRemove.addEventListener("click", (e) => {
        const price = parseFloat(e.target.parentNode.querySelector(".item-price").textContent);
        priceSum -= price;

        totalPrice.textContent = priceSum.toFixed(2);

        e.target.parentNode.remove();
    })

    /*
    This function will allow qty to be increased using a button
    */
    itemAddQty.addEventListener("click", (e) => {
        priceSum += updatePrice(e, 1);
        totalPrice.textContent = priceSum.toFixed(2);

        const parsedQty = e.target.parentNode.querySelector(".item-qty-value").textContent;
        const newQty = parseInt(parsedQty) + 1;
        e.target.parentNode.querySelector(".item-qty-value").textContent = newQty.toString();

        if (newQty == 2) {
            itemMinusQty.disabled = false;
        }
    })

    /*
    This function will allow qty to be decreased using a button
    */
    itemMinusQty.addEventListener("click", (e) => {
        priceSum += updatePrice(e, -1);
        totalPrice.textContent = priceSum.toFixed(2);

        const parsedQty = e.target.parentNode.querySelector(".item-qty-value").textContent;
        const newQty = parseInt(parsedQty) - 1;
        e.target.parentNode.querySelector(".item-qty-value").textContent = newQty.toString();

        if (newQty == 1) {
            itemMinusQty.disabled = true;
        }
    })
})

