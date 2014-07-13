class GameSerializer < ActiveModel::Serializer
  attributes :id, :day_id, :home_team_id, :away_team_id, :home_score, :away_score, :final, :recorded, :time, :location, :date, :league_id, :home_league_team_id, :away_league_team_id
  has_many :stats
end
