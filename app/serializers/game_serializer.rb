class GameSerializer < ActiveModel::Serializer
  attributes :id, :day_id, :home_team_id, :away_team_id, :home_score, :away_score, :final, :recorded, :time, :location, :date
  has_many :stats
end
