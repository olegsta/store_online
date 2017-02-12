require 'current_user'

class AdminConstraint
   def self.has_auth_cookie?(env)
    Cinema.current_user_provider.new(env).has_auth_cookie?
  end

  def self.lookup_from_env(env)
    Cinema.current_user_provider.new(env).current_user
  end


  # can be used to pretend current user does no exist, for CSRF attacks
  def clear_current_user
    @current_user_provider = Cinema.current_user_provider.new({})
  end

  def log_on_user(user)
    current_user_provider.log_on_user(user,session,cookies)
  end

  def log_off_user
    current_user_provider.log_off_user(session,cookies)
  end

  def is_api?
    current_user_provider.is_api?
  end

  def current_user
    current_user_provider.current_user
  end



  def self.current_user_provider
    @current_user_provider ||= Cinema.current_user.new(request.env)
  end

  def matches?(request)
    provider = Cinema.current_user_provider.new(request.env)
    provider.current_user && provider.current_user_provider.role=="admin"
  end

end