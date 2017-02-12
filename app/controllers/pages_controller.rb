class PagesController < ApplicationController
  
  def index
    
  end	

  def download
  	fileName=params[:download][:fileName]
  	send_file(Rails.root.join('public','files', fileName))
  end

  def upload
  	uploadFile=params[:upload][:file]
  	File.open(Rails.root.join('public','files', uploadFile.original_filename), 'wb') do |f|
	    f.write(uploadFile.read) 	
  	end	
  	redirect_to films_path
  end
  
  def change_locale
    l = params[:locale].to_s.strip.to_sym
    l = I18n.default_locale unless I18n.available_locales.include?(l)
    cookies.permanent[:educator_locale] = l
    redirect_to request.referer || root_url
  end

end
