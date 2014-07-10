class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :home_city, :mascot, :user_id, :wins, :losses, :coach, :email, :phone
  has_many :leagues, embed: :ids
  has_many :players
  has_many :home_games, class_name: "Game", foreign_key: "home_team_id", inverse_of: :home_team
	has_many :away_games, class_name: "Game", foreign_key: "away_team_id", inverse_of: :away_team

end
