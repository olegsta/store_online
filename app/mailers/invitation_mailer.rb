class InvitationMailer < ApplicationMailer

  def new_invitation(user)
     @user=user
  	 mail(to: @user.email, subject: "User: was invited to our site!!!!")
  end 


end
