json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.profile_photo_url asset_path(user.profile_photo.url)
end
