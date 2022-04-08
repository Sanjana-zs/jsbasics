import http from 'http';
import dotenv from 'dotenv';
import { reqMethod } from './params/util';
import { collectDataChuncks } from './modules/collectDataChuncks';
import { addTodo } from './modules/methods/addTodo';
import { getTodoWithId } from './modules/methods/getTodoWithId';
import { updateTodo } from './modules/methods/updateTodo';
import { deleteTodo } from './modules/methods/deleteTodo';
import { queryTodo } from './modules/methods/queryTodo';
dotenv.config();

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    const reqUrl: string | undefined = req.url;

    if (reqUrl?.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod.GET) {
        // fetching todo w.r.t id
        getTodoWithId(req, res);
    } else if (reqUrl?.match(/\/[todo]+/g) && req.method == reqMethod.POST) {
        // add todos to file
        collectDataChuncks(req, res, addTodo);
    } else if (reqUrl?.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod.PUT) {
        // update Todos
        collectDataChuncks(req, res, updateTodo);
    } else if (reqUrl?.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod.DELETE) {
        // delete Todo
        deleteTodo(req, res);
    }
    else if (reqUrl?.match(/\/[todo]+/) && req.method == reqMethod.GET) {
        // queries on Todo
        queryTodo(req, res);
    } else {
        // wrong page
        res.statusCode = 404; //not found;
        res.end("Page not found");
    }

}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
})