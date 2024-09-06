function transformarEmJSON() {
    
    let materia = document.getElementById('materia').value;
    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let cpf = document.getElementById('cpf').value;

   
    if (!materia || !nome || !idade || !cpf) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

   
    if (!Number.isInteger(Number(idade)) || idade <= 0) {
        alert('A idade deve ser um número inteiro válido.');
        return;
    }

    var aluno = {
        materia: materia,
        nome: nome,
        idade: Number(idade),
        cpf: cpf
    };

    
    document.getElementById('resultadoJSON').textContent = JSON.stringify(aluno, null, 4);}