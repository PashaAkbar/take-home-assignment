package repository

import (
	"database/sql"

	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/entity"
)

type PaymentRepository struct {
	db *sql.DB
}

func NewPaymentRepository(db *sql.DB) *PaymentRepository {
	return &PaymentRepository{db: db}
}

func (r *PaymentRepository) List(status *string) ([]entity.Payment, error) {

	query := `
	SELECT id, merchant, amount, status, created_at
	FROM payments
	`

	var rows *sql.Rows
	var err error

	if status != nil {
		query += " WHERE status = ?"
		rows, err = r.db.Query(query, *status)
	} else {
		rows, err = r.db.Query(query)
	}

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var payments []entity.Payment

	for rows.Next() {
		var p entity.Payment

		err := rows.Scan(
			&p.ID,
			&p.Merchant,
			&p.Amount,
			&p.Status,
			&p.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		payments = append(payments, p)
	}

	return payments, nil
}