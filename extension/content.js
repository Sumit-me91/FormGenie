// ✅ Backend URL (keep this at TOP level)
const API_URL = "https://formgenie-production.up.railway.app";

// ✅ Listen for messages from popup/background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== "fill") return;

  // 🔹 Call backend (optional – for testing / future use)
  fetch(`${API_URL}/`)
    .then(response => response.json())
    .then(data => {
      console.log("Backend response:", data);
    })
    .catch(err => console.error("API error:", err));

  const u = msg.user || {};

  // ✅ Field mapping
  const map = {
    name: ["name", "fullname"],
    email: ["email"],
    phone: ["phone", "mobile"],
    address: ["address"],
    education: ["education"],
    dob: ["dob", "dateofbirth"]
  };

  // ✅ Autofill helper
  function fill(value, keys) {
    if (!value) return;

    document.querySelectorAll("input, textarea").forEach(el => {
      const id = (el.id || "").toLowerCase();
      const name = (el.name || "").toLowerCase();
      const ph = (el.placeholder || "").toLowerCase();

      if (keys.some(k => id.includes(k) || name.includes(k) || ph.includes(k))) {
        el.value = value;
      }
    });
  }

  // ✅ Fill fields
  fill(u.name, map.name);
  fill(u.email, map.email);
  fill(u.phone, map.phone);
  fill(u.address, map.address);
  fill(u.education, map.education);
  fill(u.dob, map.dob);

  sendResponse({ ok: true });
});

