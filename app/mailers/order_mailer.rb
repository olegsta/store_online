class OrderMailer < ApplicationMailer
   
  def new_order(order)
    @order = order

    @order.line_items.each do |line_item|
    @product=Product.find(line_item.product_id)
      @product_title=@product.title
      @quantity=line_item.quantity
      @price=line_item.price
    end
    mail(to: ["#{order.email}", "inutero88@mail.ru"], subject: "New order: #{order.email}")
  end

end
