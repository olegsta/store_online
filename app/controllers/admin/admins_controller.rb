module Admin
  class AdminsController < Admin::BaseController
   
  
    before_action :authenticate_user!
    before_action :only_admin_or_moderator
  
    def index 
      @infos = Info.all
      @user=User.all
    end

  end

end