    const cards = document.querySelector('.cards');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    next.addEventListener('click', () => {
        // Lấy thẻ li đầu tiên và chuyển nó xuống cuối danh sách
        const firstCard = cards.querySelector('li');
        cards.appendChild(firstCard);
    });

    prev.addEventListener('click', () => {
        // Lấy thẻ li cuối cùng và chuyển nó lên đầu danh sách
        const lastCard = cards.querySelector('li:last-child');
        cards.prepend(lastCard);
    });