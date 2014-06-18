class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_email(params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      session[:remember_token] = @user.id
      @current_user = @user
      if @current_user.user_type == 'league_admin'
        redirect_to leagues_path
      else
        if current_user.teams.count > 0
          redirect_to current_user.teams.first
        else
          redirect_to new_team_path
        end
      end
    else
      flash[:error] = "Invalid email/password combination"
      render 'new'
    end
  end

  def destroy
    session.delete(:remember_token)
    redirect_to root_path
  end
end
