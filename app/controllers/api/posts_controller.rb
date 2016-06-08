class Api::PostsController < ApplicationController
  def index
    user = User.find params[:user_id]

    if user
      @postable_id = user.id
      @posts = user.wall_posts
      render :index
    else
      render json: {
        base: ["No user with id #{params[:user_id]} exists"],
        status: 404
      }
    end
  end


end
