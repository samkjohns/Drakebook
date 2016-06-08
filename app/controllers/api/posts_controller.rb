class Api::PostsController < ApplicationController
  before_action :require_login

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

  def create
    @post = Post.new(post_params)
    @post.author = current_user

    if @post.save
      render :show
    else
      render json: {
        errors: @post.errors.full_messages,
        status: 422
      }
    end
  end

  private
  def post_params
    params.require(:post).permit(
      :body, :postable_id, :postable_type
    )
  end

end
