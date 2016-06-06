json.extract! @user, :id, :username, :birth_date, :workplace
json.drakeships @user.drakeships do |drake|
  json.extract! drake, :id, :username, :profile_photo_path
end
json.pendingDrakeships @user.pending_drakeships do |drake|
  json.extract! drake, :id, :username, :profile_photo_path
end
