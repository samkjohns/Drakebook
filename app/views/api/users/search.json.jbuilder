json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.profilePhotoPath user.profile_photo_path
end
