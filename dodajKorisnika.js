document.getElementById('submit-button').addEventListener('click', function() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const packageType = document.getElementById('package').value;
    const selectedType = document.getElementById('type').value;


    if (username && password && packageType && selectedType) {

        const shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(password);
        const hashedPassword = shaObj.getHash("HEX");


        const userJson = {
            username: username,
            password: hashedPassword,
            package: packageType,
            type: selectedType
        };

        document.getElementById('form-container').style.display = 'none';
        document.getElementById('json-container').style.display = 'block';
        document.getElementById('json-output').textContent = JSON.stringify(userJson, null, 2);
    } else {
        alert("Molimo popunite sva polja.");
    }
});


document.getElementById('back-button').addEventListener('click', function() {

    location.reload();
});
