class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
 devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,:omniauthable, :omniauth_providers => [:digitalocean,:google_oauth2, :facebook]
  after_create :user_first
        

  has_many :products
  before_destroy { |user| user.comments.destroy_all }
  has_many :comments, dependent: :destroy
  has_one :info, dependent: :destroy

  has_many :messagestoadministrators


  after_create :create_role_and_info
   # after_create :send_notification

  ROLES = {0 => :guest, 1 => :user, 2 => :moderator, 3 => :admin}
  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
  

  def create_role_and_info
    a=Info.new
    a.update_attributes(user_id: self.id)
    unless self.role.present?
      update_attributes(role: "user")
    end    
  end 

  def role?(role_name)
    if role.present?
      role.to_sym == role_name
    else 
      role="quest"
    end
  end
  
  def self.was_inactive
    customers.where("last_active_at < ?", 2.days.ago).each do |user|
      AdminMailer.delay.inactive_notice(user)
    end
  end

  def user_first
    @user=User.where(role: "admin")
    unless @user.present?
      self.update_attributes(role: "admin", admin: true)
    end  
  end


 def self.from_omniauth(auth)
  where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    user.email = auth.info.email
    user.password = Devise.friendly_token[0,20]
  end

end
  def email_verified?
    true
  end

  def send_notification
    AdminMailer.new_user(self).delay.welcome_email
    AdminMailer.new_user_admin(self).delay.do_long_running_action(@project.id)
  end

end

