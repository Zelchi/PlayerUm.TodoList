const salvarTarefas = () => {
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefas = [];
    listaTarefas.querySelectorAll('div').forEach(tarefa => {
        tarefas.push(tarefa.querySelector('span').textContent);
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

        tarefaTexto.onclick = () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.style.outline = 'none';
            input.value = tarefaTexto.textContent;
            tarefa.replaceChild(input, tarefaTexto);

            input.onblur = () => {
                tarefaTexto.textContent = input.value;
                if (input.value.trim() === '') {
                    listaTarefas.removeChild(tarefa);
                }
                tarefa.replaceChild(tarefaTexto, input);
                salvarTarefas();
            };

            input.focus();
        };

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

        tarefaSpan.onclick = () => {
            const input = document.createElement('input');
            input.style.outline = 'none';
            input.type = 'text';
            input.value = tarefaSpan.textContent;
            tarefa.replaceChild(input, tarefaSpan);

            input.onblur = () => {
                tarefaSpan.textContent = input.value;
                if (input.value.trim() === '') {
                    listaTarefas.removeChild(tarefa);
                }
                tarefa.replaceChild(tarefaSpan, input);
                salvarTarefas();
            };

            input.focus();
        };

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