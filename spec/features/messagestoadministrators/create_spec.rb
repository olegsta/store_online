require 'rails_helper'

RSpec.feature "Messagestoadministrator", :type => :feature do
  
  def create_visitor
    @visitor ||= { :message => "Test visitor"}
  end  

  it "does not render a different template" do
    visit "/messagestoadministrators/1"
    expect(page).to have_content "show"
  end

  it "cant go admin panel" do
  	visit admin_admins_path
    expect(page).to_not have_text "Admin pannel"
  end
  
  scenario "User creates a new message" do
    visit new_messagestoadministrator_path
    #element = page.find("Message")
    #element.set(@visitor[:message])
    #fill_in "messagestoadministrator[name]", :with => "in@mail.ru", visible: false
    #fill_in "messagestoadministrator[message]", :with => "title"
    #fill_in "Message", :with => "new message", visible: false

    #click_button "Create Messagestoadministrator"

    #expect(page).to have_text("Messagestoadministrator was successfully created.")
  end

end