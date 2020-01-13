import Controller from './Controller';
import View from './View';

const init = () => {
    const view = new View();
    new Controller(view);

}

init();