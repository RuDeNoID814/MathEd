const allTags = ['Все', ...new Set(DATA.map(d => d.tag))];
let activeTag = 'Все';
let searchQuery = '';
let openId = null;

// Build tags
const tagsRow = document.getElementById('tagsRow');
allTags.forEach(t => {
    const el = document.createElement('div');
    el.className = 'tag' + (t === 'Все' ? ' active' : '');
    el.textContent = t;
    el.addEventListener('click', () => {
        activeTag = t;
        document.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        render();
    });
    tagsRow.appendChild(el);
});

// Search
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');

searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    render();
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    render();
    searchInput.focus();
});

function highlight(text, q) {
    if (!q) return text;
    return text.replace(
        new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
        '<mark>$1</mark>'
    );
}

function formatAnswer(text) {
    const blocks = [];
    // Вырезаем $$ блоки, заменяем < и > на \lt \gt внутри них
    text = text.replace(/\$\$[\s\S]*?\$\$/g, match => {
        const key = `%%BLOCK_${blocks.length}%%`;
        const fixed = match.replace(/</g, '\\lt ').replace(/>/g, '\\gt ');
        blocks.push(fixed);
        return key;
    });
    // Заменяем переносы строк в тексте
    text = text.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    // Возвращаем $$ блоки
    blocks.forEach((block, i) => {
        text = text.replace(`%%BLOCK_${i}%%`, block);
    });
    return text;
}

function render() {
    const list = document.getElementById('list');
    const counter = document.getElementById('counter');

    const items = DATA.filter(d =>
        (activeTag === 'Все' || d.tag === activeTag) &&
        (!searchQuery || d.question.toLowerCase().includes(searchQuery))
    );

    counter.textContent = items.length + ' / ' + DATA.length;

    if (!items.length) {
        list.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">Ничего не найдено</div>
      </div>`;
        return;
    }

    list.innerHTML = items.map(d => `
    <div class="card ${openId === d.id ? 'open' : ''}" data-id="${d.id}">
      <div class="card-header" onclick="toggle(${d.id})">
        <div class="card-badge">${d.id}</div>
        <div class="card-question">${highlight(d.question, searchQuery)}</div>
        <div class="card-chevron">›</div>
      </div>
      <div class="card-body">
        <div class="card-answer">
          <div class="answer-label">Определение</div>
          <div class="answer-text" id="ans-${d.id}">${formatAnswer(d.answer)}</div>
        </div>
      </div>
    </div>`).join('');

    if (openId) typeset(openId);
}

function typeset(id) {
    if (!window.MathJax) return;
    const el = document.getElementById('ans-' + id);
    if (el) MathJax.typesetPromise([el]).catch(() => {});
}

function toggle(id) {
    const wasOpen = openId === id;
    openId = wasOpen ? null : id;
    render();
    if (!wasOpen) {
        typeset(id);
        setTimeout(() => {
            const card = document.querySelector(`[data-id="${id}"]`);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    }
}

render();