 //Cookie
 function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function removeCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  // Switcher
    if (getCookie("theme") === "white") {
      $('body').addClass("white");
      $('.switch input[type=checkbox]').prop('checked', true);
    } else {
      $('body').removeClass("white");
      $('.switch input[type=checkbox]').prop('checked', false);
    }
  
    $('.switch input[type=checkbox]').change(function() {
      if ($(this).is(':checked')) {
        $('body').addClass("white").removeClass("dark");
        setCookie("theme", "white", 365);
      } else {
        $('body').removeClass("white").addClass("dark");
        removeCookie("theme");
        setCookie("theme", "dark", 365);
      }
    });
 
    (function () {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

    const modal = document.querySelectorAll('.modal');
    const modal_toggle = document.querySelectorAll('.modal [data-bs-toggle="modal"]');
    const modal_toggle_all = document.querySelectorAll('[data-bs-toggle="modal"]');
    const modal_close = document.querySelectorAll('.modal [data-bs-dismiss="modal"]');
    const modal_content = document.querySelector('.modal-content');
    const body = document.body;
    
    modal.forEach(function(ell) {
      ell.addEventListener('click', function(e) {
        if (!e.target.closest('.modal-content')) {
          this.classList.add('d-none');
          this.classList.remove('show');
        }
      });
    });
    
    modal_toggle.forEach(function(ell) {
      ell.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
        modal.style.display = "none";
        const modal_wrapper = document.querySelector('.modal-backdrop');
        if (modal_wrapper) {
          modal_wrapper.classList.add('d-none');
        }
      });
    });
    
    modal_toggle_all.forEach(function(ell) {
      ell.addEventListener('click', function() {
        const modal_target = this.getAttribute('data-bs-target');
        document.querySelector(modal_target).classList.add('show');
        document.querySelector(modal_target).style.display = "block";
      });
    });
    
    modal_close.forEach(function(ell) {
      ell.addEventListener('click', function() {
        const modal_current = this.closest('.modal');
        modal_current.classList.remove('show');
        modal_current.classList.remove('d-block');
    
        if (!body.classList.contains('modal-open')) {
          body.style.overflow = "";
          body.style.paddingRight = "";
        }
      });
    });

