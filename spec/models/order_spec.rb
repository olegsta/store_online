require 'rails_helper'

describe Order do
	it { is_expected.to validate_presence_of(:name) }
	it { is_expected.to validate_presence_of(:address) }
	it { is_expected.to validate_presence_of(:email) }
end