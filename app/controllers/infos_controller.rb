class InfosController < ApplicationController

  include ControllerRails
  before_action :authenticate_user!, :except => [:show, :index]
  before_action :define_eccept, only: [:edit, :update, :destroy]
  before_action :only_admin_or_moderator, only: [:index]
  # GET /infos
  # GET /infos.json
  def set_model
    @model=Info
  end 

  def index
    redirect_to "/admin/admins"
  end

  def show_from_navbar
    @info =@model.find_by(user_id: params[:user_id])
    @user=User.find(params[:user_id])
    render "infos/show"
  end

  def show
    expires_in 5.minutes
    sleep 15
    @user=@info.user
  end

  private

      # Use callbacks to share common setup or constraints between actions.  
    def define_eccept
      if current_user.info.id==@resource.id || can_manage_has_one(current_user.info, @resource, @model)
        return true
      else
        redirect_to root_path 
      end
    end

      # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:info).permit(:send_new_film, :send_comments_to_film, :ban, :data, :name, :city, :user_id, :bio, :telephone, :photo)
    end

end
