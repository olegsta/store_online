class Messagestoadministrator < ActiveRecord::Base

  belongs_to :user
  validates :email, :message, presence: true

end
