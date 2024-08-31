const pwBox = document.getElementById("password");
const copyImg = document.getElementById("copyImg");
const pwLen = document.getElementById("length");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_+|}{<>/=";

let selectedChars = "";

const allChars = upperCase + lowerCase + number + symbol;

const uppBtn = document.getElementById("uppBtn");
const lowBtn = document.getElementById("lowBtn");
const numBtn = document.getElementById("numBtn");
const symBtn = document.getElementById("symBtn");

const genBtn = document.getElementById("genB");

uppBtn.addEventListener("click", () => toggleSelection(uppBtn, upperCase));
lowBtn.addEventListener("click", () => toggleSelection(lowBtn, lowerCase));
numBtn.addEventListener("click", () => toggleSelection(numBtn, number));
symBtn.addEventListener("click", () => toggleSelection(symBtn, symbol));

function toggleSelection(button, charSet) {
  if (!button.dataset.state) {
    button.dataset.state = 0;
  }
  button.dataset.state = (parseInt(button.dataset.state) + 1) % 2;
  if (parseInt(button.dataset.state) === 0) {
    if (button === uppBtn) {
      selectedChars = selectedChars.replace(/[A-Z]/g, "");
      button.className = "opBtn";
    } else if (button === lowBtn) {
      selectedChars = selectedChars.replace(/[a-z]/g, "");
      button.className = "opBtn";
    } else if (button === numBtn) {
      selectedChars = selectedChars.replace(/[0-9]/g, "");
      button.className = "opBtn";
    } else {
      selectedChars = selectedChars.replace(/[!@#$%^&*()_+|}{<>/=]/g, "");
      button.className = "opBtn";
    }
    // selectedChars = selectedChars.replace(new RegExp(`[${charSet}]`, "g"), "");
  } else {
    selectedChars += charSet;
    button.className = "opBtnDown";
  }
  // alert(`selectedChars: ${selectedChars}`);
}

function createPassword() {
  if (selectedChars === "") {
    alert("Please select at least one character type!");
    return;
  }
  let password = "";
  // password += upperCase[Math.floor(Math.random() * upperCase.length)];
  // password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  // password += number[Math.floor(Math.random() * number.length)];
  // password += symbol[Math.floor(Math.random() * symbol.length)];
  const length = pwLen.value;

  while (length > password.length) {
    password += selectedChars[Math.floor(Math.random() * selectedChars.length)];
  }
  pwBox.value = password;
}

copyImg.addEventListener("click", () => {
  const text = pwBox.value;
  const tmp = document.createElement("textarea");
  tmp.value = text;

  document.body.appendChild(tmp);

  tmp.select();
  document.execCommand("copy");

  document.body.removeChild(tmp);
});

genBtn.addEventListener("click", createPassword);
