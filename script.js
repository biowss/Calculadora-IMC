var genero, idade, altura, peso, atividadeFisica;
var isAllValid

function validateField(value, field) {
  var isValid = false;

  if (field === 0 || field === 4) {   
    if (value !== undefined) {
      isValid = true;    
    }
  }
  else{
    if ((value !== undefined && value !== "") && isNaN(value) !== true) {
      isValid = true;
    }
  }

  
  if(isValid){
    document.querySelectorAll('.error')[field].innerHTML = '';
    return true;
  
  }
  else {
    document.querySelectorAll('.error')[field].innerHTML = '<span>*preenchimento obrigatório/inválido!</span>';
    return false;
  }  
}


function setGender (props) {
  if (genero !== undefined) { // Seta o botão selecionado anteriormente para a classe padrão, caso clique em outro botão
    document.getElementById('gender-group').querySelector('[value="'+genero+'"]').className = 'button button-normal';
  }

  genero = props.value;
  
  document.getElementById('gender-group').querySelector('[value="'+genero+'"]').className = 'button button-normal button-clicked';
  
  validateField(genero, 0);
}

function setNumber(props) {
  if (props !== undefined) {
    var id = props.id;
    var formatValue = props.value.replaceAll(',', '.');
    
    switch (id) {
      case 'ageInput':
        idade = formatValue;
        validateField(idade, 1);
        break;
      case 'heightInput':
        altura = formatValue;
        validateField(altura, 2);      
        break;
      case 'weightInput':
        peso = formatValue;
        validateField(peso, 3);      
        break;
    }
    
  }
}


function setPhysical(props) {
  if (atividadeFisica != undefined){ // Seta o botão selecionado anteriormente para a classe padrão, caso clique em outro botão
    document.getElementById('physical-group').querySelector('[value="'+atividadeFisica+'"]').className = 'button button-small';
  }

  atividadeFisica = props.value;

  document.getElementById('physical-group').querySelector('[value="'+atividadeFisica+'"]').className = 'button button-small button-clicked';
  
  validateField(atividadeFisica, 4);
}


function calculate() {
  var genreValid = validateField(genero, 0);
  var ageValid = validateField(idade, 1);
  var heightValid = validateField(altura, 2);
  var weightValid = validateField(peso, 3);
  var physicalValid = validateField(atividadeFisica, 4);
  

  if ( genreValid && ageValid && heightValid && weightValid && physicalValid) {
    var imc = peso / (altura * altura);
    var resultRow = document.getElementById('result-section').querySelectorAll('table tbody tr');

    for (var aux = 0; aux < resultRow.length; aux++){ // Reseta as cores na nova consulta.
      resultRow[aux].className = '';
    }

    if(imc < 18.5) {
      resultRow[1].className = 'result-highlight-bad';
    }
    else if (imc <= 24.9) {
      resultRow[2].className = 'result-highlight-good';
    }
    else if (imc <= 30) {
      resultRow[3].className = 'result-highlight-bad';
    }
    else if (imc <= 34.9) {
      resultRow[4].className = 'result-highlight-bad';
    }
    else if (imc <= 39.9) {
      resultRow[5].className = 'result-highlight-bad';
    }
    else {
      resultRow[6].className = 'result-highlight-bad';
    }
    

    document.getElementById('result-section').className = 'section';
    document.getElementById('result-imc').innerHTML = 'O resultado do IMC calculado foi de '+ imc.toFixed(1) +' '

  }
  
}
