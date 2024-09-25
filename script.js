let itemCount = 1;


function increaseQuantity(index) {
    const quantity = document.getElementById(`quantity-${index}`);
    let value = parseInt(quantity.innerText);
    value++;
    quantity.innerText = value;

    updateAmount(index, value);
}

function decreaseQuantity(index) {
    const quantity = document.getElementById(`quantity-${index}`);
    let value = parseInt(quantity.innerText);
    if (value > 0) value--;
    quantity.innerText = value;

    updateAmount(index, value);
}

function updateAmount(index, quantity) {
    const rateInput = document.querySelector(`tr:nth-child(${index + 1}) input[type='number']`);
    const rate = parseFloat(rateInput.value);
    const amount = rate * quantity;

    document.getElementById(`amount-${index}`).innerText = amount.toFixed(2);
    updateSummary();
}

function addItem() {
    const tbody = document.getElementById('product-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${++itemCount}</td>
        <td>
            <input type="text" placeholder="Product Name">
            <textarea placeholder="Product Details"></textarea>
        </td>
        <td><input type="number" value="0.00" step="0.01" oninput="updateAmount(${itemCount - 1}, 0)"></td>
        <td>
            <button class="quantity-btn" onclick="decreaseQuantity(${itemCount - 1})">-</button>
            <span id="quantity-${itemCount - 1}">0</span>
            <button class="quantity-btn" onclick="increaseQuantity(${itemCount - 1})">+</button>
        </td>
        <td>$<span id="amount-${itemCount - 1}">0.00</span></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;
    tbody.appendChild(newRow);
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    itemCount--;
    updateRowNumbers();
}

function updateRowNumbers() {
    const rows = document.querySelectorAll('#product-body tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1; 
    });
}

function updateSummary() {
    const amounts = document.querySelectorAll('[id^="amount-"]');
    let subTotal = 0;

    amounts.forEach(amount => {
        subTotal += parseFloat(amount.innerText);
    });

    const estimatedTax = subTotal * 0.125; 
    const discount = 0; 
    const shippingCharge = 0; 
    const totalAmount = subTotal + estimatedTax - discount + shippingCharge;

    document.getElementById('sub-total').innerText = `$${subTotal.toFixed(2)}`;
    document.getElementById('estimated-tax').innerText = `$${estimatedTax.toFixed(2)}`;
    document.getElementById('discount').innerText = `$${discount.toFixed(2)}`;
    document.getElementById('shipping-charge').innerText = `$${shippingCharge.toFixed(2)}`;
    document.getElementById('total-amount').innerText = `$${totalAmount.toFixed(2)}`;

    document.getElementById('amount').value = `$${totalAmount.toFixed(2)}`;
}
