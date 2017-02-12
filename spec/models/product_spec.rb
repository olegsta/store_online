require 'rails_helper'



describe Product do
	it "is valid with a name, title and description" do
		product = create(:product)
	  expect(product).to be_valid
	end
end



