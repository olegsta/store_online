module ObjectModel
  module Model
  def self.included base
    base.send :include, InstanceMethods
    base.extend ClassMethods
  end
  end

  module InstanceMethods
     def receipt
    Receipts::Receipt.new(
      id: id,
      product: "GoRails",
        company: {
        name: "One Month, Inc.",
        address: "37 Great Jones\nFloor 2\nNew York City, NY 10012",
        email: "teachers@onemonth.com",
        logo: Rails.root.join("app/assets/images/olya.jpg")
      },
      line_items: [
        ["Date",           created_at.to_s],
        ["Account Billed", "#{title} (#{price})"],
        ["Product",        "GoRails"], 
      ],
    )
    end
  end

  module ClassMethods
     def search(search=all)
    
      where(["title LIKE ?","%#{search}%"])
  
      end 
  end



#set up "uploaded_file" field as attached_file (using Paperclip) 

end