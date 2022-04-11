import { Context } from "koa";
import { todoData } from "../constants/data";
import { ITodo } from "../constants/Todo";

const queryTodo = (ctx: Context) => {
   try {
      const { query = '' } = ctx.request.query;
      const title: string = Array.isArray(query) ? query[0] : query;
      const filteredData = todoData.filter((e: ITodo) => e.title.includes(title));
      ctx.status = 200; //success
      ctx.body = { data: filteredData };
   } catch (error) {
      ctx.status = ctx.status || 500; // unhandled exception
      ctx.body = { error };
   }
}

export default queryTodo;