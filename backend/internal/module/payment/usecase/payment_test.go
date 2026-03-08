package usecase

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/entity"
)

type mockRepo struct{}

func (m *mockRepo) List(status *string) ([]entity.Payment, error) {
	return []entity.Payment{
		{
			ID:       "1",
			Merchant: "Merchant A",
			Status:   "completed",
			Amount:   "10000",
		},
	}, nil
}

func TestPaymentUsecase_List(t *testing.T) {

	status := "completed"

	repo := &mockRepo{}

	uc := NewPaymentUsecase(repo)

	result, err := uc.List(&status)

	assert.NoError(t, err)
	assert.Len(t, result, 1)
	assert.Equal(t, "Merchant A", result[0].Merchant)

}