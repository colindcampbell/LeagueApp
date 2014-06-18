class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :user_type
  has_many :leagues
  has_many :teams
end
