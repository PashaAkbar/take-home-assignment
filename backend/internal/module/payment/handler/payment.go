package handler

import (
	"encoding/json"
	"net/http"

	"github.com/durianpay/fullstack-boilerplate/internal/module/payment/usecase"
	"github.com/durianpay/fullstack-boilerplate/internal/openapigen"
)

type PaymentHandler struct {
	usecase *usecase.PaymentUsecase
}

func NewPaymentHandler(u *usecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{usecase: u}
}

func (h *PaymentHandler) GetDashboardV1Payments(
	w http.ResponseWriter,
	r *http.Request,
	params openapigen.GetDashboardV1PaymentsParams,
) {

	payments, err := h.usecase.List(params.Status)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var result []openapigen.Payment

	for _, p := range payments {

		id := p.ID
		merchant := p.Merchant
		amount := p.Amount
		status := p.Status
		createdAt := p.CreatedAt

		result = append(result, openapigen.Payment{
			Id:        &id,
			Merchant:  &merchant,
			Amount:    &amount,
			Status:    &status,
			CreatedAt: &createdAt,
		})
	}

	resp := openapigen.PaymentListResponse{
		Payments: &result,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}