const BASE = "http://127.0.0.1:5000";

document.getElementById("fillForm").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  if (!username) { alert("Enter username"); return; }

  try {
    const res = await fetch(`${BASE}/api/user/${encodeURIComponent(username)}`);
    const data = await res.json();

    if (!res.ok || data.error) { alert("User not found"); return; }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "fill", user: data }, (resp) => {
      console.log("Fill response:", resp);
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Cannot reach backend. Is Flask running?");
  }
});
