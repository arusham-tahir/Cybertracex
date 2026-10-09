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

  const runCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;
    print("$ " + command);
    const responses = {
      help: "Available commands: help, about, check, clear",
      about: "CyberTraceX Learning Lab. This is a browser-based simulation, not a real terminal.",
      check: "Demo status: active. No device scan was performed and no system was accessed."
    };
    if (command === "clear") {
      output.replaceChildren();
      print("Output cleared.", "result");
    } else if (Object.prototype.hasOwnProperty.call(responses, command)) {
      print(responses[command], "result");
    } else {
      print("Command not recognised. Type help to see available commands.");
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runCommand(input.value);
    input.value = "";
  });

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command);
      input.focus();
    });
  });
}
