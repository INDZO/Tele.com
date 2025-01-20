document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    if (!username) {
        alert("Korisničko ime nije prosleđeno u URL-u!");
        return;
    }

    fetch('./users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username);

            if (!user) {
                alert("Korisnik nije pronađen!");
                return;
            }

            document.getElementById('username').textContent = user.username;


            fetch('https://vebdizajn-4.onrender.com/api/vebdizajn/internet-usluge')
                .then(response => response.json())
                .then(packets => {
                    const userPackageType = user.package.toUpperCase(); // SOLO, DUO, TRIO
                    const userPackageName = user.type.charAt(0).toUpperCase() + user.type.slice(1); // Starter, Plus, Premium
                    const selectedPackage = packets[userPackageType].find(pkg => pkg.name.toLowerCase() === userPackageName.toLowerCase());


                    if (!selectedPackage) {
                        alert("Paket korisnika nije pronađen!");
                        return;
                    }

                    document.getElementById('nazivpaketa').textContent = `${userPackageType} ${userPackageName}`;
                    document.getElementById('wifi').textContent = `Brzina: ${selectedPackage.speed}`;

                    if (selectedPackage.tv_channels) {
                        document.getElementById('tv').textContent = `TV Kanali: ${selectedPackage.tv_channels}`;
                    }
                    else{
                        document.getElementById('televizija').style.display = 'none';
                    }
                    if (selectedPackage.minutes) {
                        document.getElementById('phone').textContent = `Minuti: ${selectedPackage.minutes}`;
                    }else{
                        document.getElementById('telefonija').style.display = 'none';
                    }
                    Array.from(document.getElementsByClassName('cena')).forEach(element => {
                        const priceText = selectedPackage.price; 

                        const priceOnly = priceText.replace(" RSD / mesečno", ""); 
                    
                        element.textContent = `${priceOnly} RSD`; 
                    });
                    
                })
                .catch(error => {
                    console.error('Greška pri učitavanju paketa:', error);
                    alert("Došlo je do greške pri učitavanju paketa.");
                });
        })
        .catch(error => {
            console.error('Greška pri učitavanju korisnika:', error);
            alert("Došlo je do greške pri učitavanju korisnika.");
        });


        document.getElementById('logout').addEventListener('click', function() {
            sessionStorage.removeItem('username');
            window.location.replace('./login.html');
            window.location.reload(true); 
            
        });
        document.getElementById('ime').addEventListener('click', function() {
            sessionStorage.removeItem('username');
            window.location.replace('./login.html');
            window.location.reload(true); 
        });
});
