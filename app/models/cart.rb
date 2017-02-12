class Cart < ActiveRecord::Base
  
  before_destroy :order_present	
  has_many :line_items, dependent: :destroy


  def add_product(product)
    current_item = line_items.find_by(product)
	if current_item
	  current_item.quantity += 1
	else
	  current_item = line_items.build(product)
	end
	current_item 
  end
  
  def order_present	
    line_items.each do |line| 
      if line.order_id.present?
     	return false
      else 
      	return true
      end
    end
  end	

  def total_price
    line_items.to_a.sum {|item| item.total_price}
  end

end
