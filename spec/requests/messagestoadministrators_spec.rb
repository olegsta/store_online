require 'rails_helper'

RSpec.describe "Messagestoadministrators", type: :request do


  describe "GET /messagestoadministrators/index" do    
    it "index page" do
      get "/messagestoadministrators/new"
      #expect(page).to have_selector('h1') 
      expect(response).to render_template(:new)
    end 
  end

  it "does not render a different template" do
    get "/messagestoadministrators/:id"
    expect(response).to_not render_template(:show)
  end

end
