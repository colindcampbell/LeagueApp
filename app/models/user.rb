class User < ActiveRecord::Base
	require 'bcrypt'
	has_secure_password
	before_save { self.email = email.downcase }
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :name, presence: true
  validates :phone, presence: true
	validates :password, length: {minimum: 6}, on: :create

  has_many :leagues
  has_many :teams
  has_many :players, through: :teams
  has_many :days, through: :leagues
  has_many :games, through: :days
end
