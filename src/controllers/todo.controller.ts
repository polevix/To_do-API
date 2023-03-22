import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const aLl = async (req: Request, res: Response) => {
    let lista = await Todo.findAll();

    res.status(200);
    res.json(lista);
}
export const add = async (req: Request, res: Response) => {
    if (req.body.title) {

        let newTitle = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });

        res.status(201);
        res.json({ item: newTitle });
    } else {
        res.status(400);
        res.json({ error: "Título não informado!" });
    }
}
export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if (todo) {

        if (req.body.title) {
            todo.title = req.body.title;
        }

        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }

        await todo.save();
        res.json({ item: todo });
    } else {
        res.status(404);
        res.json({ error: "Tarefa não encontrada!" });
    }
}
export const remove = async (req: Request, res: Response) => {
    let { id } = req.params;

    let titulo = await Todo.findByPk(id);

    if (titulo) {
        await titulo.destroy();
        res.json({ msg: "Tarefa removida com sucesso!" });
    }
}