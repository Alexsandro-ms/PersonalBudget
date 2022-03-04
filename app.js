class Budget {
  constructor(
    ano,
    mes,
    dia,
    tipo,
    desc,
    valor
  ) /* < -- Recebendo Parâmetros */ {
    // Armazenando parâmetros dentro das variaveis
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.desc = desc;
    this.valor = valor;
  }
  validationData() {
    for (let desp in this) {
      if (this[desp] == undefined || this[desp] == "" || this[desp] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }
  getNextId() {
    let nextId = localStorage.getItem("id");
    return parseInt(nextId) + 1;
  }
  handleRecordingBudget(parametro) {
    let id = this.getNextId();

    localStorage.setItem(id, JSON.stringify(parametro));
    localStorage.setItem("id", id);
  }
  handleListRecover() {
    // Arrays
    let despesas = Array();

    let id = localStorage.getItem("id");

    for (let x = 1; x <= id; x++) {
      let despesa = JSON.parse(localStorage.getItem(x));

      if (despesa === null) {
        continue;
      }

      despesas.push(despesa);
    }
    return despesas;
  }

  search(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.handleListRecover();

    console.log(despesasFiltradas);

    if (despesa.ano != "") {
      despesasFiltradas = despesasFiltradas.filter((x) => x.ano == despesa.ano);
    }
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter((x) => x.mes == despesa.mes);
    }

    console.log(despesasFiltradas);
  }
}

let bd = new Bd();

function handleNewBudget() {
  // Recuperando dados
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let desc = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  // Passando parametros
  let despesa = new Budget(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    desc.value,
    valor.value
  );

  if (despesa.validationData()) {
    bd.handleRecordingBudget(despesa);

    document.getElementById("modal_title").innerHTML = "Registro inserido!";
    document.getElementById("modal_ref").className =
      "modal-header text-success";

    document.getElementById("modal_ref_button").className = "btn btn-success";
    document.getElementById("modal_body").innerHTML =
      "Despesa cadastrada com sucesso!";

    $("#modalRegister").modal("show");

    ano.value = "";
    mes.value = "";
    dia.value = "";
    tipo.value = "";
    desc.value = "";
    valor.value = "";
  } else {
    document.getElementById("modal_ref").className = "modal-header text-danger";
    document.getElementById("modal_title").innerHTML = "Erro no Cadastro!";

    document.getElementById("modal_ref_button").className = "btn btn-danger";
    document.getElementById("modal_body").innerHTML =
      "Registro de Despesa não Cadastrada!";

    $("#modalRegister").modal("show");
  }
}

function handleListBudget() {
  let despesas = Array();

  despesas = bd.handleListRecover();
  let listBudget = document.getElementById("listBudget");

  despesas.forEach(function (x) {
    console.log(x);

    let row = listBudget.insertRow();

    row.insertCell(0).innerHTML = ` ${x.dia}/${x.mes}/${x.ano} `;

    switch (x.tipo) {
      case "1":
        x.tipo = "Alimentação";
        break;
      case "2":
        x.tipo = "Educação";
        break;
      case "3":
        x.tipo = "Lazer";
        break;
      case "4":
        x.tipo = "Saúde";
        break;
      case "5":
        x.tipo = "Transporte";
        break;
    }
    row.insertCell(1).innerHTML = x.tipo;

    row.insertCell(2).innerHTML = x.desc;
    row.insertCell(3).innerHTML = x.valor;
  });
}

function handleListBudgetSearch() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let desc = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Budget(ano, mes, dia, tipo, desc, valor);

  bd.search(despesa);
}

function black() {}
