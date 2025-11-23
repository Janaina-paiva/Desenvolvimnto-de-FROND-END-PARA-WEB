const formImc = document.getElementById("form-imc");
const formDieta = document.getElementById("form-dieta");
const resultadoImc = document.getElementById("resultado-imc");
const listaDieta = document.getElementById("lista-dieta");

let alimentosRegistrados = [];

formImc.addEventListener("submit", function (event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultadoImc.innerHTML =
      '<p style="color: red;">Por favor, insira valores válidos para peso e altura.</p>';
    return;
  }

  const imc = peso / (altura * altura);
  const classificacao = classificarImc(imc); // Chamada para a função condicional

  resultadoImc.innerHTML = `
        <h3>Seu IMC é: ${imc.toFixed(2)}</h3>
        <p>Classificação: <strong>${classificacao}</strong></p>
    `;
});

function classificarImc(imc) {
  if (imc < 18.5) {
    return "Abaixo do peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    return "Peso normal";
  } else if (imc >= 25 && imc < 29.9) {
    return "Sobrepeso";
  } else if (imc >= 30 && imc < 34.9) {
    return "Obesidade Grau I";
  } else if (imc >= 35 && imc < 39.9) {
    return "Obesidade Grau II (Severa)";
  } else {
    return "Obesidade Grau III (Mórbida)";
  }
}

formDieta.addEventListener("submit", function (event) {
  event.preventDefault();

  const alimento = document.getElementById("alimento").value;
  const tipo = document.getElementById("tipo").value;
  const calorias = parseInt(document.getElementById("calorias").value);
  const proteinas = parseInt(document.getElementById("proteinas").value);

  // Validação
  if (
    !alimento ||
    !tipo ||
    isNaN(calorias) ||
    isNaN(proteinas) ||
    calorias < 0 ||
    proteinas < 0
  ) {
    alert("Preencha todos os campos da dieta corretamente.");
    return;
  }

  const novoAlimento = {
    alimento,
    tipo,
    calorias,
    proteinas,
  };

  alimentosRegistrados.push(novoAlimento);

  exibirDieta();

  formDieta.reset();
});

function exibirDieta() {
  listaDieta.innerHTML = ""; //

  if (alimentosRegistrados.length === 0) {
    listaDieta.innerHTML = "<p>Nenhum alimento registrado ainda.</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
        <thead>
            <tr>
                <th>Alimento</th>
                <th>Refeição</th>
                <th>Calorias (kcal)</th>
                <th>Proteínas (g)</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
  const tbody = table.querySelector("tbody");

  alimentosRegistrados.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.alimento}</td>
            <td>${item.tipo.toUpperCase()}</td>
            <td>${item.calorias}</td>
            <td>${item.proteinas}</td>
        `;
    tbody.appendChild(row);
  });

  listaDieta.appendChild(table);
}
