class Comment < ActiveRecord::Base
	belongs_to :commentable, polymorphic: true
	belongs_to :user
  #after_create :send_comment_to_author



  belongs_to :info
  accepts_nested_attributes_for :info, allow_destroy: true
  
  @model_of_attachment='image_comment'.parameterize.underscore.to_sym
  @validation=false
   include ValidationsForPicture
  #validates             :email, :presence => true, :email => true
  #validates_presence_of :name
  #validates_length_of   :name, :minimum => 1
  validates_presence_of :content
  validates_length_of   :content, :minimum => 1

#validates_attachment_size :uploaded_file, :less_than => 10.megabytes   
#validates_attachment_presence :uploaded_file


  def send_comment_to_author
	  CommentMailer.new_comment(self).deliver
  end

  def self.build_and_validate_comment(commentable, form_params)
    comment = commentable.comments.build(form_params)
    comment.commentable_type=commentable.to_s
    if comment.valid?
      
      comment.save
    else
      errors =  comment.errors.full_messages.join("<br/>").html_safe
    end
    [comment, errors]
  end

end
