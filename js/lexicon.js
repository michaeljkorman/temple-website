let currentActiveTerm = null;

async function openLexicon(termId) {
    const drawer = document.getElementById('lexicon-drawer');

    // TOGGLE: If the same term is clicked while open, close it.
    if (drawer.classList.contains('open') && currentActiveTerm === termId) {
        closeLexicon();
        return;
    }

    const listContainer = document.getElementById('lexicon-list');

    // 1. Fetch and Build the list only if it's empty
    if (listContainer.innerHTML.trim() === "") {
        try {
            const response = await fetch('/lexicon.json');
            const lexicon = await response.json();

            let htmlContent = "";

            for (const [id, data] of Object.entries(lexicon)) {
                htmlContent += `
                    <div id="def-${id}" class="lexicon-entry">
                        <h3>${data.title}</h3>
                        <p>${data.content}</p>
                    </div>`;
            }

            listContainer.innerHTML = htmlContent;
        } catch (e) {
            console.error("Temple Lexicon failed to load", e);
            return;
        }
    }

    // 2. Open the drawer
    drawer.classList.add('open');

    // 3. Highlight and Scroll
    setTimeout(() => {
        const target = document.getElementById('def-' + termId);
        if (target) {
            // Remove previous highlights
            document.querySelectorAll('.lexicon-entry').forEach(el => el.classList.remove('active'));

            // Highlight new target
            target.classList.add('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function closeLexicon() {
    document.getElementById('lexicon-drawer').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const btn = document.querySelector('.close-btn');
        btn.classList.add('close-pulse');
        setTimeout(() => {
            closeLexicon();
            btn.classList.remove('close-pulse');
        }, 150);
    }
});

document.addEventListener('mousedown', (e) => {
    const drawer = document.getElementById('lexicon-drawer');
    // If the drawer is open AND the click was NOT inside the drawer 
    // AND NOT on a lexicon term (otherwise the toggle fails)
    if (drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !e.target.classList.contains('lexicon-term')) {
        closeLexicon();
    }
});

window.onload = () => {
    const portalHTML = `
    <aside id="lexicon-drawer">
        <div class="drawer-header">
            <button class="close-btn" onclick="closeLexicon()">✕</button>
            <h2>Lexicon</h2>
        </div>
        
        <div id="lexicon-list"></div>
    </aside>

    <div id="temple-overlay" onclick="closeLexicon()"></div>
  `;
    document.body.insertAdjacentHTML('beforeend', portalHTML);
};

class LexiconTerm extends HTMLElement {
  connectedCallback() {
    // We wrap this in a timeout so the browser has time to parse the inner text
    setTimeout(() => {
      const termId = this.getAttribute('term') || this.innerText.toLowerCase().trim();//toLowerCase().trim();
      
      // If it's still empty, don't break the page
      if (!termId) return;

      this.classList.add('lexicon-term');
      this.style.cursor = 'help'; // Inline style for safety
      this.setAttribute('role', 'button');
      this.onclick = () => openLexicon(termId);
    }, 0);
  }
}

customElements.define('lex-term', LexiconTerm);