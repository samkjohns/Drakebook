Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [ :create, :show, :update ] do
      resources :drakeships, only: [ :index ]
    end

    resource :session, only: [ :show, :create, :destroy ]

    resources :drakeships, only: [ :show, :create ]
    get 'drakeships/:user_id/undrake/:drake_id', to: "drakeships#undrake"
    get 'drakeships/:user_id/update/:drake_id', to: "drakeships#update"
  end
end
