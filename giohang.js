// 1. Hàm vẽ giỏ hàng ra màn hình
function renderCart() {
    // Lấy dữ liệu mới nhất từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalBillElement = document.getElementById('total-bill');

    if (!cartItemsElement) return;

    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 50px;">
                    <p>Giỏ hàng của bạn đang trống.</p>
                    <a href="sanpham.html" style="color: #f39c12; font-weight: bold;">Quay lại mua sắm ngay!</a>
                </td>
            </tr>`;
        subtotalElement.innerText = "0đ";
        totalBillElement.innerText = "0đ";
        return;
    }

    let html = '';
    let totalMoney = 0;

    cart.forEach((item, index) => {
        if (!item.gia) {
        console.error("Sản phẩm thiếu giá:", item);
        return; 
    }

        // Chuyển đổi giá từ "485,000vnđ" sang số thuần (485000) để tính toán
        let priceNum = parseInt(item.gia.replace(/\D/g, ''));
        let subtotal = priceNum * item.soLuong;
        totalMoney += subtotal;

        html += `
            <tr>
                <td class="remove-item" onclick="removeItem(${index})" style="color:red; cursor:pointer; font-weight:bold; font-size:20px;">×</td>
                <td style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.anh}" class="cart-img" style="width:70px; height:70px; object-fit:cover; border-radius:5px;">
                    <strong>${item.ten}</strong>
                </td>
                <td>${item.gia}</td>
                <td>
                    <div style="display:flex; align-items:center; border:1px solid #ddd; width:fit-content; border-radius:5px;">
                        <button onclick="updateQty(${index}, -1)" style="padding:5px 12px; border:none; background:#eee; cursor:pointer;">-</button>
                        <input type="text" value="${item.soLuong}" readonly style="width:35px; text-align:center; border:none; font-weight:bold;">
                        <button onclick="updateQty(${index}, 1)" style="padding:5px 12px; border:none; background:#eee; cursor:pointer;">+</button>
                    </div>
                </td>
                <td style="font-weight:bold; color: #333;">${subtotal.toLocaleString()}đ</td>
            </tr>
        `;
    });

    cartItemsElement.innerHTML = html;
    subtotalElement.innerText = totalMoney.toLocaleString() + "đ";
    totalBillElement.innerText = totalMoney.toLocaleString() + "đ";
}

//  Hàm cập nhật số lượng (+ / -)
window.updateQty = function(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].soLuong += change;

    // Không cho số lượng nhỏ hơn 1
    if (cart[index].soLuong < 1) cart[index].soLuong = 1;

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

//  Hàm xóa sản phẩm khỏi giỏ
window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Hàm xử lý nút thanh toán cực đơn giản
window.handleCheckout = function() {
    alert("Đơn hàng của bạn đã thanh toán thành công!"); // Hiện thông báo
    localStorage.removeItem('cart'); // Xóa sạch giỏ hàng
    window.location.reload(); // Load lại trang cho giỏ hàng trống
}

//  Tự động chạy khi mở trang giỏ hàng
document.addEventListener('DOMContentLoaded', renderCart);

// Sửa lại đoạn tính toán trong renderCart() của bạn cho chắc ăn:
let priceNum = parseInt(item.gia.replace(/[^0-9]/g, '')); // Chỉ lấy số 0-9
if (isNaN(priceNum)) priceNum = 0; 
let subtotal = priceNum * item.soLuong;