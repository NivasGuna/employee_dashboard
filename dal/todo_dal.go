package dal

import (
	"context"
	"encoding/json"

	"strconv"
	"time"

	"github.com/NivasGuna/employee_dashboard/model"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

type TodoDAL struct {
	DB           *gorm.DB
	Redis        *redis.Client
	RecentDel    *redis.Client
	RecentDelKey string
	RecentDelTTL time.Duration
}

func NewTodoDAL(db *gorm.DB, redis *redis.Client, recentDel *redis.Client, recentDelKey string, recentDelTTL time.Duration) *TodoDAL {
	return &TodoDAL{
		DB:           db,
		Redis:        redis,
		RecentDel:    recentDel,
		RecentDelKey: recentDelKey,
		RecentDelTTL: recentDelTTL,
	}
}

func (d *TodoDAL) CreateUser(user *model.Profile) error {

	if err := d.DB.Create(user).Error; err != nil {
		return err
	}

	return nil
}

func (d *TodoDAL) GetUser() (model.Profile, error) {
	var user model.Profile

	if err := d.DB.Order("id desc").First(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}

func (d *TodoDAL) RegisterUser(user *model.Registers) error {

	if err := d.DB.Create(user).Error; err != nil {
		return err
	}

	return nil
}

func (d *TodoDAL) GetRegister() ([]model.Registers, error) {
	var registers []model.Registers

	if err := d.DB.Find(&registers).Error; err != nil {
		return nil, err
	}

	return registers, nil
}

func (d *TodoDAL) CreateTodo(todo *model.Todo) error {
	todo.CreatedAt = time.Now()
	todo.UpdatedAt = time.Now()

	if err := d.DB.Create(todo).Error; err != nil {
		return err
	}

	// Store in Redis cache
	key := "todo:" + strconv.Itoa(int(todo.ID))
	todoJSON, _ := json.Marshal(todo)
	d.Redis.Set(context.TODO(), key, todoJSON, 0)

	return nil
}

func (d *TodoDAL) GetTodoByID(id int) (*model.Todo, error) {
	val, err := d.Redis.Get(context.TODO(), "todo:"+strconv.Itoa(id)).Result()
	if err == nil {
		var todo model.Todo
		if err := json.Unmarshal([]byte(val), &todo); err == nil {
			return &todo, nil
		}
	}

	var todo model.Todo
	if err := d.DB.First(&todo, id).Error; err != nil {
		return nil, err
	}

	key := "todo:" + strconv.Itoa(id)
	todoJSON, _ := json.Marshal(todo)
	d.Redis.Set(context.TODO(), key, todoJSON, 0)

	return &todo, nil
}

func (d *TodoDAL) GetTodos() ([]model.Todo, error) {
	var todos []model.Todo

	vals, err := d.Redis.Keys(context.TODO(), "todo:*").Result()
	if err == nil && len(vals) > 0 {
		vals, err := d.Redis.MGet(context.TODO(), vals...).Result()
		if err == nil {
			for _, val := range vals {
				var todo model.Todo
				if err := json.Unmarshal([]byte(val.(string)), &todo); err == nil {
					todos = append(todos, todo)
				}
			}

			return todos, nil

		}
	}

	if err := d.DB.Find(&todos).Error; err != nil {
		return nil, err
	}
	for _, todo := range todos {
		key := "todo:" + strconv.Itoa(int(todo.ID))
		todoJSON, _ := json.Marshal(todo)
		d.Redis.Set(context.TODO(), key, todoJSON, 0)
	}

	return todos, nil
}

func (d *TodoDAL) UpdateTodoByID(id int, updatedTodo *model.Todo) error {
	if err := d.DB.First(&model.Todo{}, id).Error; err != nil {
		return err
	}

	updatedTodo.ID = uint(id)
	updatedTodo.UpdatedAt = time.Now()
	if err := d.DB.Save(updatedTodo).Error; err != nil {
		return err
	}
	todoJSON, _ := json.Marshal(updatedTodo)
	d.Redis.Set(context.TODO(), "todo:"+strconv.Itoa(id), todoJSON, 0)

	return nil
}

func (d *TodoDAL) DeleteTodoByID(id int) error {
	var todo model.Todo

	if err := d.DB.First(&todo, id).Error; err != nil {
		return err
	}
	recentDelKey := "recent_del:" + strconv.Itoa(int(time.Now().Unix()))
	todoJSON, _ := json.Marshal(todo)

	d.RecentDel.LPush(context.TODO(), recentDelKey, todoJSON)
	d.RecentDel.Expire(context.TODO(), recentDelKey, d.RecentDelTTL)

	if err := d.DB.Delete(&todo, id).Error; err != nil {
		return err
	}

	key := "todo:" + strconv.Itoa(id)
	d.Redis.Del(context.TODO(), key)

	return nil
}

func (d *TodoDAL) GetRecentDeletedTodos() ([]model.Todo, error) {
	var todos []model.Todo

	keys, err := d.RecentDel.Keys(context.TODO(), "recent_del:*").Result()
	if err != nil {
		return nil, err
	}

	for _, key := range keys {

		vals, err := d.RecentDel.LRange(context.TODO(), key, 0, -1).Result()
		if err == nil {
			for _, val := range vals {
				var todo model.Todo
				if err := json.Unmarshal([]byte(val), &todo); err == nil {
					todos = append(todos, todo)
				}
			}
		}
	}

	return todos, nil

}

func (d *TodoDAL) ClearTodos() error {
	if err := d.DB.Exec("DELETE FROM todos").Error; err != nil {
		return err
	}

	return nil
}

func (d *TodoDAL) ClearCache() error {
	todoKeys, err := d.Redis.Keys(context.TODO(), "todo:*").Result()
	if err != nil {
		return err
	}

	if len(todoKeys) > 0 {
		if err := d.Redis.Del(context.TODO(), todoKeys...).Err(); err != nil {
			return err
		}
	}

	recentDelKeys, err := d.RecentDel.Keys(context.TODO(), "recent_del:*").Result()
	if err != nil {
		return err
	}

	if len(recentDelKeys) > 0 {
		if err := d.RecentDel.Del(context.TODO(), recentDelKeys...).Err(); err != nil {
			return err
		}
	}

	return nil
}
