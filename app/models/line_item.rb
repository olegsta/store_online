class LineItem < ActiveRecord::Base
 
  belongs_to :product
  belongs_to :cart
  belongs_to :order
  

  def total_price
	  price=product.price
    quantity*price
  end  
  


end
