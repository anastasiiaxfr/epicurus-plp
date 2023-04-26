//COLLAPSE
let collapse_toggle = document.querySelector('.dropdown-toggle');
let collapse_body = document.querySelector('.dropdown-menu');
if (collapse_toggle) {
    collapse_toggle.addEventListener('click', function () {
        collapse_body.classList.toggle('d-block');
    });

    document.addEventListener('click', function (event) {
        if (!collapse_toggle.contains(event.target) && !collapse_body.contains(event.target)) {
            collapse_body.classList.remove('d-block');
        }
    });
};



//COOKIE
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

// SWITCHER
if (getCookie("theme") === "white") {
    document.body.classList.add("white");
    document.querySelector(".switch input[type=checkbox]").checked = true;
  } else {
    document.body.classList.remove("white");
    document.querySelector(".switch input[type=checkbox]").checked = false;
  }
  
  document.querySelector(".switch input[type=checkbox]").addEventListener("change", function() {
    if (this.checked) {
      document.body.classList.add("white");
      document.body.classList.remove("dark");
      setCookie("theme", "white", 365);
    } else {
      document.body.classList.remove("white");
      document.body.classList.add("dark");
      removeCookie("theme");
      setCookie("theme", "dark", 365);
    }
});


// TIMER
function addZero(val) {
    if (val < 10) {
        return `0${val}`
    } else return val
}

(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        targetDay = "01",
        targetMonth = "09",
        dayMonth = targetMonth + "/" + targetDay + "/",
        birthday = dayMonth + yyyy;

    today = mm + "/" + dd + 1 + "/" + yyyy;
    if (today > birthday) {
        birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = addZero(Math.floor(distance / (day))),
                document.getElementById("hours").innerText = addZero(Math.floor((distance % (day)) / (hour))),
                document.getElementById("minutes").innerText = addZero(Math.floor((distance % (hour)) / (minute))),
                document.getElementById("seconds").innerText = addZero(Math.floor((distance % (minute)) / second));

            //do something later when date is reached
            if (distance < 0) {
                document.getElementsByClassName("countdown").style.display = "none";
                clearInterval(x);
            }
            //seconds
        }, 0)
}());