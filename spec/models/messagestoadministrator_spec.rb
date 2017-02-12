require 'rails_helper'

describe Messagestoadministrator do
	it { is_expected.to validate_presence_of(:message) }
  it { is_expected.to validate_presence_of(:email) }
  it 'has a valid factory' do
    expect(build(:messagestoadministrator)).to be_valid
  end
end
