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
json.pendingDrakeships @user.pending_drakeships do |drake|
  json.extract! drake, :id, :username, :profile_photo_path
end
