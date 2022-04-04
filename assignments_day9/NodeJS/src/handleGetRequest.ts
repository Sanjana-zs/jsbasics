import { deleteTodo, readDataFile, writeDataFile, editTodo } from "./dataOperations";
import { reqMethod, reqApiUrl, Todos } from "./reqParams";
import url from 'url';

const uid = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

export async function handleGetRequest(req: any, res: any) {
    let data: any;
    const parseQuery = url.parse(req.url, true);
    const pathname: string | null = parseQuery.pathname;
    const query: any = parseQuery.query;

    try {
        if (pathname == reqApiUrl.CREATE && req.method == reqMethod.POST) {
            data = await readDataFile();
            const { title, description } = req.body;
            const reqBody: Todos = {
                id: uid(),
                title,
                description
            };
            if (reqBody) {
                data.push(reqBody);
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
                data.forEach((e: Todos) => {
                    res.write(`<li id=${e.id}>`);
                    res.write(`<h1>${e.title}</h1>`);
                    res.write(`<p>${e.description}</p>`);
                    res.write(`</li>`);
                });
                res.end('</ul>');
            }
        }

        else if (pathname == reqApiUrl.UPDATE && req.method == reqMethod.PATCH) {
            data = await readDataFile();
            await editTodo(query, data);
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
