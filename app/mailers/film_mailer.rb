class FilmMailer < ApplicationMailer
 
  def clients_wants_films?
    a=Info.where(send_new_film: true)
    a.map { |user_id| user_id.user.email }
  end

  def new_film(film)
  	@film=film
  	info=Info.where(send_new_film: true)
    if info.present?
      mail(to: a.map { |infor| infor.user.email })
    end 
  end 


end
