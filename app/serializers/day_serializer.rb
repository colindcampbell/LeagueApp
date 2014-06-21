class DaySerializer < ActiveModel::Serializer
  attributes :id, :date, :league_id
  has_many :games
end
