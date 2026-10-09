document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const output = document.querySelector("#terminal-output");

if (form && input && output) {
  const print = (message, className = "") => {
    const line = document.createElement("p");
    if (className) line.className = className;
    line.textContent = message;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value.trim().toLowerCase();
    if (!command) return;
    print("$ " + command);
    input.value = "";

    const responses = {
      help: "Commands: help, about, check, clear",
      about: "This is a simulated terminal for cybersecurity learning. It does not run real system commands.",
      check: "Demo status: active. Device scan: not performed. No real system was accessed."
    };

    if (command === "clear") {
      output.replaceChildren();
      print("Output cleared.", "result");
    } else if (Object.prototype.hasOwnProperty.call(responses, command)) {
      print(responses[command], "result");
    } else {
      print("Command not recognised. Type help to see available commands.");
    }
  });
}
