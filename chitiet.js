// 1. Lấy dữ liệu sản phẩm đã chọn từ localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra nếu không có sản phẩm thì quay lại trang danh sách
    if (!product) {
        window.location.href = "sanpham.html";
        return;
    }

    // 2. Đổ thông tin chi tiết sản phẩm vào HTML
    renderProductDetail();

    // 3. Hiển thị danh sách sản phẩm liên quan (Các sản phẩm khác)
    showRelatedProducts();
    
    // 4. Load Menu và Footer (nếu bạn dùng file riêng)
    loadHeaderFooter();
});

// --- CÁC HÀM XỬ LÝ CHÍNH ---

function renderProductDetail() {
    // Thông tin chữ
    document.getElementById('view-name').innerText = product.ten;
    document.getElementById('view-name-mini').innerText = product.ten;
    document.getElementById('view-price').innerText = product.gia;
    document.getElementById('view-category').innerText = product.category;
    document.getElementById('view-category-text').innerText = product.category;
    document.getElementById('view-sku').innerText = product.sku || "N/A";
    
    // Nếu bạn có thuộc tính mô tả trong sanpham.js thì dùng, không thì hiện mặc định
    if(product.moTa) {
        document.getElementById('view-mota').innerText = product.moTa;
    }

    // Ảnh chính
    document.getElementById('view-img').src = product.anh;

    // Xử lý danh sách ảnh nhỏ (Thumbnails)
    const thumbList = document.getElementById('thumb-list');
    if (thumbList) {
        // Ưu tiên dùng listAnh bạn vừa thêm, nếu không có thì lấy ảnh chính làm thumb
        let images = (product.listAnh && product.listAnh.length > 0) ? product.listAnh : [product.anh];
        
        thumbList.innerHTML = images.map(imgUrl => `
            <div class="thumb-item">
                <img src="${imgUrl}" onclick="changeMainImg('${imgUrl}')" alt="thumbnail" onerror="this.src='https://placehold.co/100x100?text=No+Image'">
            </div>
        `).join('');
    }
}

// Hàm đổi ảnh chính khi click vào ảnh nhỏ
function changeMainImg(url) {
    const mainImg = document.getElementById('view-img');
    mainImg.style.opacity = '0.3'; // Hiệu ứng mờ khi đổi
    setTimeout(() => {
        mainImg.src = url;
        mainImg.style.opacity = '1';
    }, 150);
}

// Hàm hiển thị sản phẩm liên quan (Giống mẫu BreadTalk)
function showRelatedProducts() {
    const relatedContainer = document.getElementById('related-list');
    if (!relatedContainer) return;

    // Lọc: Lấy bánh cùng loại NHƯNG phải khác cái đang xem
    let filterItems = allProducts.filter(item => 
        item.category === product.category && item.ten !== product.ten
    );

    // Nếu trong danh mục đó không đủ 4 bánh, lấy thêm bánh từ danh mục khác cho đẹp đội hình
    if (filterItems.length < 4) {
        let extraItems = allProducts.filter(item => 
            item.category !== product.category && item.ten !== product.ten
        );
        filterItems = [...filterItems, ...extraItems];
    }

    // Chỉ lấy đúng 4 cái đầu tiên
    const displayItems = filterItems.slice(0, 4);

    relatedContainer.innerHTML = displayItems.map(item => `
        <div class="related-item" onclick="viewRelatedDetail('${item.ten}')">
            <img src="${item.anh}" alt="${item.ten}">
            <h3>${item.ten}</h3>
            <p>${item.gia}</p>
            <button class="btn-view-now">XEM CHI TIẾT</button>
        </div>
    `).join('');
}

// Hàm chuyển trang khi bấm vào sản phẩm liên quan
function viewRelatedDetail(productName) {
    const selected = allProducts.find(p => p.ten === productName);
    if (selected) {
        localStorage.setItem('selectedProduct', JSON.stringify(selected));
        window.location.href = "chitiet.html";
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }
}

// Tăng giảm số lượng
function changeQty(amount) {
    let qtyInput = document.getElementById('view-qty');
    let currentQty = parseInt(qtyInput.value);
    if (currentQty + amount >= 1) {
        qtyInput.value = currentQty + amount;
    }
}

// Thêm vào giỏ hàng
function addToCartFromDetail() {
    let qty = parseInt(document.getElementById('view-qty').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let itemIndex = cart.findIndex(item => item.ten === product.ten);

    if (itemIndex > -1) {
        cart[itemIndex].soLuong += qty;
    } else {
        // Tạo bản sao sản phẩm và thêm số lượng
        const productToAdd = { ...product, soLuong: qty };
        cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Đã thêm ${qty} ${product.ten} vào giỏ hàng thành công!`);
}

// Hàm hỗ trợ load Header/Footer (nếu bạn dùng fetch)
function loadHeaderFooter() {
    const header = document.getElementById("header-container");
    const footer = document.getElementById("footer");
    
    if(header) {
        fetch("menu.html").then(res => res.text()).then(data => { header.innerHTML = data; });
    }
    if(footer) {
        fetch("footer.html").then(res => res.text()).then(data => { footer.innerHTML = data; });
    }
}