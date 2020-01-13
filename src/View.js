import Controller from "./Controller";

class View {
    constructor() {
        this._root = document.getElementById('root');
        this._controller = new Controller();

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

    listCreator = (text) => {
        const button = document.createElement('button');

        this.clickDelete(id);
        const task = document.createElement('div');
        
        task.id = 'task' + id;
        task.innerText = text;
        task.append(button);
        this.listWrapper.append(task);
    }

    deleteTask = (id) => {
        const task = document.getElementById(id);
        task.remove();
    }

    clickDelete = (id) => {
        const taskButton = document.getElementById(id);

        taskButton.onclick = () => {
            this._controller.dispatch({
                type: 'DELETE_TODO',

            })
        
        }
    }

    addTask = () => {
        this.add.onclick = () => {
            this._controller.dispatch({
                type: 'ADD_TODO',
                payload: this.input.value
            });

            this.input.value = '';
        }
    }
}

export default View;