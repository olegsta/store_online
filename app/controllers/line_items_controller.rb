class LineItemsController < ApplicationController
  
  include ControllerRails
  include CurrentCart
  before_action :set_cart
  respond_to :html, :json, :js
  before_action :set_line_item, only: [:decrease, :increase]
  
  def set_model
    @model=LineItem
  end 


  # GET /line_items/new
  def new
    @line_item = LineItem.new
    respond_modal_with @product
  end

  def create
    @product=Product.find(params[:product_id])
    @line_item = @cart.add_product(product_id: @product.id)
    @line_item.price=@line_item.total_price
    if @line_item.save
      respond_to do |format|
        format.html { redirect_to store_index_path, notice: 'Line item was successfully destroyed.' }
        format.json 
        format.js 
      end
    end
  end
  
  def increase
     @line_item.update_attribute(:quantity, @line_item.quantity+1)
     @line_item.price=@line_item.total_price
      if @line_item.save
      respond_to do |format|
        format.html { redirect_to store_index_path, notice: 'Line item was successfully destroyed.' }
        format.json 
        format.js 
      end
    end
  end
  
  def decrease
    @line_item.update_attribute(:quantity, @line_item.quantity-1)
    @line_item.price=@line_item.total_price
     if @line_item.save
      respond_to do |format|
        format.html { redirect_to store_index_path, notice: 'Line item was successfully destroyed.' }
        format.json 
        format.js 
      end
    end
  end  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_item
      @line_item = LineItem.find(params[:id])
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      params.require(:line_item).permit(:order_id, :price, :quantity, :product_id, :cart_id)
    end
end
