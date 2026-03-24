const map = {
  // 4-Letter Combinations (Capitals + Lowercase)
  "Ƙwaa": "قَوا", "ƙwaa": "قَوا", 
  "Kwaa": "كَوا", "kwaa": "كَوا", 
  "Gwaa": "غَوا", "gwaa": "غَوا", 
  "Shaa": "شَا",  "shaa": "شَا", 
  "Gyaa": "ڠَا",  "gyaa": "ڠَا", 

  // 3-Letter Combinations (Capitals + Lowercase)
  "Ƙwa": "قَو", "ƙwa": "قَو", 
  "Gwa": "غَو", "gwa": "غَو", 
  "Kwa": "كَو", "kwa": "كَو",
  "Swa": "سَوا", "swa": "سَوا",
  "Sha": "شَ",   "sha": "شَ", 
  "Ƙwo": "قوُ",  "ƙwo": "قوُ",
  " 'a": "أ", "'aa": "ءَا", 
  "'ai":"أَي", "'au": "أَو",
  "'i":"إِ", "'ii": "إِي",
  "'o": "أُ", "'oo": "أُوْ",
  "'u": "ءُ", "'uu": "أُو",
  "'e": "ءٜ", "'ee": "إٜيٰ",

  // 2-Letter Combinations
  "Au": "أَو", "au": "َو", 
  "Ai": "أَي", "ai": "َي", 
  "Aa": "آ",   "aa": "َا", 
  "Ii": "إِي", "ii": "ِي", 
  "Uu": "أُو", "uu": "ُو", 
  "Oo": "أُوْ", "oo": "ُوْ", 
  "Ee": "إٜيٰ", "ee": "ٜيٰ",
  "'a": "أَ", "'y": "ۑ", "sh": "شْ", "ts": "ڟ",
  "kw": "كو", "ky": "كي", "ƙw": "قو", "gy": "گي", 

  // Single Letters - Vowels
  "A": "أَ", "I": "إِ", "U": "أُ", "E": "إٜ", "O": "أُوْ",
  "a": "َ", "i": "ِ", "u": "ُ", "e": "ٜ", "o": "ُ",
  
  // Single Letters - Consonants (Capitals + Lowercase)
  "B": "ب", "b": "ب",
  "Ɓ": "ٻ", "ɓ": "ٻ",
  "C": "ث", "c": "ث",
  "T": "ت", "t": "ت",
  "J": "ج", "j": "ج",
  "H": "ه", "h": "ه",
  "Ƙ": "ق", "ƙ": "ق",
  "D": "د", "d": "د",
  "Ɗ": "ط", "ɗ": "ط",
  "R": "ر", "r": "ر",
  "S": "س", "s": "س",
  "K": "ك", "k": "ك",
  "L": "ل", "l": "ل",
  "M": "م", "m": "م",
  "N": "ن", "n": "ن",
  "W": "و", "w": "و",
  "Y": "ي", "y": "ي",
  "F": "ف", "f": "ف",
  "G": "غ", "g": "غ",
  "Z": "ز", "z": "ز",
  "ƴ": "ۑ", "Ƴ": "ۑ",
  
  // Punctuation
  " ": " ", ",": "،", "'": "ء", ".": ".", "?": "؟", "!": "!"
};

function convert(text) {
  if (!text) return "";
  
  let result = "";
  let i = 0;

  while (i < text.length) {
    let four  = text.slice(i, i + 4);
    let three = text.slice(i, i + 3);
    let two   = text.slice(i, i + 2);
    let one   = text[i];

    if (map[four]) {
      result += map[four];
      i += 4;
    } else if (map[three]) {
      result += map[three];
      i += 3;
    } else if (map[two]) {
      result += map[two];
      i += 2;
    } else if (map[one]) {
      result += map[one];
      i++;
    } else {
      result += one; 
      i++;
    }
  }
  return result;
}


// Logic for converter.html page
document.addEventListener("DOMContentLoaded", () => {
  const latinInput = document.getElementById("latin");
  const outArea = document.getElementById("out");

  if (latinInput && outArea) {
    // This triggers every time a key is pressed, deleted, or pasted
    latinInput.oninput = () => {
      outArea.value = convert(latinInput.value);
    };
  }
});

