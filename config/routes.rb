Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [ :create, :show, :update ] do
      resources :drakeships, only: [ :index ]
      resources :posts, only: [ :index ]
    end
    get 'search', to: "users#search"

    resource :session, only: [ :show, :create, :destroy ]

    resources :drakeships, only: [ :show, :create ]
    get 'drakeships/:user_id/undrake/:drake_id', to: "drakeships#undrake"
    get 'drakeships/:user_id/update/:drake_id', to: "drakeships#update"

    # posts#show will send down all comments if the params request it
    resources :posts, only: [ :create, :show, :destroy, :update ]
  end
end
