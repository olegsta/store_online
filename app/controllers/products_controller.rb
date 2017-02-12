#require "receipts/version"
#require "receipts/receipt"

class ProductsController < ApplicationController
  
  include ControllerRails
  include CurrentCart

  before_action :set_cart
  before_action :authenticate_user!, :except => [:show, :index]
  before_action :ban_path, only: [:show]

  respond_to :html, :js, :json
  

    def set_model
      @model=Product
    end 
    
    def redirect_options
      {
        create: {
          redirect_to_url: products_path
        },
        update: {
          redirect_to_url: products_path
        }
      }
    end 


  # GET /products/1
  # GET /products/1.json
  def show
    @user=User.find(@resource.user_id)
    @info=@user.info
     respond_to do |format|
      format.html
      format.pdf {send_data @resource.receipt.render, filename: "#{@resource.title}-receipt.pdf", type: "application/pdf", disposition: :attachment}
      format.js
    end
  end
  
  # GET /products/new
  def new
    @resource = Product.new
    respond_modal_with @resource
  end

  # GET /products/1/edit
  def edit
    respond_modal_with @resource
  end

  # POST /products
  # POST /products.json
  def create
    @resource = current_user.products.build(resource_params)
    @resource.update_attributes(title: save_title(@resource.title))
    respond_to do |format|
      if @resource.save
        format.html { redirect_to @resource, notice: 'Product was successfully created.' }
        format.json { render :index, status: :created, location: @resource }
      else
        format.html { render :new }
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def order
    @par=params[:kind]
    @products = Product.where(category: @par.to_s.capitalize).paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @resource= @products.first
    render "store/index"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      begin
        @resource = Product.find(params[:id])
      rescue
        raise Cinema::NotFound 
      end
    end
   
    def scoped_products
      if current_role?(:author)
        Blog.for_role(current_role)
      else
        Blog.published.for_role(current_role)
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:product).permit(:user_id, :category, :title, :full_description,:description, :uploaded_file, :price)
    end
end
