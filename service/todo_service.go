// service/todo_service.go
package service

import (
	"github.com/NivasGuna/employee_dashboard/dal"
	"github.com/NivasGuna/employee_dashboard/model"
)

type TodoService struct {
	DAL *dal.TodoDAL
}

func NewTodoService(dal *dal.TodoDAL) *TodoService {
	return &TodoService{
		DAL: dal,
	}
}

func (s *TodoService) CreateUser(user *model.Profile) error {
	return s.DAL.CreateUser(user)
}

func (s *TodoService) GetUser() (model.Profile, error) {
	return s.DAL.GetUser()
}

func (s *TodoService) RegisterUser(user *model.Registers) error {
	return s.DAL.RegisterUser(user)
}

func (s *TodoService) GetRegister() ([]model.Registers, error) {
	return s.DAL.GetRegister()
}

func (s *TodoService) CreateTodo(todo *model.Todo) error {
	return s.DAL.CreateTodo(todo)
}

func (s *TodoService) GetTodoByID(id int) (*model.Todo, error) {
	return s.DAL.GetTodoByID(id)
}

func (s *TodoService) GetTodos() ([]model.Todo, error) {
	return s.DAL.GetTodos()
}

func (s *TodoService) UpdateTodoByID(id int, updatedTodo *model.Todo) error {
	return s.DAL.UpdateTodoByID(id, updatedTodo)
}

func (s *TodoService) DeleteTodoByID(id int) error {
	return s.DAL.DeleteTodoByID(id)
}

func (s *TodoService) GetRecentDeletedTodos() ([]model.Todo, error) {
	return s.DAL.GetRecentDeletedTodos()
}

func (s *TodoService) ClearTodos() error {
	return s.DAL.ClearTodos()
}

func (s *TodoService) ClearCache() error {
	return s.DAL.ClearCache()
}
