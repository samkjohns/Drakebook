class Api::DrakeshipsController < ApplicationController
  before_action :require_login

  def create
    @drakeship = Drakeship.new(create_drakeship_params)
    @drakeship.requester = current_user
    @drakeship.request_status = "pending"
    @drake = @drakeship.recipient

    if @drakeship.save
      # make a notification here
      render :users
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

  def update
    @drakeship = Drakeship.find_by(
      requester_id: params[:user_id],
      recipient_id: params[:drake_id]
    ) || Drakeship.find_by(
      requester_id: params[:drake_id],
      recipient_id: params[:user_id]
    )

    @drake = current_user.id === @drakeship.requester_id ?
      @drakeship.recipient : @drakeship.requester

    if @drakeship.update(update_drakeship_params)
      # make a notification here
      render :users
    else
      render json: @drakeship.errors.full_messages
    end
  end

  def undrake
    # @user = User.find(params[:user_id])
    # @drake = User.find(params[:drake_id])
    @drakeship = Drakeship.find_by(
      requester_id: params[:user_id],
      recipient_id: params[:drake_id]
    ) || Drakeship.find_by(
      requester_id: params[:drake_id],
      recipient_id: params[:user_id]
    )
    @drake = current_user.id === @drakeship.requester_id ?
      @drakeship.recipient : @drakeship.requester

    if @drakeship && @drakeship.destroy
      render :users
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
    params.require(:drakeship).permit(:request_status, :relationship_type)
  end

  def user_has_drakeship(drakeship)
    drakeship && (drakeship.requester == current_user || drakeship.recipient == current_user)
  end
end
