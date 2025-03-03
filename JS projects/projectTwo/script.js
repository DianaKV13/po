let totalPrice = 0;

function addToList() {
    const inputValue = document.querySelector('.inputField').value;
    const priceValue = document.querySelector('.priceField').value;

    const pricePattern = /^\d+(\.\d{1,2})?$/;

    if (!pricePattern.test(priceValue)) {
        alert('Please enter a valid price (e.g., 10 or 10.99)');
        return;
    }

    if (inputValue.trim() !== "" && priceValue.trim() !== "") {
        const newItem = document.createElement('li');

        const itemText = document.createElement('span');
        itemText.textContent = `${inputValue} - $${priceValue}`;

        newItem.appendChild(itemText);

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'delete';
        deleteBtn.classList.add('delete-btn');

        newItem.appendChild(deleteBtn);

        document.getElementById('itemList').appendChild(newItem);

        document.querySelector('.inputField').value = '';
        document.querySelector('.priceField').value = '';

        newItem.addEventListener('click', function () {
            if (itemText.style.textDecoration === 'line-through') {
                itemText.style.textDecoration = '';
                totalPrice -= parseFloat(priceValue);
            } else {
                itemText.style.textDecoration = 'line-through';
                totalPrice += parseFloat(priceValue);
            }
            updateTotalPrice();
        });

        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation();

            newItem.remove();

            recalculateTotalPrice();

            updateTotalPrice();
        });
    } else {
        alert('Please enter both item name and price!');
    }
}

function recalculateTotalPrice() {
    totalPrice = 0;

    const items = document.querySelectorAll('#itemList li');
    items.forEach(item => {
        const itemText = item.querySelector('span');
        const priceText = itemText.textContent.split(' - $')[1];

        if (itemText.style.textDecoration === 'line-through') {
            totalPrice += parseFloat(priceText);
        }
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const totalElement = document.getElementById('totalPrice');
    totalElement.textContent = `In total, the price is: $${totalPrice.toFixed(2)}`;
}

document.querySelector('.priceField').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addToList();
    }
});
