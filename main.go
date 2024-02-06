package main

import (
	"github.com/NivasGuna/employee_dashboard/config"
	"github.com/NivasGuna/employee_dashboard/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	_ "github.com/go-redis/redis/v8"
	_ "gorm.io/gorm"
)

func main() {

	db, err := config.SetupDatabase()
	if err != nil {
		panic(err)
	}

	redisClient := config.SetupRedis()

	recentDelClient := config.SetupRecentDeletedRedis()

	router := gin.Default()
	router.Use(cors.Default())

	routes.SetupRoutes(router, db, redisClient, recentDelClient)
	router.Run(":8080")
}
