class MessagestoadministratorsController < ApplicationController
  
  include ControllerRails
  before_action :only_admin_or_moderator, except: [:new, :create]
  respond_to :html, :js, :json

  def set_model
    @model=Messagestoadministrator
  end 
    
  def redirect_update
    root_path
  end 
  
  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:messagestoadministrator).permit(:name, :user_id, :telephone, :email, :message)
    end

end
