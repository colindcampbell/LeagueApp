class LeagueTeam < ActiveRecord::Base
  belongs_to :team
  belongs_to :league

  validate :unique_league_team

  def unique_league_team
  	existing_league_team = LeagueTeam.where(team_id: self.team_id, league_id: self.league_id).first
  	if existing_league_team
  		errors.add(:league, '( You have already joined this league )')
  	end
  end
end
