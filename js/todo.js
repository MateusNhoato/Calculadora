const botao = document.getElementById('ToDo-Button');
const input = document.getElementById('ToDo');
const todos = document.getElementById('ToDos');

let todoCount = 0;

botao.addEventListener("click", function(){

    console.log(input.value);
    if (input.value)
    {
        todoCount++;
        let todo = input.value;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.id = `checkbox${todoCount}`;

        const label = document.createElement("label");
        label.classList.add("linha");
        label.innerText = todo;
        label.id = `label${todoCount}`;

        checkbox.addEventListener('change', function(){
            if (this.checked)
            alert(`Tarefa "${document.getElementById(`label${todoCount}`).innerText}" concluída!`);
            checkbox.remove();
            label.remove();
        });
        
        todos.appendChild(checkbox);
        todos.appendChild(label);
        input.value = "";
    }

   
});
