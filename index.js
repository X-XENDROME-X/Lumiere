document.addEventListener('DOMContentLoaded', function() {
  const primaryButton = document.querySelector('.primary__button');
  const secondaryButton = document.querySelector('.secondary__button');
  
  const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'asu.edu'];

  function validateEmail(inputSelector, button) {
      const emailInput = document.querySelector(inputSelector);
      const inputValue = emailInput.value.trim();

      if (inputValue) {
          const emailDomain = inputValue.split('@')[1];
          if (emailDomain && validDomains.includes(emailDomain)) {
              alert("Registration Link sent to the Email.");
          } else {
              alert("Please enter a valid email address from a recognized provider.");
          }
      } else {
          alert("No email address provided. Please enter a valid email address.");
      }
  }

  primaryButton.addEventListener('click', function() {
      validateEmail('.email__input', primaryButton);
  });

  secondaryButton.addEventListener('click', function() {
      validateEmail('.Email__input', secondaryButton);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let accordions = document.getElementsByClassName("FAQ__title");

  for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function () {
          if (this.childNodes[1].classList.contains("fa-plus")) {
              this.childNodes[1].classList.remove("fa-plus");
              this.childNodes[1].classList.add("fa-times");
          } else {
              this.childNodes[1].classList.remove("fa-times");
              this.childNodes[1].classList.add("fa-plus");
          }

          let content = this.nextElementSibling;
          if (content.style.maxHeight) {
              content.style.maxHeight = null;
          } else {
              content.style.maxHeight = content.scrollHeight + "px";
          }
      });
  }
});
