module ControllerRails
  extend ActiveSupport::Concern

  included do
    before_action :set_model
    before_action :set_resource, only: [:show, :edit, :update, :destroy]

    def index
      @resources = @model.all
       respond_to do |format|
        format.html
        format.json {render json: @resources}
      end
    end

    # GET /messages/1
    # GET /messages/1.json
    def show
    end

    # GET /messages/new
    def new
      @resource = @model.new
    end

    # GET /messages/1/edit
    def edit
    end

    # POST /messages
    # POST /messages.json
    def create
      @resource = @model.new(resource_params)
      if current_user.present?
        @resource.user_id=current_user.id
      end   
      respond_to do |format|
        if @resource.save
          format.html { redirect_to @resource, notice: 'Message was successfully created.' }
          format.json { render :show, status: :created, location: @resource }
        else
          format.html { render :new }
          format.json { render json: @resource.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /messages/1
    # PATCH/PUT /messages/1.json
    def update
      respond_to do |format|
        if @resource.update(resource_params)
          format.html { redirect_to redirect_update, notice: 'Message was successfully updated.' }
          format.json { render :show, status: :ok, location: @resource }
        else
          format.html { render :edit }
          format.json { render json: @resource.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /messages/1
    # DELETE /messages/1.json
    def destroy
      @resource.destroy
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'Message was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
      
      def set_resource
        begin
          @resource = @model.find(params[:id])
        rescue
          raise Page::NotFound 
        end      
      end
      
      def redirect_update
        @model
      end

      def pluck_fields
        @model.pluck_fields
      end
      
      def redirect_options
        root_path
      end
        
      def check_auth
        unless current_user
          render json: {msg: "Вы не авторизованы"}, status: 403
        end
      end

      def serializer
        serializer = "#{@model.model_name}Serializer"
      end
  end
end