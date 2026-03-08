package main

import (
	"database/sql"
	"log"
	"time"

	"github.com/durianpay/fullstack-boilerplate/internal/api"
	"github.com/durianpay/fullstack-boilerplate/internal/config"

	ah "github.com/durianpay/fullstack-boilerplate/internal/module/auth/handler"
	ar "github.com/durianpay/fullstack-boilerplate/internal/module/auth/repository"
	au "github.com/durianpay/fullstack-boilerplate/internal/module/auth/usecase"

	ph "github.com/durianpay/fullstack-boilerplate/internal/module/payment/handler"
	pr "github.com/durianpay/fullstack-boilerplate/internal/module/payment/repository"
	pu "github.com/durianpay/fullstack-boilerplate/internal/module/payment/usecase"

	srv "github.com/durianpay/fullstack-boilerplate/internal/service/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	_ = godotenv.Load()

	db, err := sql.Open("sqlite3", "dashboard.db?_foreign_keys=1")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err := initDB(db); err != nil {
		log.Fatal(err)
	}

	JwtExpiredDuration, err := time.ParseDuration(config.JwtExpired)
	if err != nil {
		panic(err)
	}

	// AUTH MODULE
	userRepo := ar.NewUserRepo(db)
	authUC := au.NewAuthUsecase(userRepo, config.JwtSecret, JwtExpiredDuration)
	authH := ah.NewAuthHandler(authUC)

	// PAYMENT MODULE
	paymentRepo := pr.NewPaymentRepository(db)
	paymentUC := pu.NewPaymentUsecase(paymentRepo)
	paymentH := ph.NewPaymentHandler(paymentUC)

	apiHandler := &api.APIHandler{
		Auth:     authH,
		Payments: paymentH,
	}

	server := srv.NewServer(apiHandler, config.OpenapiYamlLocation)

	addr := config.HttpAddress
	log.Printf("starting server on %s", addr)

	server.Start(addr)
}

func initDB(db *sql.DB) error {

	stmts := []string{

		// USERS TABLE
		`CREATE TABLE IF NOT EXISTS users (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  email TEXT NOT NULL UNIQUE,
		  password_hash TEXT NOT NULL,
		  role TEXT NOT NULL
		);`,

		// PAYMENTS TABLE
		`CREATE TABLE IF NOT EXISTS payments (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  merchant TEXT,
		  amount TEXT,
		  status TEXT,
		  created_at DATETIME
		);`,
	}

	for _, s := range stmts {
		if _, err := db.Exec(s); err != nil {
			return err
		}
	}

	// seed user
	var userCount int
	row := db.QueryRow("SELECT COUNT(1) FROM users")

	if err := row.Scan(&userCount); err != nil {
		return err
	}

	if userCount == 0 {

		hash, err := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
		if err != nil {
			return err
		}

		db.Exec("INSERT INTO users(email, password_hash, role) VALUES (?, ?, ?)", "cs@test.com", string(hash), "cs")

		db.Exec("INSERT INTO users(email, password_hash, role) VALUES (?, ?, ?)", "operation@test.com", string(hash), "operation")
	}

	// seed payments
	var paymentCount int
	row = db.QueryRow("SELECT COUNT(1) FROM payments")

	if err := row.Scan(&paymentCount); err != nil {
		return err
	}

	if paymentCount == 0 {

		db.Exec(`
		INSERT INTO payments (merchant, amount, status, created_at)
		VALUES
		('Tokopedia','100000','completed',datetime('now')),
		('Shopee','50000','processing',datetime('now')),
		('Bukalapak','20000','failed',datetime('now')),
		('Blibli','75000','completed',datetime('now'))
		`)
	}

	const dbLifetime = time.Minute * 5
	db.SetConnMaxLifetime(dbLifetime)

	return nil
}