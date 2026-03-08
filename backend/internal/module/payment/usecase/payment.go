package usecase

import (
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/entity"
	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/repository"
)

type PaymentUsecase struct {
	repo *repository.PaymentRepository
}

func NewPaymentUsecase(repo *repository.PaymentRepository) *PaymentUsecase {
	return &PaymentUsecase{repo: repo}
}

func (u *PaymentUsecase) List(status *string) ([]entity.Payment, error) {
	return u.repo.List(status)
}