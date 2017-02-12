class Voice < ActiveRecord::Base
  
  belongs_to :film

  scope :user_voted, ->(current_user) { where(voter_id: current_user) }
  scope :vote_type, ->(param1) { where(votable_type: param1) }
  scope :votable_id, ->(increase_id) { where(votable_id: increase_id) }
  scope :vote_flag_new, ->(increase_id) { where(vote_flag: increase_id) }


  def self.change_voice(vote_flag, param1,increase_id,current_user,role)
    if do_not_nothing(current_user, param1, increase_id, vote_flag)
      return
    elsif 
      changed_voted(current_user, param1, increase_id, vote_flag)
    elsif 
      increase_vote(param1, increase_id, vote_flag) 
    else
      create_vote(vote_flag, param1, increase_id, current_user, role)
    end
  end

  def self.do_not_nothing(current_user, param1, increase_id, vote_flag)
    Voice.user_voted(current_user).vote_type_id_flag(param1, increase_id, vote_flag).present?
  end
  
  def self.changed_voted(current_user, param1, increase_id, vote_flag)
    if Voice.user_voted(current_user).vote_type_id(param1, increase_id).present?
      voice_up=Voice.user_voted(current_user).vote_type(param1).find_by_votable_id(increase_id)
      voice_up.update_attribute(:vote_flag, vote_flag)
      voice_up.save
    end
  end
  
  def self.create_vote(vote_flag, param1, increase_id, current_user, role)
    voice=Voice.create(vote_flag: vote_flag, votable_type: param1, votable_id: increase_id, voter_id: current_user, voter_type: role)
    voice.save
  end
  
  def self.increase_vote(param1, increase_id, vote_flag) 
    Voice.vote_type_id(param1, increase_id).find_by_vote_flag(vote_flag).present?
    voice_down=Voice.vote_type_id_flag(param1, increase_id, vote_flag)
    voice_down.update_attribute(:sum_voices, a.sum_voices+1)
    voice_down.save  
  end
  
  def self.vote_type_id(param1, increase_id)
    vote_type(param1).votable_id(increase_id)
  end
  
  def self.vote_type_id_flag(param1, increase_id, vote_flag)
    vote_type_id(param1, increase_id).vote_flag_new(vote_flag)
  end  

end
