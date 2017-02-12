class SearchesController < ApplicationController
	
  respond_to :html, :js, :json

  def new
    @search = Search.new
    respond_modal_with @search 
  end

  def search_product
    @search_category=params[:search][:category]
    @search_title=params[:search][:title]
    @search_category=params[:search][:category]
    @search_min_price=params[:search][:min_price]
    @search_max_price=params[:search][:max_price]
    search_products
    if @products.present?
      @first_product=@products.first
      @resources=@products
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js { }
      end
    end
  end
   


  private
    
  def search_products
    @products=Product.all
    @products=@products.where(["category LIKE ?", @search_category])
    @products=@products.where(["title LIKE ?", @search_title.capitalize]) if  @search_title.present?
    @products=@products.where(["category LIKE ?", @search_category.capitalize]) if  @search_category.present?
    @products=@products.where(["price >= ?", @search_min_price]) if  @search_min_price.present?
    @products=@products.where(["price <= ?", @search_max_price]) if  @search_max_price.present?
    @products=@products.paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @products
  end
    # Use callbacks to share common setup or constraints between actions.
   
    # Never trust parameters from the scary internet, only allow the white list through.
    def search_params
      params.require(:search).permit(:title, :year, :actor, :language, :subtitle)
    end

end
