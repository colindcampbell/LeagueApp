class Team < ActiveRecord::Base
  has_many :home_games, class_name: "Game", foreign_key: "home_team_id", inverse_of: :home_team
	has_many :away_games, class_name: "Game", foreign_key: "away_team_id", inverse_of: :away_team
	has_many :players


	validates_presence_of :name, message:' must be present for each team'

  # on the show page we call this method with the league ID when we are listing the teams with the each loop. It sorts the list by win percentage 
  def self.sorted(league_id)
    #take the teams in the database where the league id is equal to the passed league id
    #then reverse to go from highest win percentage to lowest
    Team.where(league_id:league_id).to_a.sort!{|a,b| 
      a.win_percentage <=>
      b.win_percentage
    }.reverse
  end

  def win_percentage
    if self.wins > 0 && self.losses == 0
      self.wins
    elsif self.wins > 0
      self.wins.to_f/(self.wins+self.losses)
    elsif self.wins == 0 && self.losses > 0
      -(self.losses)
    else
      -500000
    end

  end

  has_many :league_teams
  has_many :leagues, through: :league_teams
  belongs_to :user


end
