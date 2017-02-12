require 'rails_helper'

describe Answerfrommoderator do
	it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:content) }
end