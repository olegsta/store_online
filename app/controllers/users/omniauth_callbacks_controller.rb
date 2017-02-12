class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def digitalocean
        @user = User.from_omniauth(request.env["omniauth.auth"])
        sign_in_and_redirect @user
    end

    def google_oauth2
        @user = User.from_omniauth(request.env["omniauth.auth"])
        sign_in_and_redirect @user
    end
  
end