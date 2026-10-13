const form = document.querySelector("#chatForm");
const input = document.querySelector("#promptInput");
const messages = document.querySelector("#messages");
const welcome = document.querySelector("#welcome");
const suggestions = document.querySelector("#suggestions");
const sidebar = document.querySelector("#sidebar");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function addMessage(text, role) {
  const wrapper = document.createElement("article");
  wrapper.className = `message ${role}`;
  if (role === "assistant") {
    const label = document.createElement("div");
    label.className = "assistant-label";
    label.textContent = "ChatGPT";
    wrapper.appendChild(label);
  }
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
}

function demoReply(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes("html") || lower.includes("css") || lower.includes("javascript")) {
    return "Here’s a simple way to think about it:\n\n• HTML gives a webpage its structure (headings, buttons, forms).\n• CSS controls how it looks (colours, spacing, layout, fonts).\n• JavaScript makes it interactive (sending messages, opening menus, updating content).\n\nFor this assignment, index.html contains the structure, styles.css handles the design, and script.js adds the interactions. This is a demo reply, not a real AI response.";
  }
  if (lower.includes("project idea") || lower.includes("website idea")) {
    return "Here are three beginner-friendly website projects:\n\n1. Student portfolio — introduce yourself and showcase your skills.\n2. Study planner — organise subjects, tasks, and deadlines.\n3. Weather dashboard — show weather information in a clean card layout.\n\nStart with HTML and CSS, then add JavaScript for interactivity.";
  }
  if (lower.includes("plan") || lower.includes("study")) {
    return "A simple plan to get started:\n\n1. Break the assignment into small tasks.\n2. Build the HTML structure first.\n3. Add the colours, spacing, and responsive layout in CSS.\n4. Use JavaScript for buttons and chat interactions.\n5. Test the page on both desktop and mobile.\n6. Upload the files to a GitHub repository.\n\nTip: commit your work in small steps so you can track your progress.";
  }
  return "Thanks for your message! This frontend is a visual demo, so it doesn’t use a real AI model or generate live ChatGPT answers.\n\nYou can connect a backend or an AI API later if your assignment requires real responses. For now, try sending another message or using one of the suggestion buttons.";
}

function sendMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;
  welcome.hidden = true;
  suggestions.hidden = true;
  addMessage(cleanText, "user");
  input.value = "";
  input.style.height = "auto";
  document.querySelector("#sendButton").disabled = true;
  // Small delay makes the prototype feel conversational.
  setTimeout(() => {
    addMessage(demoReply(cleanText), "assistant");
    document.querySelector("#sendButton").disabled = false;
    input.focus();
  }, 450);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

document.querySelector("#newChat").addEventListener("click", () => {
  messages.replaceChildren();
  welcome.hidden = false;
  suggestions.hidden = false;
  input.value = "";
  input.focus();
  sidebar.classList.remove("open");
});
document.querySelector("#openSidebar").addEventListener("click", () => sidebar.classList.add("open"));
document.querySelector("#closeSidebar").addEventListener("click", () => sidebar.classList.remove("open"));
document.querySelector("#searchChats").addEventListener("click", () => showToast("Chat search is a UI demo."));
document.querySelector("#shareButton").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Page link copied!");
  } catch {
    showToast("Share is a demo in this local preview.");
  }
});
document.querySelector("#moreButton").addEventListener("click", () => showToast("More options coming soon."));
document.querySelector("#attachButton").addEventListener("click", () => showToast("File attachments are not enabled in this demo."));
document.querySelector("#toolsButton").addEventListener("click", () => showToast("Tools menu is a visual demo."));
document.querySelector(".voice-button").addEventListener("click", () => showToast("Voice mode is not enabled in this demo."));

document.querySelectorAll(".history-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".history-item").forEach((chat) => chat.classList.remove("active"));
    item.classList.add("active");
    showToast("Saved chat history is a visual demo.");
    sidebar.classList.remove("open");
  });
});
document.querySelector(".profile").addEventListener("click", () => showToast("Profile menu is a visual demo."));
document.querySelector(".upgrade-card").addEventListener("click", () => showToast("Plan options are not connected in this demo."));
