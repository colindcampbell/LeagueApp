class Team < ActiveRecord::Base
  belongs_to :league
  has_many :home_games, class_name: "Game", foreign_key: "home_team_id", inverse_of: :home_team
	has_many :away_games, class_name: "Game", foreign_key: "away_team_id", inverse_of: :away_team
	has_many :players
end
