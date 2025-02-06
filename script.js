const salvarTarefas = () => {
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefas = [];
    listaTarefas.querySelectorAll('div').forEach(tarefa => {
        tarefas.push(tarefa.firstChild.nextSibling.textContent);
    });
    localStorage.setItem('Tarefas', JSON.stringify(tarefas));
}

const adicionarTarefa = () => {
    const tarefaInput = document.getElementById('novaTarefa');
    const tarefaLista = document.getElementById('listaTarefas');

    if (tarefaInput.value.trim() !== "") {
        const tarefa = document.createElement('div');
        tarefa.className = 'Tarefa';
        const tarefaTexto = document.createElement('span');
        tarefaTexto.textContent = `${tarefaInput.value}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'Delete';
        deleteButton.onclick = () => {
            tarefaLista.removeChild(tarefa);
            salvarTarefas();
        };

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'Checkbox';

        tarefa.appendChild(deleteButton);
        tarefa.appendChild(tarefaTexto);
        tarefa.appendChild(checkbox);
        tarefaLista.appendChild(tarefa);

        tarefaInput.value = '';
        salvarTarefas();
    }
}

const carregarTarefas = () => {
    const tarefas = JSON.parse(localStorage.getItem('Tarefas')) || [];
    const listaTarefas = document.getElementById('listaTarefas');
    tarefas.forEach(tarefaTexto => {
        const tarefa = document.createElement('div');
        tarefa.className = 'Tarefa';
        const tarefaSpan = document.createElement('span');
        tarefaSpan.textContent = tarefaTexto;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'Delete';
        deleteButton.onclick = () => {
            listaTarefas.removeChild(tarefa);
            salvarTarefas();
        };

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'Checkbox';

        tarefa.appendChild(deleteButton);
        tarefa.appendChild(tarefaSpan);
        tarefa.appendChild(checkbox);
        listaTarefas.appendChild(tarefa);
    });
}

document.addEventListener('DOMContentLoaded', carregarTarefas);