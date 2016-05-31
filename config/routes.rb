Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, default: {format: :json} do
    resources :users, only: [ :create, :show, :update ]
    resource :session, only: [ :create, :destroy ]
  end
end
