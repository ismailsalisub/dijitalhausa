document.addEventListener("DOMContentLoaded", () => {
  const storiesList = document.getElementById("storiesList");
  if (!storiesList) return;

  storiesList.innerHTML = stories.map((s, i) => {
    return `
      <div class="word-card story">
        <h3 style="margin-top: 0; color: #f0c94a;">${s.title}</h3>
        
        <div id="latin-${i}" style="margin-bottom: 10px; font-size: 1.1em;">${s.latin}</div>
        
        <div id="ajami-${i}" class="ajami" style="display:none; margin-bottom: 10px; font-size: 1.8em; color: #f0c94a;" dir="rtl">
          ${s.ajami}
        </div>
        
        <div id="english-${i}" style="display:none; margin-bottom: 10px; color: #9fb3c8;">${s.english}</div>
        
        <div class="story-controls" style="margin-top: 15px;">
          <button onclick="toggleText('latin-${i}')">Latin</button>
          <button onclick="toggleText('ajami-${i}')">Ajami</button>
          <button onclick="toggleText('english-${i}')">English</button>
        </div>
      </div>
    `;
  }).join("");

  window.toggleText = function(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === "none") ? "block" : "none";
  };
});