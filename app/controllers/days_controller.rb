class DaysController < ApplicationController
  before_action :set_day, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json
  
  # GET /days
  def index
    @days = current_user.days.sort_by{|dt| dt.date}
    respond_with @days
  end

  # GET /days/1
  def show
    respond_with @day
  end

  # GET /days/new
  def new
    @day = Day.new
  end

  # GET /days/1/edit
  def edit
  end

  # POST /days
  def create
    @day = Day.new(day_params)

    if @day.save
      redirect_to root_path, notice: 'Day was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /days/1
  def update
    if @day.update(day_params)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render nothing: true, status: :no_content }
      end
    else
      respond_to do |format|
        format.html { render 'new' }
        format.json { render json: @day.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /days/1
  def destroy
    @day.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Player was successfully destroyed.'}
      format.json { render json: { head: :ok } }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_day
      @day = Day.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def day_params
      params.require(:day).permit(:date, :league_id)
    end
end
