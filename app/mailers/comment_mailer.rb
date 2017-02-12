class CommentMailer < ApplicationMailer

  def car	
    find_film =Film.find_by(id: @comment.commentable_id)
    @find_user=User.find_by(id: find_film.user_id)
  	find_email=@find_user.email
    find_email
  end

	def new_comment(comment)
  	@comment=comment
  	mail(:to => car, :subject => "User #{@find_user.email} add comment") 
  end 

  def new_comment_for_admin(user)
    @user=user
  	mail(:to => car, :subject => "Registered") 
  end 

end
