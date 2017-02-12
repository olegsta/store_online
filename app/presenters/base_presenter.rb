class BasePresenter
  attr_accessor :interpreter
  
  def initialize(model, view)
    @model, @view = model, view
   # super(@model)
  end

  def self.presents(name)
  	define_method(name) do 
  	  @model
  	end
  end


  def h
    @view
  end

  def markdown(text)
    Redcarpet.new(text, :hard_wrap, :filter_html, :autolink).to_html.html_safe
  end
  
  # Replace blanks by %20 to satisfy w3c-validators
  def w3c_url(url)
    url.gsub(' ', '%20')
  end
  
  #def method_missing(*args, &block)
    #@template.send(*args,&block)
  #end
  
  # Concat to output-buffer or return as string
  def concat_or_string(_concat,_txt)
    if _concat
      ""
    else
      _txt
    end
  end
 

end
