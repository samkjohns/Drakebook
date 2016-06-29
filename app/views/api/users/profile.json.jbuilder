json.extract!(
  @user, :id, :username,
  :birth_date, :workplace,
  :email, :phone_number,
  :hometown, :current_city,
  :high_school, :college, :college_major,
  :intro, :name_pronunciation,
)

json.profile_photo_url asset_path(@user.profile_photo.url)
json.cover_photo_url asset_path(@user.cover_photo.url)

json.drakeships @user.drakeships do |drake|
  json.extract! drake, :id, :username
  json.profile_photo_url asset_path(drake.profile_photo.url)
  # json.cover_photo_url asset_path(drake.cover_photo.url)
end

json.pendingDrakeships(
  Drakeship.where(
    "(requester_id = #{@user.id} OR recipient_id = #{@user.id}) AND request_status = 'pending'"
  )
) do |drakeship|
  requester = drakeship.requester
  recipient = drakeship.recipient

  json.requester do
    json.id requester.id
    json.username requester.username
    json.profile_photo_url asset_path(requester.profile_photo.url)
    # json.cover_photo_url asset_path(requester.cover_photo.url)
  end

  json.recipient do
    json.id recipient.id
    json.username recipient.username
    json.profile_photo_url asset_path(recipient.profile_photo.url)
    # json.cover_photo_url asset_path(recipient.cover_photo.url)
  end
end
