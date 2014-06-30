class Game < ActiveRecord::Base
	has_many :stats
  has_many :players, through: :stats
  belongs_to :league
  belongs_to :day
  belongs_to :home_team, class_name: 'Team', foreign_key: "home_team_id", inverse_of: :home_games
  belongs_to :away_team, class_name: 'Team', foreign_key: "away_team_id", inverse_of: :away_games
  before_destroy :destroy_children

  def destroy_children
    Stat.where(game_id: self.id).destroy_all
  end

  def outcome(leagueID)
    if self.final
    	h = LeagueTeam.where(team_id: home_team.id, league_id:leagueID)[0]
    	a = LeagueTeam.where(team_id: away_team.id, league_id:leagueID)[0]
    	if home_score == away_score
    		return 'T'
    	elsif home_score > away_score
    		if !self.recorded
  	  		h.wins += 1
  	  		a.losses += 1
  	  		h.save
  	  		a.save
  	  		self.recorded=true
  	  		self.save
  	  	end
    	else
    		if !self.recorded
  	  		h.losses += 1
  	  		a.wins += 1
  	  		a.save
  	  		h.save
  	  		self.recorded=true
  	  		self.save
  	  	end
    	end
    end
  end

end
