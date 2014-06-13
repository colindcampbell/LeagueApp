require 'spec_helper'

describe Game do
	before do
		@team1 = Team.new(name:"lakers")
		@team2 = Team.new(name:"clippers")
		@game = Game.new(time:12:00:00, home_team: @team1, away_team: @team2, final:true, home_score: 65, away_score: 55)
	end





end