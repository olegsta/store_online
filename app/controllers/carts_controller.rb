class CartsController < ApplicationController
  
  include ControllerRails  
  before_action :set_cart, only: [ :show, :edit, :update, :destroy]
  #before_action :define_eccept, only: [:edit, :update, :destroy]
  
  respond_to :html, :js, :json
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_cart
  
  def set_model
    @model=Cart
  end 

  def show
    respond_modal_with @cart
  end

  def destroy
    @cart.destroy if @cart.id==session[:cart_id]
    session[:cart_id]=nil
    @cart.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Cart was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  
    def cart_params
      params[:cart]
    end

end
