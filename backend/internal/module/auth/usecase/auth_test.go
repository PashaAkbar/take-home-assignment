package usecase

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/durianpay/fullstack-boilerplate/internal/entity"
	"golang.org/x/crypto/bcrypt"
)

type mockUserRepo struct {
	user *entity.User
	err  error
}

func (m *mockUserRepo) GetUserByEmail(email string) (*entity.User, error) {
	return m.user, m.err
}

func TestAuth_Login_Success(t *testing.T) {

	password := "password123"

	hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	mockUser := &entity.User{
		ID:           "1",
		Email:        "test@example.com",
		PasswordHash: string(hash),
	}

	repo := &mockUserRepo{
		user: mockUser,
		err:  nil,
	}

	auth := NewAuthUsecase(repo, []byte("secret"), time.Hour)

	token, user, err := auth.Login("test@example.com", password)

	assert.NoError(t, err)
	assert.NotEmpty(t, token)
	assert.Equal(t, "test@example.com", user.Email)
}

func TestAuth_Login_UserNotFound(t *testing.T) {

	repo := &mockUserRepo{
		user: &entity.User{},
		err:  nil,
	}

	auth := NewAuthUsecase(repo, []byte("secret"), time.Hour)

	token, user, err := auth.Login("notfound@example.com", "password")

	assert.Error(t, err)
	assert.Empty(t, token)
	assert.Nil(t, user)
}

func TestAuth_Login_InvalidPassword(t *testing.T) {

	hash, _ := bcrypt.GenerateFromPassword([]byte("correctpassword"), bcrypt.DefaultCost)

	mockUser := &entity.User{
		ID:           "1",
		Email:        "test@example.com",
		PasswordHash: string(hash),
	}

	repo := &mockUserRepo{
		user: mockUser,
		err:  nil,
	}

	auth := NewAuthUsecase(repo, []byte("secret"), time.Hour)

	token, user, err := auth.Login("test@example.com", "wrongpassword")

	assert.Error(t, err)
	assert.Empty(t, token)
	assert.Nil(t, user)
}