class CommentsController < ApplicationController
  
  before_action :authenticate_user!, :except => [:new, :show, :index, :create, :new_with_info]  
  before_action :define_eccept, only: [:edit, :update, :destroy]
 
  respond_to :html, :xml, :js
  


  def index
    redirect_to @commentable
  end

  def new
    @comment=@commentable.comments.build
  end	


  def show
    @film=Film.find(params[:id])
    respond_to do |format|
      format.html { render partial: "form", locals: {commentable: @commentable}, comment: @comment }
      format.js { }
    end 
  end	
	
  def create 
    params[:comment][:from_ip] = request.env['REMOTE_ADDR']
    @comment_count=@commentable.comments.paginate(
       :page => params[:page],
       :per_page => Configurable[:blogs_per_page]
    )
     @comment=@commentable.comments.build(comment_params)
    if current_user.present? 
      @comment.user_id=current_user.id
    else
      @biz = Info.new(name: params[:name])
      @biz.save
    end
    @commentable_ajax=params[:param1]
    #@comment.info_id=Info.create.id
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @commentable }
        format.js { render js: "window.location = '#{@commentable_ajax}'" }
        format.json { render :show, status: :created, location: @comment }
      else
        format.html { redirect_to  root_path, notice: 'Info was successfully created.' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def edit
    #render partial: "form", locals: {commentable: @commentable, comment: @comment} 
    @comment=Comment.find(params[:id])
    respond_modal_with @comment
  end	
  

  def update
    comment=Comment.find(params[:id])
     @comment_count=@commentable.comments.paginate(
         :page => params[:page],
         :per_page => Configurable[:blogs_per_page]
      )
      respond_to do |format|
      if comment.update_attributes(comment_params)
          format.html { redirect_to  @commentable, notice: 'Film was successfully updated.' }
          format.json {  }
          format.js { }
      else
        render partials: 'comments/form'
      end
    end
  end

  def destroy
    @comment=Comment.find(params[:id])
    @comment_count=@commentable.comments.paginate(
       :page => params[:page],
       :per_page => Configurable[:blogs_per_page]
    )
    @commentable=params[:param1]
    @comment.destroy
    #@comment.info_id=Info.create.id
    respond_to do |format|
      if @comment.save!
        format.html { redirect_to  @commentable }
        format.js { render js: "window.location = '#{@commentable}'" }
        format.json { render :show, status: :created, location: @comment }
      else
        format.html { redirect_to  @commentable, notice: 'Info was successfully created.' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end
   
  def new_with_info
    @comment=@commentable.comments.build
    respond_to do |format|
      format.html 
      format.js { }
    end 
  end

  private
  
    def define_eccept 
      if user_signed_in?
      #-if can_manage(Film, current_user.films)

        comment=Comment.find(params[:id])
          if can_manage(current_user.comments, comment, Comment) 
            return true
          end
      end
    end

    def comment_params
      params.require(:comment).permit(:commentable_id, :commentable_type,:info_id, :from_ip, :content,:image_comment, info_attributes: [:name])
    end

end
