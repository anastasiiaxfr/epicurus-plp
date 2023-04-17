//Cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// Switcher
if (getCookie("theme") === "white") {
    $("body").addClass("white");
    $(".switch input[type=checkbox]").prop("checked", true);
} else {
    $("body").removeClass("white");
    $(".switch input[type=checkbox]").prop("checked", false);
}

$(".switch input[type=checkbox]").change(function () {
    if ($(this).is(":checked")) {
        $("body")
            .addClass("white")
            .removeClass("dark");
        setCookie("theme", "white", 365);
    } else {
        $("body")
            .removeClass("white")
            .addClass("dark");
        removeCookie("theme");
        setCookie("theme", "dark", 365);
    }
});

// SEND to SendPulse
const addressBookId = '559464';
const id = '157600cc58dd5e8f4d79d3777b0672ee';
const secret = '01bc431ae54607949cdbb457e723ed7e';


function getKey() {
    const accessData = {
        "grant_type": "client_credentials",
        "client_id": id,
        "client_secret": secret
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accessData)
    };

    fetch('https://api.sendpulse.com/oauth/access_token', requestOptions)
        .then(response => response.json())
        .then(data => setCookie("access_token", data.access_token, 1/4))
        .catch(error => console.error(error));
}

const apiUrl = `https://api.sendpulse.com/addressbooks/${addressBookId}/emails`;

const emailData = {
    emails: [],
};

getKey();
let access_token = getCookie("access_token");

function sendRegForm() {
    setCookie("form_send", true, 1/4);

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(emailData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));
}



// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll(".needs-validation");

(function () {
    "use strict";

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                form.classList.add("was-validated");
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    //event.preventDefault()
                    //event.stopPropagation()

                    const emailInput = form.querySelector('input[type="email"]');
                    const passwordInput = form.querySelector('input[type="password"]');
                    if (emailInput && passwordInput) {
                        const data = {
                            email: emailInput.value,
                            variables: {
                                password: passwordInput.value,
                            },
                        };
                        emailData.emails.push(data);
                        //alert(emailData.emails[0].email + emailData.emails[0].variables.password);
                        sendRegForm();
                    }
                }
            },
            false
        );
    });
})();



// Form
const password = document.querySelector("#reg_password");
const password_login = document.querySelector("#login_password");
const password_reset = document.querySelector("#reset_password");
const password_confirm = document.querySelector("#reg_password_confirm");
let password_check;

function passwordConfirmValidity(e) {
    if (e.target.value == (password.value || password_login.value || password_reset.value)) {
        password_check = true;
        e.target
            .closest(".modal-row")
            .querySelector(".invalid-feedback")
            .classList.add("d-none");
        e.target.classList.remove("is-invalid");
        e.target.setCustomValidity("");
    } else {
        e.target
            .closest(".modal-row")
            .querySelector(".invalid-feedback")
            .classList.remove("d-none");
        password_check = false;
        e.target.setCustomValidity("Invalid input");
        //this.classList.add('is-invalid');
    }
}

function passwordValidity(e) {
    password_check = false;
    password_confirm.value = "";
    password_confirm
        .closest(".modal-row")
        .querySelector(".invalid-feedback")
        .classList.remove("d-none");
    if (e.target.validity.valid) {
        e.target.closest(".modal-row")
            .querySelector(".invalid-feedback")
            .classList.add("d-none");
    }
}

password_confirm.addEventListener("input", function (e) {
    passwordConfirmValidity(e);
});

password_confirm.addEventListener("change", function (e) {
    passwordConfirmValidity(e);
});

password.addEventListener("input", function (e) {
    passwordValidity(e);
});

password_login.addEventListener("input", function (e) {
    passwordValidity(e);
});

password_reset.addEventListener("input", function (e) {
    passwordValidity(e);
});

const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const invalidFeedback = this.closest(".modal-row").querySelector(
            ".invalid-feedback"
        );
        if (this.checked) {
            invalidFeedback.classList.add("d-none");
        } else {
            invalidFeedback.classList.remove("d-none");
        }
    });
});

const input = document.querySelectorAll(".form-control:not([type=password])");

input.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
        const invalidFeedback = inputElement
            .closest(".modal-row")
            .querySelector(".invalid-feedback");
        if (inputElement.validity.valid) {
            invalidFeedback.classList.add("d-none");
        }
    });
});

const formSend = document.querySelector("#modalSuccessSend");
let check_form_send = getCookie("form_send");
check_form_send === "true" && setTimeout(window.location.replace("/"), 1000);
if (check_form_send === "true") {
    formSend.classList.add('d-block', 'show');
    removeCookie("form_send");
    //FIXME need correct reset from
}

const formAll = document.querySelectorAll('form');
// check_form_send === true && formAll.forEach(i => {
//     i.reset();
// });

// MODAL
const modal = document.querySelectorAll(".modal");
const modal_toggle = document.querySelectorAll(
    '.modal [data-bs-toggle="modal"]'
);
const modal_toggle_all = document.querySelectorAll('[data-bs-toggle="modal"]');
const modal_close = document.querySelectorAll(
    '.modal [data-bs-dismiss="modal"]'
);
const modal_content = document.querySelector(".modal-content");
const body = document.body;

modal.forEach(function (ell) {
    ell.addEventListener("click", function (e) {
        if (!e.target.closest(".modal-content")) {
            this.classList.add("d-none");
            this.classList.remove("show");
        }
    });
});

modal_toggle.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal = this.closest(".modal");
        modal.classList.remove("show");
        modal.style.display = "none";
        const modal_wrapper = document.querySelector(".modal-backdrop");
        if (modal_wrapper) {
            modal_wrapper.classList.add("d-none");
        }
    });
});

modal_toggle_all.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal_target = this.getAttribute("data-bs-target");
        document.querySelector(modal_target).classList.add("show");
        document.querySelector(modal_target).style.display = "block";
    });
});

modal_close.forEach(function (ell) {
    ell.addEventListener("click", function () {
        const modal_current = this.closest(".modal");
        modal_current.classList.remove("show");
        modal_current.classList.remove("d-block");

        if (!body.classList.contains("modal-open")) {
            body.style.overflow = "";
            body.style.paddingRight = "";
        }
    });
});
