// index
const kkachiliFace = document.getElementById('kkachiliFace');
const kkachiliBubble = document.getElementById('kkachiliBubble');
const menu = document.getElementsByClassName('nanum-pen-script-regular');
const phrases = ["말 걸지 마", "나 지금 바빠", "너나 잘해", "왜 자꾸 건드려", "어쩌라고", "안할거야 묻지마"];

kkachiliFace.addEventListener('mouseenter', () => {
    kkachiliBubble.style.display = "block";
    kkachiliBubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
});

kkachiliFace.addEventListener('mouseleave', () => {
    kkachiliBubble.style.display = "none";
});

kkachiliFace.addEventListener('click', () => {
    kkachiliFace.classList.add('shake');
    kkachiliBubble.style.display = "block";
    kkachiliBubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    setTimeout(() => kkachiliFace.classList.remove('shake'), 400);
});

// about me
let currentSlide = 1;
const totalSlides = 4;

function showSlide(n) {
    for (let i = 1; i <= totalSlides; i++) {
    document.getElementById(`slide-${i}`).classList.remove('active');
    }
    document.getElementById(`slide-${n}`).classList.add('active');
}

function nextSlide() {
    currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    showSlide(currentSlide);
}

//guestbook
let guestbooks = JSON.parse(localStorage.getItem('guestbooks') || '[]');

function renderGuestbooks() {
    const list = document.getElementById('guestbooklist');
    list.innerHTML = '';
    guestbooks.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${t}</span>
        <button class="delete" data-index="${i}">삭제</button>
    `;
    list.appendChild(li);
    });

    document.querySelectorAll('.delete').forEach(btn => {
    btn.onclick = function() {
        const idx = Number(this.dataset.index);
        guestbooks.splice(idx, 1);
        localStorage.setItem('guestbooks', JSON.stringify(guestbooks));
        renderGuestbooks();
    }
    });
}

document.getElementById('add').onclick = function() {
    const v = document.getElementById('guestbookinput').value.trim();
    if (v) {
    guestbooks.push(v);
    localStorage.setItem('guestbooks', JSON.stringify(guestbooks));
    renderGuestbooks();
    document.getElementById('guestbookinput').value = '';
    }
};

renderGuestbooks();

//team
document.querySelectorAll('.card').forEach(card => {
    const comments = JSON.parse(card.dataset.comments);
    const commentDiv = card.querySelector('.comment');
    const img = card.querySelector('img');
    const staticImg = card.dataset.static;
    const animatedImg = card.dataset.animated;

    let idx = 0;
    let interval;

    const startRotation = () => {
        commentDiv.innerText = comments[idx];
        img.src = animatedImg;
        interval = setInterval(() => {
        idx = (idx + 1) % comments.length;
        commentDiv.innerText = comments[idx];
        }, 2000);
    };

    const stopRotation = () => {
        clearInterval(interval);
        commentDiv.innerText = '';
        img.src = staticImg;
    };

    card.addEventListener('mouseenter', startRotation);
    card.addEventListener('mouseleave', stopRotation);
});