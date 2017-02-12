module  ValidationsForTorent
  extend ActiveSupport::Concern


  included do

    has_attached_file :down_file
    validates  :down_file, :attachment_presence => true

    do_not_validate_attachment_file_type :down_file
    validates_attachment_size  :down_file, :less_than => 10.megabytes   
    
  end
end