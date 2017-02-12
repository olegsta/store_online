class AnswerfrommoderatorsController < ApplicationController
  
  include ControllerRails
  #before_action :set_answerfrommoderator, only: [:show, :edit, :update, :destroy]
  before_action :only_admin_or_moderator
  # GET /answerfrommoderators
  # GET /answerfrommoderators.json
  
  def set_model
    @model=Answerfrommoderator
  end  

  private
 
    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:answerfrommoderator).permit(:user_id, :send_message, :name, :content)
    end
end
