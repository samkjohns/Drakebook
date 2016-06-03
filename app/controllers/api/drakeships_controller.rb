class Api::DrakeshipsController < ApplicationController
  before_action :require_login

  def create
    @drakeship = Drakeship.new(create_drakeship_params)
    @drakeship.requester = current_user
    @drakeship.request_status = "pending"

    if @drakeship.save
      # make a notification here
      render :show
    else
      render json: @drakeship.errors.full_messages
    end
  end

  def show
    @drakeship = Drakeship.find params[:id]
    if user_has_drakeship(@drakeship)
      render :show
    else
      render json: {
        base: ["Forbidden access of Drakeship #{params[:id]}"],
        status: 403
      }
    end
  end

  def index
    @user = User.find params[:user_id]
    if @user
      render "api/users/profile"
    else
      render json: {
        base: ["Could not find user with id #{params[:user_id]}"],
        status: 404
      }
    end
  end

  def update
    @drakeship = Drakeship.find params[:id]

    if @drakeship.update(update_drakeship_params)
      # make a notification here
      render :show
    else
      render json: @drakeship.errors.full_messages
    end
  end

  def destroy
    @drakeship = Drakeship.find params[:id]
    if user_has_drakeship(@drakeship) && @drakeship.destroy
      render :show
    else
      render json: {
        base: ["You can't destroy Drakeship #{params[:id]}"],
        status: 422
      }
    end
  end

  private
  def create_drakeship_params
    params.require(:drakeship).permit(:recipient_id)
  end

  def update_drakeship_params
    params.require(:drakeship).permit(:id, :request_status, :relationship_type)
  end

  def user_has_drakeship(drakeship)
    drakeship && (drakeship.requester == current_user || drakeship.recipient == current_user)
  end
end