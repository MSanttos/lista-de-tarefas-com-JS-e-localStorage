function criarConta() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  localStorage.setItem("name", name);
  localStorage.setItem("password", password);

  alert("Cadastro realizado com sucesso!");

  window.location.href = "index.html";

}
