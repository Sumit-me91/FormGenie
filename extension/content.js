chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== "fill") return;

  const u = msg.user || {};
  const map = {
    name: ["name", "fullname"],
    email: ["email"],
    phone: ["phone", "mobile"],
    address: ["address"],
    education: ["education"],
    dob: ["dob", "dateofbirth"]
  };

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

  fill(u.name, map.name);
  fill(u.email, map.email);
  fill(u.phone, map.phone);
  fill(u.address, map.address);
  fill(u.education, map.education);
  fill(u.dob, map.dob);

  sendResponse({ ok: true });
});
