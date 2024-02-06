package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/NivasGuna/employee_dashboard/config"
	"github.com/NivasGuna/employee_dashboard/model"
	"github.com/NivasGuna/employee_dashboard/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOauthConfig = &oauth2.Config{
		ClientID:     "277538080339-r1qbl8rhm5u3opeubv1fa22lb62mcoeo.apps.googleusercontent.com",
		ClientSecret: "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",
		RedirectURL:  "http://localhost:8080/callback",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	oauthStateString = "random"
)

type TodoController struct {
	Service *service.TodoService
}

func NewTodoController(service *service.TodoService) *TodoController {
	return &TodoController{
		Service: service,
	}
}

func (c *TodoController) Login(ctx *gin.Context) {

	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	fmt.Println(url)
	ctx.Redirect(http.StatusTemporaryRedirect, url)
}

func (c *TodoController) Callback(ctx *gin.Context) {
	state := ctx.Query("state")
	if state != oauthStateString {
		ctx.JSON(http.StatusUnauthorized, gin.H{"Invalid oauth state": "State mismatch"})
		return
	}
	code := ctx.Query("code")
	token, err := googleOauthConfig.Exchange(ctx, code)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	client := googleOauthConfig.Client(ctx, token)
	userInfo, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer userInfo.Body.Close()

	var userData map[string]interface{}

	if err := json.NewDecoder(userInfo.Body).Decode(&userData); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(userData)
	var user model.Profile

	user.Email, _ = userData["email"].(string)
	user.Name = userData["name"].(string)
	user.Profile, _ = userData["picture"].(string)

	// Insert data into the database
	if err := c.Service.CreateUser(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	redirectURL := "http://localhost:3000/dashboard"
	ctx.Redirect(http.StatusTemporaryRedirect, redirectURL)

}

func (c *TodoController) GetUserHandler(ctx *gin.Context) {

	user, err := c.Service.GetUser()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}

	fmt.Println(user)
	ctx.JSON(http.StatusOK, gin.H{"user": user})
}

func (c *TodoController) RegisterUser(ctx *gin.Context) {
	var users model.Registers

	if err := ctx.ShouldBindJSON(&users); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.RegisterUser(&users); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	ctx.JSON(http.StatusOK, users)
}

func (c *TodoController) GetRegisterUser(ctx *gin.Context) {
	registers, err := c.Service.GetRegister()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	ctx.JSON(http.StatusOK, registers)
}
func (c *TodoController) VerifyLogin(ctx *gin.Context) {
	var credentials struct {
		UserName string `json:"UserName" binding:"required"`
		Password string `json:"Password" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user model.Registers

	db, err := config.SetupDatabase()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database not initialized"})
		return
	}

	if db == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database not initialized"})
		return
	}

	if err := db.Where("user_name = ?", credentials.UserName).First(&user).Error; err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if user.Password != credentials.Password {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func (c *TodoController) CreateTodo(ctx *gin.Context) {
	var todo model.Todo
	if err := ctx.ShouldBindJSON(&todo); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.CreateTodo(&todo); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create todo"})
		return
	}
	ctx.JSON(http.StatusOK, todo)
}

func (c *TodoController) GetTodo(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid todo ID"})
		return
	}

	todo, err := c.Service.GetTodoByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	ctx.JSON(http.StatusOK, todo)
}

func (c *TodoController) GetTodos(ctx *gin.Context) {
	todos, err := c.Service.GetTodos()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch todos"})
		return
	}

	ctx.JSON(http.StatusOK, todos)
}

func (c *TodoController) UpdateTodo(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid todo ID"})
		return
	}

	var updatedTodo model.Todo
	if err := ctx.ShouldBindJSON(&updatedTodo); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.UpdateTodoByID(id, &updatedTodo); err != nil {
		fmt.Println("Error updating todo:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update todo"})
		return
	}

	ctx.JSON(http.StatusOK, updatedTodo)
}

func (c *TodoController) DeleteTodo(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid todo ID"})
		return
	}

	if err := c.Service.DeleteTodoByID(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}

func (c *TodoController) GetRecentDeletedTodos(ctx *gin.Context) {
	recentDeletedTodos, err := c.Service.GetRecentDeletedTodos()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recently deleted todos"})
		return
	}

	ctx.JSON(http.StatusOK, recentDeletedTodos)
}

func (c *TodoController) ClearData(ctx *gin.Context) {
	// Clear todos from the database
	if err := c.Service.ClearTodos(); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear todos in DB"})
		return
	}

	// Clear Redis cache
	if err := c.Service.ClearCache(); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear cache in Cache"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Data cleared successfully"})
}
