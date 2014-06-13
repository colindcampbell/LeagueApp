class Game < ActiveRecord::Base
	has_many :stats
  belongs_to :day
  belongs_to :location
  belongs_to :home_team, class_name: 'Team', foreign_key: "home_team_id", inverse_of: :home_games
  belongs_to :away_team, class_name: 'Team', foreign_key: "away_team_id", inverse_of: :away_games

  def outcome
    if self.final
    	h = home_team
    	a = away_team
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

  def test
 		if home_score < away_score
	  	home_team.losses +=1
	  	home_team.save
	  	return home_team.losses
	  end
  end

end
