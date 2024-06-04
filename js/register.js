document.addEventListener('DOMContentLoaded', function() {
    // Manejar el formulario de registro
    const formRegister = document.querySelector('.needs-validation');
    formRegister.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
  
      const username = document.querySelector('#usser').value;
      const name = document.querySelector('#name').value;
      const password = document.querySelector('#pwd').value;
      const repeatPassword = document.querySelector('#repeat-pwd').value;
  
      console.log('Formulario de registro enviado:', { usser, name, password, repeatPassword });
  
      const isValid = formRegister.checkValidity();
      formRegister.classList.add('was-validated');
  
      if (!isValid) {
        return;
      }
  
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden.');
        console.log('Las contraseñas no coinciden.');
        return;
      }
  
      const registroExitoso = window.registrarUsuario(username, name, password);

      if (registroExitoso) {
        console.log('Registro exitoso:', { username, name, password });
        formRegister.reset();
        formRegister.classList.remove('was-validated');
        location.href="index.html";
      } else {
        console.log('El usuario ya existe.');
      }
    }, false);
  });
  