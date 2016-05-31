Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [ :create, :show, :update ]
end
