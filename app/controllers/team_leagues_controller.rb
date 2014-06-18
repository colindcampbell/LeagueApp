class TeamLeaguesController < ApplicationController
	respond_to :json
  def index
    @leagues = current_user.teams.first.leagues
    respond_with @leagues
  end
end
