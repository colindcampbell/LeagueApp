class Game < ActiveRecord::Base
  belongs_to :day
  belongs_to :home_team, class_name: 'Team', foreign_key: "home_team_id", inverse_of: :home_games
  belongs_to :away_team, class_name: 'Team', foreign_key: "away_team_id", inverse_of: :away_games
end
