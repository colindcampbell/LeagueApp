class StatsController < ApplicationController
  before_action :set_stat, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /stats
  def index
    @stats = Stat.all
    respond_with @stats
  end

  # GET /stats/1
  def show
    respond_with @stat
  end

  # GET /stats/new
  def new
    @stat = Stat.new
  end

  # GET /stats/1/edit
  def edit
  end

  # POST /stats
  def create
    @stat = Stat.new(stat_params)

    if @stat.save
      redirect_to @stat, notice: 'Stat was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /stats/1
  def update
    if @stat.update(stat_params)
      respond_to do |format|
        format.html { redirect_to @stat }
        format.json { render nothing: true, status: :no_content }
      end
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: @stat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stats/1
  def destroy
    @stat.destroy
    respond_to do |format|
      format.html { redirect_to @stat, notice: 'Stat was successfully destroyed.'}
      format.json { render json: { head: :ok } }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stat
      @stat = Stat.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def stat_params
      params.require(:stat).permit(:player_id, :game_id, :points, :offensive_rebounds, :defensive_rebounds, :assists, :blocks, :steals, :fouls)
    end
end
