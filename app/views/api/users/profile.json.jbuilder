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
  Drakeship.where(
    "(requester_id = #{@user.id} OR recipient_id = #{@user.id}) AND request_status = 'pending'"
  )
) do |drakeship|
  json.requester do
    json.id drakeship.requester.id
    json.username drakeship.requester.username
    json.profile_photo_path drakeship.requester.profile_photo_path
  end

  json.recipient do
    json.id drakeship.recipient.id
    json.username drakeship.recipient.username
    json.profile_photo_path drakeship.recipient.profile_photo_path
  end
end
