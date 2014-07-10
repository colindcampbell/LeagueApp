class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index, :new, :edit, :create, :update, :delete]
  respond_to :html, :json

  def allTeams
    @teams = Team.all
    respond_with @teams
  end
  
  # GET /teams
  def index
    @teams = current_user.teams
    respond_with @teams
  end

  # GET /teams/1
  def show
    respond_with @team
  end

  # GET /teams/new
  def new
    if current_user.teams.count > 0
      redirect_to current_user.teams.first
    else
      @team = Team.new
    end
  end

  # GET /teams/1/edit
  def edit
  end

  # POST /teams
  def create
    @team = Team.new(team_params)
    @team.user = current_user
    @team.coach = current_user.name
    @team.email = current_user.email
    @team.phone = current_user.phone

    if @team.save
      redirect_to current_user.teams.first, notice: 'Team was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /teams/1
  def update
    if @team.update(team_params)
      redirect_to @team, notice: 'Team was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /teams/1
  def destroy
    @team.destroy
    redirect_to teams_url, notice: 'Team was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def team_params
      params.require(:team).permit(:name, :home_city, :mascot, :wins, :losses, :coach, :email, :phone)
    end
end
