function displayProducts(products, showAll = false) {

    console.log('product', products);
    const productContainer = document.querySelector('.nature-section .row');
    const loadMoreContainer = document.querySelector('.load-more-container');
    productContainer.innerHTML = '';

    // Nếu là ALL-IN-ONE, hiển thị tất cả sản phẩm
    const productsToShow = showAll ? products : products.slice(0, 4); // Nếu không phải ALL-IN-ONE, hiển thị 4 sản phẩm đầu tiên

    // Hiển thị sản phẩm
    productsToShow.forEach(product => {
        const productHtml = `
            <div class="col-md-6 col-lg-3 product-item" data-id="${product.id}">
                <div class="nature-best-item">
                    <img src="assets/images/${product.image}.png" class="card-img-top" alt="${product.name}" />
                    <div class="nature-best-body">
                        <h5 class="nature-best-title">${product.name}</h5>
                        <p class="nature-best-text">${product.price}</p>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHtml;
    });

    // Hiển thị nút "SEE MORE" nếu sản phẩm nhiều hơn 4 và không đang ở trang ALL-IN-ONE
    if (!showAll && products.length > 4) {
        loadMoreContainer.innerHTML = '<div class="nature-seemore">SEE MORE</div>';
        loadMoreContainer.querySelector('.nature-seemore').onclick = () => loadProducts(true, 'ALL-IN-ONE'); // Gọi lại loadProducts với showAll = true
    } else {
        loadMoreContainer.innerHTML = ''; // Không hiển thị nút khi đã chọn "SEE MORE"
    }

    // Thêm sự kiện click vào sản phẩm
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            
            const productId = item.getAttribute('data-id');
            
            const selectedProduct = products.find(product => product.id == productId);

            // Lưu thông tin sản phẩm vào localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

            // Điều hướng tới trang chi tiết sản phẩm
            window.location.href = 'productPage.html'; // Đảm bảo rằng tên trang chi tiết sản phẩm là productPage.html
        });
    });
}

function loadProducts(showAll = false, category = 'ALL-IN-ONE') {
    const productsRef = database.ref('products');

    // Nếu category là ALL-IN-ONE, không lọc theo category, mà lấy tất cả sản phẩm
    if (category == 'ALL-IN-ONE') {
        productsRef.once('value')
            .then((snapshot) => {
                const products = [];
                snapshot.forEach((childSnapshot) => {
                    products.push(childSnapshot.val());
                });

                displayProducts(products, showAll); // Hiển thị tất cả sản phẩm
            })
            .catch((error) => {
                console.error("Error fetching products: ", error);
            });
    } else {
        // Nếu không phải ALL-IN-ONE, lọc theo category
        productsRef.orderByChild('category').equalTo(category).once('value')
            .then((snapshot) => {
                const products = [];
                snapshot.forEach((childSnapshot) => {
                    products.push(childSnapshot.val());
                });

                displayProducts(products, showAll); // Hiển thị sản phẩm của category
            })
            .catch((error) => {
                console.error("Error fetching products: ", error);
            });
    }
    
}

// Thêm sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

    if (currentPage === 'index.html' || currentPage === 'productPage.html') {
        loadProducts(); // Chỉ tải một phần sản phẩm cho trang chủ
    } else if (currentPage === 'shop.html') {
        loadProducts(true); // Tải tất cả sản phẩm cho trang shop
    }

    const tabs = document.querySelectorAll('.nature-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadProducts(false, tab.textContent); // Tải sản phẩm cho danh mục đã chọn
        });
    });
});
