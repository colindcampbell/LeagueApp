class LeagueTeamsController < ApplicationController
  before_action :set_league_team, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  def index
    @league_teams = LeagueTeam.all
    respond_with @league_teams
  end

  # GET /league_teams/1
  def show
  end

  # GET /league_teams/new
  def new
    @league_team = LeagueTeam.new
  end

  # GET /league_teams/1/edit
  def edit
  end

  # POST /league_teams
  def create
    @league_team = LeagueTeam.new(league_team_params)
    if @league_team.save
      redirect_to leagues_path, notice: 'You have joined a new league.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /league_teams/1
  def update
    if @league_team.update(league_team_params)
      redirect_to @league_team, notice: 'League team was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /league_teams/1
  def destroy
    @league_team.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Team was successfully removed.'}
      format.json { render json: { head: :ok } }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_league_team
      @league_team = LeagueTeam.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def league_team_params
      params.require(:league_team).permit(:team_id, :league_id)
    end
end

