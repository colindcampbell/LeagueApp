module ApplicationHelper

  def current_user
    @current_user ||= session[:remember_token] && User.find(session[:remember_token])
  end

  def authenticate_user
    if !current_user
      redirect_to new_session_path
    end
  end

  def user_logged
    if !current_user
      false
    else
    	true
    end
  end

  def create_days(league, first, last)
    if first
      Day.create(date: first, league: league)
    end
    if last
      Day.create(date: last, league: league)
    end
  end

end
