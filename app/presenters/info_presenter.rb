class InfoPresenter < BasePresenter

  presents :info
 

  def avatar
  	if info.photo.present?  
  	   h.image_tag(info.photo.url(:small)) 
  	 else 
  	   h.image_tag("default.jpeg", height: 150) 
  	end 
  end

  def name 
    if info.name.present?
       info.name
   else
      "None given"
    end
    end
 def username 
    if info.name.present?
       info.name
   else
      "Ms Misery"
    end
    end


def website
     if info.data.present?
    info.data
      else
        "None given" 
      end
 end

      def city
       if info.city.present?
       info.city
      else
    "None given"
      end 
end

def telephone
 if info.telephone.present?
      info.telephone 
     else 
    "None given"
      end 
end



def bio
if info.bio.present?
    info.bio
      else 
       "None given" 
      end


end
end