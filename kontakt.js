    const form = document.querySelector("#forma");
    const nameInput = form.querySelector("#inputi input[type='text']");
    const emailInput = form.querySelector("#inputi div:nth-child(2) input");
    const messageInput = form.querySelector("#poruka textarea");
    const submitButton = form.querySelector("button");
    const charCounter = document.querySelector("#charCounter");

    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameRegex = /^[A-ZČĆŽŠĐ][a-zčćžšđ]+(\s[A-ZČĆŽŠĐ][a-zčćžšđ]+)+$/;
        if (!nameRegex.test(nameValue)) {
            return "Ime i prezime moraju počinjati velikim slovima i sadržati razmak.";
        }
        return "";
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.rs$/;
        if (!emailRegex.test(emailValue)) {
            return "Email adresa mora biti validna i završavati se na .rs.";
        }
        return "";
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue.length > 255) {
            return "Poruka ne sme biti duža od 255 karaktera.";
        }
        if (/\d/.test(messageValue)) {
            return "Poruka ne sme sadržati cifre.";
        }
        return "";
    }

    function showError(inputElement, message) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains("error")) {
            errorElement = document.createElement("p");
            errorElement.classList.add("error");
            inputElement.insertAdjacentElement("afterend", errorElement);
        }
        errorElement.textContent = message;
    }

    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error")) {
            errorElement.remove();
        }
    }

    function toggleAdvice(inputElement, show) {
        let adviceElement = inputElement.nextElementSibling;
        while (adviceElement && !adviceElement.classList.contains("advice")) {
            adviceElement = adviceElement.nextElementSibling;
            clearError(inputElement);
        }
        if (adviceElement) {
            adviceElement.style.display = show ? "block" : "none";
        }
    }

    function updateCharCounter() {
        const charCount = messageInput.value.length;
        charCounter.textContent = `${charCount}/255`;
        if (charCount > 255) {
            messageInput.value = messageInput.value.slice(0, 255);
            charCounter.textContent = "255/255";
        }
    }

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener("focus", () => toggleAdvice(input, true));
        input.addEventListener("blur", () => toggleAdvice(input, false));
    });

    messageInput.addEventListener("input", updateCharCounter);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, "Ime i prezime ne smeju biti prazni.");
            isValid = false;
        } else {
            const nameError = validateName();
            if (nameError) {
                showError(nameInput, nameError);
                isValid = false;
            } else {
                clearError(nameInput);
            }
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, "Email ne sme biti prazan.");
            isValid = false;
        } else {
            const emailError = validateEmail();
            if (emailError) {
                showError(emailInput, emailError);
                isValid = false;
            } else {
                clearError(emailInput);
            }
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, "Poruka ne sme biti prazna.");
            isValid = false;
        } else {
            const messageError = validateMessage();
            if (messageError) {
                showError(messageInput, messageError);
                isValid = false;
            } else {
                clearError(messageInput);
            }
        }

        if (isValid) {
            alert("Poruka je uspešno poslata!");
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            updateCharCounter();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('posalji').click();
        }
    });
    

    updateCharCounter();

