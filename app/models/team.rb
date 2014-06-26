class Team < ActiveRecord::Base
  has_many :home_games, class_name: "Game", foreign_key: "home_team_id", inverse_of: :home_team
	has_many :away_games, class_name: "Game", foreign_key: "away_team_id", inverse_of: :away_team
	has_many :players


	validates_presence_of :name, message:' must be present for each team'

  has_many :league_teams
  has_many :leagues, through: :league_teams
  belongs_to :user
  before_destroy :destroy_children

  def destroy_children
    Player.where(team_id: self.id).destroy_all
    LeagueTeam.where(team_id: self.id).destroy_all
  end


end
