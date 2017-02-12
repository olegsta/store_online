class Answerfrommoderator < ActiveRecord::Base

  validates :name, :content, presence: true

end
