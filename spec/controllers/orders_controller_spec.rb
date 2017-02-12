require 'rails_helper'

RSpec.describe OrdersController, type: :controller do
 
  render_views
  login_user
  

  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end

  
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates the order' do
        post :create, order: attributes_for(:order)
        expect(Order.count).to eq(1)
      end

      it 'redirects to the "show" action for the new order' do
        post :create, order: attributes_for(:order)
        expect(response).to redirect_to Order.first
      end
    end

    #context 'with invalid attributes' do
      #it 'does not create the order' do
        #post :create, order: attributes_for(:order, email: nil)
        #expect(Order.count).to eq(0)
      #end

      #it 're-renders the "new" view' do
        #post :create, order: attributes_for(:order, email: nil)
        #expect(response).to render_template :new
      #end
    #end
  end


  context 'json' do
    context 'with valid attributes' do
      it 'creates the vehicle' do
        post :create, order: attributes_for(:order), format: :json
        expect(Order.count).to eq(1)
      end

      it 'responds with 201' do
        post :create, order: attributes_for(:order), format: :json
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid attributes' do
      it 'does not create the vehicle' do
        post :create, order: attributes_for(:order, email: nil), format: :json
        expect(Order.count).to eq(0)
      end

      it 'responds with 422' do
        post :create, order: attributes_for(:order, email: nil), format: :json
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'Ed product' do 

    
    #let(:product) {create(:product)}
    #product = create(:product)
    before(:each) do
      @product = FactoryGirl.create(:order)
   
    end
    
    #it "finds a specific product" do
      #patch :update, id: @product.id, product: FactoryGirl.attributes_for(:product)
      #expect(assigns(:product)).to eq(@product.id)
    #end
   
  end
end
