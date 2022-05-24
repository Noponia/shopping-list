/* <div class="shop-item">
<div class="shop-item-content">
    <p>Item 1</p>
</div>

<div class="shop-item-input">
    <input type="number" placeholder="Qty">
    <input type="number" placeholder="Price">   
</div>

<div class="shop-item-button">
    <button class>Remove</button>
</div>
</div> */

const shopList = document.querySelector("#shop-list");
const form = document.querySelector("#submit-form");
const submitName = document.querySelector(".submit-text");
const submitPrice = document.querySelector(".submit-num.price");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!submitName.value || !submitQty.value || !submitPrice.value) {
        alert("Incorrect input, try again")
        return;
    }

    // Create item
    const shopItem = document.createElement("div");
    shopItem.classList.add("shop-item");

    // Create item name
    const shopItemContent = document.createElement("div");
    shopItemContent.classList.add("shop-item-content");
    const itemName = document.createElement("p");
    itemName.innerHTML = submitName.value;

    // Append item name
    shopItemContent.appendChild(itemName);
    shopItem.appendChild(shopItemContent);

    // Create qty and price input
    const shopItemInput = document.createElement("div");
    shopItemInput.classList.add("shop-item-input");

    const shopQtyInput = document.createElement("input")
    shopQtyInput.classList.add("shop-item-qty");
    shopQtyInput.setAttribute("type", "number");
    shopQtyInput.value = 1;

    const shopPriceInput = document.createElement("input");
    shopPriceInput.classList.add("shop-item-price");
    shopPriceInput.setAttribute("type", "number");
    shopPriceInput.setAttribute("step", "0.01");
    shopPriceInput.value = submitPrice.value;

    // Append qty and price
    shopItemInput.appendChild(shopQtyInput);
    shopItemInput.appendChild(shopPriceInput);
    shopItem.appendChild(shopItemInput);

    // Create delete button
    const shopItemDelete = document.createElement("div");
    shopItemDelete.classList.add("shop-item-button");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("shop-item-delete");
    deleteButton.innerText = "Remove";

    shopItemDelete.appendChild(deleteButton);
    shopItem.appendChild(shopItemDelete);

    // Put code into shop-list
    shopList.appendChild(shopItem);

    form.reset();

    
    deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove();
    })   
})
