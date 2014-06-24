class LeaguesController < ApplicationController
  before_action :set_league, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: :index
  respond_to :html, :json


  # GET /leagues
  def index
    @leagues = current_user.leagues
    respond_with @leagues
  end

  # GET /leagues/1
  def show
    @days = @league.days
    respond_with @league
  end

  # GET /leagues/new
  def new
    @league = League.new
  end

  # GET /leagues/1/edit
  def edit
  end

  # POST /leagues
  def create
    @league = League.new(league_params)
    @league.user = current_user

    if @league.save
      @first = @league.start_date
      @last = @league.end_date
      create_days(@league, @first, @last)
      redirect_to leagues_path, notice: 'League was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /leagues/1
  def update
    if @league.update(league_params)
      redirect_to @league, notice: 'League was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /leagues/1
  def destroy
    @league.destroy
    redirect_to leagues_url, notice: 'League was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_league
      @league = League.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def league_params
      params.require(:league).permit(:name, :start_date, :end_date, :description, :user_id)
    end
end
