class Info < ActiveRecord::Base
 belongs_to :user
 
 belongs_to :comment

 @model_of_attachment='photo'.parameterize.underscore.to_sym
 @validation=false
  include ValidationsForPicture
 
end
