let dados = []
//################ apagar ################
function ApagarRegistro(id) {
  let _confirm = confirm("Tem certeza que deseja deletar esta tarefa?")

  if(_confirm) {
    for(let i = 0; i < dados.length; i++) {
      if(dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }
    PopularTabela()
  }
}

//################ editar ################
function EditarRegistro(id) {
  $("#modalRegistro").modal("show")

  dados.forEach(function(item){
    if(item.ID == id){
      $("#modalEditar").val(item.ID)
      $("#titulo").val(item.Titulo)
      $("#data").val(item.Data.substr(6, 4) + "-" + item.Data.substr(3, 2) + "-" + item.Data.substr(0, 2))
      $("#status").val(item.Status)
    }
  })
}

function PopularTabela(){
  if (Array.isArray(dados)){//retorna verdadeiro ou falso

    // localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tableDados tbody").html("")

    dados.forEach(function(item){
      $("#tableDados tbody").append(`
        <tr>
          <td style="color: #fff">${item.ID}</td>
          <td style="color: #fff">${item.Titulo}</td>
          <td style="color: #fff">${item.Data}</td>
          <td style="color: #fff">${item.Status}</td>
          <td style="color: #fff"><button type="button" class="btn btn-primary" onclick="EditarRegistro(${item.ID});"><i class="fa fa-edit" aria-hidden="true"></i></button></td>
          <td><button type="button" class="btn btn-danger" onclick="ApagarRegistro(${item.ID});"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
        </tr>  
      `)
    })
  }
}

$(function() {
  //executa no load da tela
  dados = JSON.parse(localStorage.getItem("__dados__"))
  if (dados == null){ dados = [] }
  console.log(dados)

  if(dados){
    PopularTabela()
  }

  $("#salvar").click(function(){
    //evento...

    let _id = $("#modalEditar").val()
    let Titulo = $("#titulo").val()
    let Data = new Date($("#data").val()).toLocaleDateString("pt-br", {timeZone: "UTC"}) //conversão hora local
    let Status = $("#status").val()

    if(!_id ||_id == "0"){
      let registro = {}

      registro.Titulo = Titulo
      registro.Data = Data
      registro.Status = Status

      registro.ID = dados.length + 1
      dados.push(registro)
    }
    else{
      dados.forEach(function(item){
        if(item.ID == _id){
          item.Titulo = Titulo
          item.Data = Data
          item.Status = Status
        }
      })
    }
    localStorage.setItem("__dados__", JSON.stringify(dados))


    alert("Sua tarefa foi salva com sucesso!")
    $("#modalRegistro").modal("hide")
    //################ limpar campos ################
    $("#modalEditar").val("0")
    $("#titulo").val("")
    $("#data").val("")
    $("#status").val("")

    PopularTabela()

  })
})

$('#user').text("Olá, "  + localStorage.getItem('name'))