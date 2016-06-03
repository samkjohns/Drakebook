json.array! @user.drakeships, partial: "api/users/user", as: :user

# json.array! @user.drakeships do |drakeship|
#   json.extract! drakeship, :id, :requester_id, :recipient_id, :request_status, :relationship_type
# end
