function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

  
    if (username === "admin" && password === "guney123") {
      sessionStorage.setItem("loggedIn", "true");
      console.log(sessionStorage.getItem("loggedIn"));
      window.location.href = "dashboard.htm"; 
    } else {
      alert("Yanlış istifadəçi adı və ya şifrə.");
    }
  }
  