module ValidationsForPicture
  extend ActiveSupport::Concern


  included do

    if @validation.nil?
      @validation  = true
    else
      @validation= false
    end  
#set up "uploaded_file" field as attached_file (using Paperclip) 
  has_attached_file  @model_of_attachment, styles: {for_posting: "340x340>", small: "300x300>", thumb: "300x300#",preview: "360x360>"}, :path => ":rails_root/public/image/:attachment/:id/:basename_:style.:extension",
#@parameter=true if @parameter.nil?



  :url => "/image/:attachment/:id/:basename_:style.:extension"
  validates_attachment  @model_of_attachment,  :content_type => { :content_type => /^image\/(jpeg|png|gif|tiff)$/ }
 validates_attachment  @model_of_attachment, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
  validates_attachment_size  @model_of_attachment, :less_than => 10.megabytes   
  validates  @model_of_attachment, :attachment_presence => @validation
  
  end
end