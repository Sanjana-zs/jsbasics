import { deleteTodo, readDataFile, writeDataFile, editTodo } from "./dataOperations";
import { reqMethod, reqApiUrl } from "./reqParams";
import url from 'url';

export async function handleGetRequest(req: any, res: any) {
    let data: any;
    const reqBody: { todos: string } = req.body;
    const parseQuery = url.parse(req.url, true);
    const pathname: string | null = parseQuery.pathname;
    const query: any = parseQuery.query;
    console.log(req.url);

    try {
        if (pathname == reqApiUrl.CREATE && req.method == reqMethod.POST) {
            data = await readDataFile();
            if (reqBody) {
                data.push(reqBody.todos);
                await writeDataFile(data);
                // set statusCode and header
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Successfully Added");
            } else {
                console.log('Request Body is undefined');
            }
        }

        else if (pathname == reqApiUrl.READ) {
            data = await readDataFile();
            if (data.length == 0) {
                res.end('No Todos');
            } else {
                // display todos on screen
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<ul>');
                data.forEach((e: string) => {
                    res.write(`<li>${e}</li>`);
                });
                res.end('</ul>');
            }
        }

        else if (pathname == reqApiUrl.UPDATE && req.method == reqMethod.PATCH) {
            data = await readDataFile();
            await editTodo(reqBody, query, data);
            res.end('Replaced Successfully');
        }

        else if (pathname == reqApiUrl.DELETE && req.method == reqMethod.DELETE) {
            data = await readDataFile();
            await deleteTodo(query, data);
            res.end('Successfully Deleted');
        }

        else {
            res.end('Page Not Found');
        }
    } catch (error) {
        console.log(error);
    }
}