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

  def destroy
    @post = Post.find params[:id]
    if @post && @post.destroy
      render :show
    elsif @post
      render json: {
        errors: @post.errors.full_messages,
        status: 422
      }
    else
      render json: {
        base: ["Could not find post with id #{params[:id]}"],
        status: 404
      }
    end
  end

  def update
    @post = Post.find params[:id]
    if @post && @post.update(update_post_params)
      render :show
    elsif @post
      render json: {
        errors: @post.errors.full_messages,
        status: 422
      }
    else
      render json: {
        base: ["Could not find post with id #{params[:id]}"],
        status: 404
      }
    end
  end

  private
  def post_params
    params.require(:post).permit(
      :body, :postable_id, :postable_type
    )
  end

  def update_post_params
    params.require(:post).permit(:body)
  end

end
