class LeagueTeamsController < ApplicationController

	def create
    @league_team = LeagueTeam.new(params.require(:league_team).permit(:team_id, :league_id))

    if @league_team.save
      redirect_to teams_path, notice: 'League was successfully created.'
    else
      render action: 'new'
    end
	end

	def index
		
	end
end
