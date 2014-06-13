class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user, only: :show
  respond_to :html, :json

  # GET /users/1
  def show
    respond_with current_user
  end

  # GET /users/new
  def new
    if current_user && current_user.user_type == 'league_admin'
      redirect_to leagues_path
    elsif current_user && current_user.user_type == 'team_owner'
      redirect_to teams_path
    end

    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      session[:remember_token] = @user.id
      if @user.user_type == "league_admin"
        redirect_to leagues_path, notice: 'User was successfully created.'
      else
        redirect_to teams_path, notice: 'User was successfully created.'
      end
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      redirect_to @user, notice: 'User was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    redirect_to users_url, notice: 'User was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :phone, :user_type, :password, :password_confirmation)
    end
end


