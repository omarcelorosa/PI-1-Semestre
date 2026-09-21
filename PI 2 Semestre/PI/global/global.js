fetch("global/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

fetch("global/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
        const date = new Date();
        document.getElementById("ano").textContent = date.getFullYear();

    });


    