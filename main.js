var form = document.getElementById("contact-form");
console.log(form)

async function handleSubmit(event) {
    console.log("here")
    event.preventDefault();
    var status = document.getElementById("contact-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        console.log("success")
        status.innerHTML = "Thank you for your submission!";
        status.className = "success";
        form.reset()
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
        }
        })
        status.className = "error";
    }
    }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form";
    status.className = "error";
    });
}

form.addEventListener("submit", handleSubmit)