function acesso(form)

/*checa nome e senha - caso digite com letras maiúscula,
 será convertido para letras minúscula*/

form.name.value = form.name.value.toLowerCase();
form.senhna.value = form.senha.value.toLowerCase();

if (form.name.value == "")