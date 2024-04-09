document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var account = document.getElementById("account").value;
    var password = document.getElementById("password").value;

    
    var encryptedPassword = encrypt(password);


    localStorage.setItem(account, encryptedPassword);

    
    updatePasswordList();
});

document.getElementById("searchButton").addEventListener("click", function() {
    var searchInput = document.getElementById("searchInput").value;
    searchPasswords(searchInput);
});

function updatePasswordList() {
    var passwordListContainer = document.getElementById("passwordList");
    passwordListContainer.innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {
        var account = localStorage.key(i);
        var password = decrypt(localStorage.getItem(account));

        var passwordItem = document.createElement("div");
        passwordItem.textContent = account + ": " + password;
        passwordListContainer.appendChild(passwordItem);
    }
}

function searchPasswords(keyword) {
    keyword = keyword.toLowerCase();
    var passwordListContainer = document.getElementById("passwordList");
    passwordListContainer.innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {
        var account = localStorage.key(i).toLowerCase();
        var password = decrypt(localStorage.getItem(localStorage.key(i)));

        if (account.includes(keyword)) {
            var passwordItem = document.createElement("div");
            passwordItem.textContent = localStorage.key(i) + ": " + password;
            passwordListContainer.appendChild(passwordItem);
        }
    }
}


function encrypt(password) {
    return btoa(password);
}

function decrypt(encryptedPassword) {
    return atob(encryptedPassword);
}

updatePasswordList();
