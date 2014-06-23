class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  def allPlayers
    @players = Player.all
    respond_with @players
  end

  # GET /players
  def index
    @players = Player.all.sort_by{|p| p.last_name}
    respond_with @players
  end

  # GET /players/1
  def show
  end

  # GET /players/new
  def new
    @player = Player.new
  end

  # GET /players/1/edit
  def edit
  end

  # POST /players
  def create
    @player = Player.new(player_params)
    @player.team = current_user.teams.first

    if @player.save
      redirect_to current_user.teams.first, notice: 'Player was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render nothing: true, status: :no_content }
      end
      # redirect_to root_path, notice: 'Player was successfully updated.'
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: @player.errors, status: :unprocessable_entity }
      end
      # render action: 'edit'
    end
  end

  # DELETE /players/1
  def destroy
    @player.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Player was successfully destroyed.'}
      format.json { render json: { head: :ok } }
    end
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def player_params
      params.require(:player).permit(:first_name, :last_name, :height, :weight, :position, :number)
    end
end
