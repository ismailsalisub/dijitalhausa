document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. MOBILE NAV TOGGLE ---
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.onclick = () => {
      mainNav.classList.toggle("active");
      menuToggle.classList.toggle
      ("open");
    };

    // Close menu when a link is clicked
    const navItems = mainNav.querySelectorAll("a");
    navItems.forEach(item => {
      item.onclick = () => {
        mainNav.classList.remove("active");
        menuToggle.classList.remove("open");
      };
    });
  }

  // --- 2. HIGHLIGHT ACTIVE PAGE ---
  const allNavLinks = document.querySelectorAll("nav a");
  const currentFileName = window.location.pathname.split("/").pop() || "index.html";
  
  allNavLinks.forEach(link => {
    if (link.getAttribute("href") === currentFileName) {
      link.classList.add("active");
    }
  });

  // --- 3. HOMEPAGE QUICK SEARCH ---
  const quickSearch = document.getElementById("quickSearch");
  const quickResults = document.getElementById("quickResults");

  if (quickSearch && quickResults) {
    quickSearch.oninput = e => {
      const q = e.target.value.toLowerCase();
      if (q.length < 1) {
        quickResults.innerHTML = "";
        return;
      }

      // 'dictionary' variable comes from data/dictionary.js
      if (typeof dictionary !== 'undefined') {
        const matches = dictionary.filter(d => 
          d.word.toLowerCase().includes(q) || 
          d.english.toLowerCase().includes(q)
        );
        
        quickResults.innerHTML = matches.map(d => `
          <div class="quick-item" onclick="window.location='dictionary.html?search=${encodeURIComponent(d.word)}'">
            ${d.word} <span style="font-size:0.8em; color:#9fb3c8;">(${d.english})</span>
          </div>
        `).join("");
      }
    };
  }

  // --- 4. MINI CONVERTER (Home Page) ---
  const miniBtn = document.getElementById("miniConvert");
  const miniIn = document.getElementById("miniInput");
  const miniOut = document.getElementById("miniOutput");

  if (miniBtn && miniIn && miniOut) {
    miniBtn.onclick = () => {
      // 'convert' function comes from js/converter.js
      if (typeof convert === 'function') {
        miniOut.innerText = convert(miniIn.value);
      }
    };
  }
  
  // --- 5. CONVERTER EXTRA UTILITIES ---
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const latinInput = document.getElementById("latin");
const outArea = document.getElementById("out");

if (clearBtn) {
  clearBtn.onclick = () => {
    latinInput.value = "";
    outArea.value = "";
    latinInput.focus();
  };
}

if (copyBtn) {
  copyBtn.onclick = () => {
    if (!outArea.value) return;
    
    // Copy to clipboard
    navigator.clipboard.writeText(outArea.value).then(() => {
      const originalText = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      copyBtn.style.background = "#0f766e";
      
      // Reset button text after 2 seconds
      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.style.background = "";
      }, 2000);
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  };
}

  const correctionBtn = document.getElementById("correctionBtn");
  if (correctionBtn) {
    correctionBtn.onclick = () => {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const email = "corrections@digitalhausa.com"; // Replace with your email
      const subject = encodeURIComponent(`Correction for DigitalHausa: ${currentPage}`);
      const body = encodeURIComponent("Please describe the error or the new use case you'd like to add:\n\n");
      
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };
  } 
});
