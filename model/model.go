package model

import (
	"time"
	"gorm.io/gorm"
)

type Todo struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	Name           string    `json:"name"`
	EmpID          string      `json:"empid"`
	Role           string    `json:"role"`
	Email          string    `json:"email"`
	Experience     string    `json:"experence"`
	PrimarySkill   string    `json:"skill"`
	SecondarySkill string    `json:"secskill"`
	CompanyName    string    `json:"company"`
	ContactNO      string      `json:"phone"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type Profile struct {
	gorm.Model
	Email   string
	Name    string
	Profile string
}

type Registers struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	UserName string `json:"username"`
	Password string `json:"password"  binding:"required"`
	Cnfpss   string `json:"cnfpss"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	Gender   string `json:"gender"`
}
