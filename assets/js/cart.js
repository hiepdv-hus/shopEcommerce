document.addEventListener('DOMContentLoaded', () => {
    // Lấy dữ liệu sản phẩm từ localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Cập nhật số lượng giỏ hàng
    updateCartIcon();

    if (selectedProduct) {
        // Cập nhật thông tin sản phẩm trên trang productPage
        document.querySelector('.product-title').innerHTML = selectedProduct?.name;
        document.querySelector('.product-desc').innerHTML = selectedProduct.description;
        document.querySelector('.product-sale').innerHTML = "95% Natural Ingredients"; // Tùy chỉnh thông tin
        document.querySelector('.product-img').src = `assets/images/${selectedProduct.image}.png`;

        // Cập nhật sự kiện click cho nút "Add to Cart"
        document.querySelector('.btn-add-to-cart').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(selectedProduct); // Thêm sản phẩm vào giỏ hàng
            localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage

            updateCartIcon(); // Cập nhật số lượng giỏ hàng
            alert("Add to cart success fully")
        });

        // Cập nhật sự kiện click cho nút "Buy Now"
        document.querySelector('.btn-buy-now').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(selectedProduct); // Thêm sản phẩm vào giỏ hàng
            localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage

            // Điều hướng đến trang giỏ hàng
            window.location.href = './viewCart.html';
        });
    } else {
        console.error('No product data found in localStorage');
    }
});

// Hàm cập nhật số lượng giỏ hàng trong icon
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;

    const bagIcon = document.getElementById('bag');
    if (cartCount > 0) {
        bagIcon.innerHTML = `<img width="18" src="./assets/images/bag-04.svg"/> <span class="cart-count">${cartCount}</span>`;
    } else {
        bagIcon.innerHTML = `<img width="18" src="./assets/images/bag-04.svg"/>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lấy phần tử hiển thị giỏ hàng
    const cartContainer = document.getElementById('my-cart-body');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Kiểm tra nếu giỏ hàng có sản phẩm
    if (cart.length > 0) {
        // Hiển thị các sản phẩm trong giỏ
        if (currentPage == 'checkout.html') {
            cart.forEach((product, index) => {
                const productHtml = `
                    <div class="my-cart-item d-flex align-items-center justify-content-between">
                        <div>
                            <img width="87" src="assets/images/${product.image}.png" alt="${product.name}" />
                        </div>
                        <div>
                            <div class="my-cart-item__title">${product.name}</div>
                            <div class="my-cart-item__size">Size:40L-4Pcs</div>
                        </div>
                        <div>1</div>
                        <div class="my-cart-item__price">$${(product.price)}</div>
                    </div>
                `;
                cartContainer.innerHTML += productHtml;
            });
        } else {
            cart.forEach((product, index) => {
                const productHtml = `
                    <div class="my-cart-item d-flex align-items-center justify-content-between">
                        <div class="my-cart-item-img">
                            <img src="./assets/images/checkbox.svg" alt="Product Image" />
                        </div>
                        <div>
                            <img width="87" src="assets/images/${product.image}.png" alt="${product.name}" />
                        </div>
                        <div>
                            <div class="my-cart-item__title">${product.name}</div>
                            <div class="my-cart-item__size">Size:40L-4Pcs</div>
                        </div>
                        <div>1</div>
                        <div class="my-cart-item__price">$${(product.price)}</div>
                        <div class="my-cart-item-img">
                            <img src="./assets/images/delete.svg" alt="Delete" onclick="removeFromCart(${product.id})" />
                        </div>
                    </div>
                `;
                cartContainer.innerHTML += productHtml;
            });
    
            
        }

        // Tính tổng tiền giỏ hàng
        const totalAmount = cart.reduce((total, product) => total + (Number(product.price) * 1), 0);
        console.log('totalAmount', totalAmount);
        

        // Hiển thị tổng tiền
        document.getElementById('cartSubtotal').innerHTML = `$${totalAmount}`;
        document.getElementById('cartTotal').innerHTML = `$${totalAmount}`;

        // Cập nhật tổng tiền
        // const shipping = 56.00; // Ví dụ flat rate
        // const totalWithShipping = totalAmount + shipping;
        // document.getElementById('cartTotal').innerHTML = `$${totalWithShipping}`;

        document.getElementById('signIn').addEventListener('click', () => {
            alert("Đăng nhập Paypal thành công!");
        });


        document.getElementById('placeOrder').addEventListener('click', () => {
            alert("Chúc mừng bạn đã đặt hàng thành công!");

            // Xóa giỏ hàng trong localStorage
            localStorage.removeItem('cart');
        
            // Chuyển hướng về trang index.html
            window.location.href = 'index.html';
        });
    } else {
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    }
});

// Hàm xóa sản phẩm khỏi giỏ hàng theo id
function removeFromCart(id) {

    const isConfirmed = window.confirm("Are you sure you want to remove this item from your cart?");
    
    if (isConfirmed) {
        // Lấy giỏ hàng từ localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Tìm và xóa sản phẩm có id tương ứng
        cart = cart.filter(product => product.id !== id);
    
        // Cập nhật giỏ hàng trong localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Cập nhật giao diện sau khi xóa sản phẩm
        location.reload(); // Tải lại trang để hiển thị giỏ hàng đã được cập nhật
    }
}

