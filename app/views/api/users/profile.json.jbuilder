json.extract!(
  @user, :id, :username,
  :birth_date, :workplace,
  :email, :phone_number,
  :hometown, :current_city,
  :high_school, :college, :college_major,
  :intro, :name_pronunciation
)
json.drakeships @user.drakeships do |drake|
  json.extract! drake, :id, :username, :profile_photo_path
end

json.pendingDrakeships(
  @user.received_drakeships.where(request_status: "pending").includes(:requester)
) do |drakeship|
  # json.extract! drake, :id, :username, :profile_photo_path
  json.extract! drakeship.requester, :id, :username, :profile_photo_path
end
