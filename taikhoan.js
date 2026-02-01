let isLogin = true;

function toggleAuth(event) {
    // Ngăn chặn trang bị load lại khi bấm vào link <a>
    if (event) event.preventDefault();

    // 1. Lấy các phần tử bằng ID cho chính xác tuyệt đối
    const title = document.getElementById('auth-title');
    const button = document.getElementById('auth-button');
    const toggleText = document.getElementById('auth-toggle-text');
    const checkGroup = document.getElementById('auth-check');

    // 2. Đảo trạng thái
    isLogin = !isLogin;

    // 3. Cập nhật giao diện
    if (!isLogin) {
        title.innerText = "Register";
        button.innerText = "Register";
        if (checkGroup) checkGroup.style.display = "none"; // Ẩn hẳn phần checkbox
        toggleText.innerHTML = `Already have an account? <a href="javascript:void(0)" onclick="toggleAuth(event)">Login</a>`;
    } else {
        title.innerText = "Login";
        button.innerText = "Login";
        if (checkGroup) checkGroup.style.display = "flex"; // Hiện lại phần checkbox
        toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0)" onclick="toggleAuth(event)">Register</a>`;
    }
}

// Hàm ẩn hiện mật khẩu (giữ lại và fix nhẹ để tránh lỗi console)
const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass);
    const iconEye = document.getElementById(loginEye);

    if (input && iconEye) {
        iconEye.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                iconEye.classList.add('ri-eye-line');
                iconEye.classList.remove('ri-eye-off-line');
            } else {
                input.type = 'password';
                iconEye.classList.remove('ri-eye-line');
                iconEye.classList.add('ri-eye-off-line');
            }
        });
    }
}
showHiddenPass('login-pas', 'login-eye');