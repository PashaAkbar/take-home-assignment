package entity

import "time"

type Payment struct {
	ID        string
	Merchant  string
	Amount    string
	Status    string
	CreatedAt time.Time
}