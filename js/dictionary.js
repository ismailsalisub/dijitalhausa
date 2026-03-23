// 1. GLOBAL HELPER FUNCTIONS (Outside the listener so they are always accessible)

window.toggleCard = function(header) {
    const card = header.parentElement;
    const details = card.querySelector(".card-details");
    details.style.display = details.style.display === "block" ? "none" : "block";
};

window.searchWord = function(query) {
    const dictSearch = document.getElementById("dictSearch");
    if (!dictSearch) return;

    // Filter and Render based on clicking a synonym or use case
    dictSearch.value = query;
    const filtered = dictionary.filter(d => 
        d.word.toLowerCase().includes(query.toLowerCase()) || 
        d.english.toLowerCase().includes(query.toLowerCase())
    );
    renderDict(filtered);

    // Auto-Expand and Scroll to the specific card
    setTimeout(() => {
        const cards = document.querySelectorAll(".word-card");
        cards.forEach(card => {
            const title = card.querySelector(".word-title").innerText.toLowerCase();
            if (title === query.toLowerCase() || query.toLowerCase().includes(title)) {
                const details = card.querySelector(".card-details");
                if (details) details.style.display = "block";
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Visual feedback highlight
                card.style.border = "2px solid #f0c94a";
                setTimeout(() => card.style.border = "none", 2000);
            }
        });
    }, 150); 
};

function wordCard(entry) {
    const displayAjami = entry.ajami ? entry.ajami : convert(entry.word);
    
    // CLICKABLE SYNONYMS
    const synonymsHtml = (entry.synonyms && entry.synonyms.length > 0) 
        ? `<p><b>Synonyms:</b> ${entry.synonyms.map(s => `
            <b style="color:#f0c94a; cursor:pointer; text-decoration:underline;" 
               onclick="searchWord('${s}')">
               ${s}
            </b>`).join(", ")}</p>` 
        : "";

    // CLICKABLE USE CASES
    const useCasesHtml = (entry.use_cases && entry.use_cases.length > 0)
        ? `<div class="use-cases" style="margin-top:10px; border-left: 3px solid #f0c94a; padding-left: 10px;">
             <small style="color: #f0c94a; font-weight: bold;">Contextual Uses:</small>
             <ul style="margin: 5px 0; padding-left: 15px; font-style: italic; font-size: 0.9em;">
               ${entry.use_cases.map(u => `
                 <li style="margin-bottom:5px;">
                   <b style="color:#f0c94a; cursor:pointer; text-decoration:underline;" 
                      onclick="searchWord('${u.phrase.includes('(') ? u.phrase.split(' ')[0] : u.phrase}')">
                      ${u.phrase}
                   </b>: ${u.meaning}
                 </li>`).join("")}
             </ul>
           </div>`
        : "";

    return `
    <div class="word-card">
      <div class="word-header" onclick="toggleCard(this)" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
        <strong class="word-title" style="font-size: 1.2em;">${entry.word}</strong>
        <div class="ajami" dir="rtl" style="font-size: 1.6em; color: #f0c94a;">${displayAjami}</div>
      </div>
      <div class="translation" style="color: #9fb3c8; margin-top: 5px;">${entry.english}</div>
      <div class="card-details" style="display:none; margin-top:15px; border-top:1px solid #1f2937; padding-top:10px;">
        <p><b>Plural:</b> ${entry.plural || '-'}</p>
        ${synonymsHtml}
        ${useCasesHtml}
        <div style="margin-top:10px;">
          <b>Examples:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
            ${entry.examples.map(e => `<li>${e}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>`;
}

function renderDict(list) {
    const dictList = document.getElementById("dictList");
    if (!dictList) return;
    dictList.innerHTML = list.map(item => wordCard(item)).join("");
}

// 2. INITIALIZATION ON PAGE LOAD

document.addEventListener("DOMContentLoaded", () => {
    // Initial Render
    renderDict(dictionary);

    // Search & Clear Logic
    const dictSearch = document.getElementById("dictSearch");
    const clearSearch = document.getElementById("clearSearch");

    if (dictSearch) {
        dictSearch.oninput = (e) => {
            const q = e.target.value;
            if (clearSearch) clearSearch.style.display = q.length > 0 ? "block" : "none";
            
            const filtered = dictionary.filter(d => 
                d.word.toLowerCase().includes(q.toLowerCase()) || 
                d.english.toLowerCase().includes(q.toLowerCase())
            );
            renderDict(filtered);
        };
    }

    if (clearSearch) {
        clearSearch.onclick = () => {
            dictSearch.value = "";
            clearSearch.style.display = "none";
            renderDict(dictionary);
            dictSearch.focus();
        };
    }

    // Handle URL parameters (e.g. search from homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm && dictSearch) {
        searchWord(searchTerm);
    }
});
