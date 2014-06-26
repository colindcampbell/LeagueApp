class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: [:index, :new, :edit, :create, :update, :delete]
  respond_to :html, :json

  # GET /games
  def index
    @games = Game.all
    respond_with @games
  end

  # GET /games/1
  def show
    respond_with @game
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.save
      redirect_to @game, notice: 'Game was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /games/1
  def update
    @league = @game.league
    if @game.update(game_params)
      @game.outcome(@league.id)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render nothing: true, status: :no_content }
      end
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Game was successfully destroyed.'}
      format.json { render json: { head: :ok } }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def game_params
      params.require(:game).permit(:day_id, :home_team_id, :home_score, :away_team_id, :away_score, :time, :final, :half, :recorded, :location, :date, :league_id)
    end
end
