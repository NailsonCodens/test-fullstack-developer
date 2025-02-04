import { InMemoryTodosRepository } from "@/repositories/in-memory/in-memory-todos-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ConcludeTodoUseCase } from "./conclude-todo";
import { nextMonthDate } from "@/utils/next-month-date";
import { TodoNotExists } from "../errors/todo-not-exists";

let todoRepository: InMemoryTodosRepository
let sut: ConcludeTodoUseCase

describe('Suite test complete task', () => {

  beforeEach(() => {
    todoRepository = new InMemoryTodosRepository()
    sut = new ConcludeTodoUseCase(todoRepository)
  })

  it('Should be able to conclude a task', async () => {
    const id = 'todo-01'
    const user_id = 'user-01'

    await todoRepository.create({
      id,
      subject: 'First Todo',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id,
      checked: 0
    })

    await sut.execute({id, user_id})

    const list = await todoRepository.list(user_id)

    expect(list).toEqual([
      expect.objectContaining({ checked: 1 }),
    ])
  })

  it('Should be able to unconclude a task', async () => {
    const id = 'todo-01'
    const user_id = 'user-01'

    await todoRepository.create({
      id,
      subject: 'First Todo',
      expected_date: nextMonthDate(0, 1, 2024),
      user_id,
      checked: 1
    })

    await sut.execute({id, user_id})

    const list = await todoRepository.list(user_id)

    expect(list).toEqual([
      expect.objectContaining({ checked: 0 }),
    ])
  })
  
  it('Should not be able to conclude if todo no exists', async () => {
    await expect(() => 
    sut.execute({id: 'non-existent-todo', user_id: 'user-01'})    
  ).rejects.toBeInstanceOf(TodoNotExists)
  })
})