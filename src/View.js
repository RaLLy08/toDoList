import Controller from "./Controller";

class View {
    constructor() {
        this._root = document.getElementById('root');
        this._controller = new Controller();
        this._controller.subscribe(this.listRefresh);

        this.init();
    }

    init = () => {
        const wrapper = document.createElement('div');

        wrapper.className = 'wrapper';
        this.listWrapper = document.createElement('div');
        this.listWrapper.className = 'listWrapper';
        this.input = document.createElement('input');
        this.add = document.createElement('button');

        this.add.innerText = 'add task';

        wrapper.append(this.listWrapper);
        wrapper.append(this.input);
        wrapper.append(this.add);
        this._root.append(wrapper);

        this.addTask();
    }

    listRefresh = () => {
        this.deleteList();
        this.listCreator(this._controller.getState());
        console.log(this._controller.getState());
    }

    listCreator = (tasks) => {
        tasks.forEach(task => {
            const button = document.createElement('button');
            
            button.id = 'button' + task.id; 
            button.innerText = 'remove';
            const crossOut = document.createElement('button');


            crossOut.innerText = 'cross out';
            crossOut.id = 'crossout' + task.id;
            const taskDiv = document.createElement('div');

            const taskNum = document.createElement('p');

            taskNum.innerText ='task: ' + (task.id + 1);
            const taskText = document.createElement('p');
            taskText.innerText = task.text;
            taskText.id = 'text' + task.id;

            taskDiv.id = 'task' + task.id;
            taskDiv.append(taskNum);
            taskDiv.append(taskText);
            taskDiv.append(button);
            taskDiv.append(crossOut);
            this.listWrapper.append(taskDiv);
            this.clickDelete(task.id);
        });
        
    }

    deleteList = () => {      
        while (this.listWrapper.firstChild) {
            this.listWrapper.removeChild(this.listWrapper.firstChild);
        }
    }

    clickDelete = (id) => {
        const button = document.getElementById('button' + id);
        const crossOut = document.getElementById('crossout' + id);
        const text = document.getElementById('text' + id);

        button.onclick = () => {
            this._controller.dispatch({
                type: 'DELETE_TODO',
                id: id
            })
        }

        crossOut.onclick = () => {
            text.style.textDecoration = 'line-through'; 
        }

    }

    addTask = () => {
        this.add.onclick = () => {
            this._controller.dispatch({
                type: 'ADD_TODO',
                text: this.input.value
            });
            
            this.input.value = '';
        }
    }

}

export default View;