class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login @user
      render :show
    else
      render(
        json: { errors: @user.errors.full_messages },
        status: 422
      )
    end
  end

  def show
    @user = User.find(params[:id])
    render :profile
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :profile
    else
      render(
        json: { errors: @user.errors.full_messages },
        status: 422
      )
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :username, :password,
      :birth_date, :workplace,
      :email, :phone_number,
      :hometown, :current_city,
      :high_school, :college, :college_major,
      :intro, :name_pronunciation
    )
  end
end
