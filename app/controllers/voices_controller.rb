class VoicesController < ApplicationController

  before_action :only_signed_user
  respond_to :html, :js, :json
  
  def increase
    @resourse_number=params[:increase_id]
    Voice.change_voice(params[:param2],params[:param1],params[:increase_id],current_user.id,current_user.role)
    @controller=params[:param1]
    respond_to do |format|
      format.html
      format.js
    end
  end

  def decrease
    @resourse_number=params[:decrease_id]
    Voice.change_voice(params[:param2], params[:param1],params[:decrease_id],current_user.id,current_user.role)
    respond_to do |format|
      format.html 
      format.js
    end
  end
  
  def only_signed_user
    if user_signed_in?
      true
    else
      " You should registered"
    end
  end
  
  private
     
  def voice_params
    params.require(:voice).permit(:vote_flag, :votable_type, :sum_voices, :votable_id, :voter_id, :voter_type)
  end

end
