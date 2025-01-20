document.addEventListener('DOMContentLoaded', function () {
    function hashPassword(password) {
        const shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(password);
        return shaObj.getHash("HEX");
    }

    const savedUsername = sessionStorage.getItem('username');

    if (savedUsername) {
        window.location.href = `account.html?username=${encodeURIComponent(savedUsername)}`;
    }

    document.getElementById('login-btn').addEventListener('click', function (event) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        document.getElementById('username-error').style.display = 'none';
        document.getElementById('password-error').style.display = 'none';
        document.getElementById('empty-username').style.display = 'none';
        document.getElementById('empty-password').style.display = 'none';

        if (!username) {
            document.getElementById('empty-username').style.display = 'inline';
            return;
        }
        if (!password) {
            document.getElementById('empty-password').style.display = 'inline';
            return;
        }

        fetch('./users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === username);

                if (!user) {
                    document.getElementById('username-error').style.display = 'inline';
                    return;
                }

                const hashedPassword = hashPassword(password);

                if (user.password === hashedPassword) {
                    sessionStorage.setItem('username', username);
                    window.location.href = `account.html?username=${encodeURIComponent(username)}`;
                } else {
                    document.getElementById('password-error').style.display = 'inline';
                }
            })
            .catch(error => {
                console.error('Greška prilikom učitavanja korisnika:', error);
            });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('login-btn').click();
        }
    });
      
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById("password");
        const passwordType = passwordInput.getAttribute("type");

        if (passwordType === "password") {
            passwordInput.setAttribute("type", "text");
            this.textContent = "🙈";
        } else {
            passwordInput.setAttribute("type", "password");
            this.textContent = "👁️";
        }
    }

    const togglePasswordButton = document.getElementById("toggle-password");
    togglePasswordButton.addEventListener("click", togglePasswordVisibility);
    togglePasswordButton.addEventListener("touch", togglePasswordVisibility);
});
