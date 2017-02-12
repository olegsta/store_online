module Admin

  class BaseController < ApplicationController
  layout "admin"
  before_action :only_admin_or_moderator


  def make_admin
    @info=Info.find_by_id(params[:id])
    @user=User.find(@info.user_id)
    @user.update_attributes(role: "admin", admin: "true")
    @user.save
    redirect_to "/admin/admins"
  end
  


  def ban_the_user
    @infos=Info.all
    @info=Info.find_by_id(params[:id])
      if @info.ban==false
        @info.update_attribute(:ban, true)
        @info.save
      else 
        @info.update_attribute(:ban, false)
        @info.save
      end
    redirect_to "/admin/admins"
  end 

  def delete_user
    @info=Info.find_by_id(params[:id])
    @user=User.find(@info.user_id)
    @user.destroy
    respond_to do |format|
      format.html {  redirect_to "/admin/admins", notice: 'User was successfully destroyed.' }
    end
  end

  
  private
  
  def only_admin_or_moderator
    if current_user.admin==true
      true
    else
      redirect_to root_path  
    end
  end

end

end