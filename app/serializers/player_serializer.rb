class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :number, :position, :height, :weight, :team_id
  has_many :stats
end
