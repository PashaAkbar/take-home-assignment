package usecase

import (
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/entity"
)

type PaymentRepository interface {
	List(status *string) ([]entity.Payment, error)
}

type PaymentUsecase struct {
	repo PaymentRepository
}

func NewPaymentUsecase(repo PaymentRepository) *PaymentUsecase {
	return &PaymentUsecase{repo: repo}
}

func (u *PaymentUsecase) List(status *string) ([]entity.Payment, error) {
	return u.repo.List(status)
}