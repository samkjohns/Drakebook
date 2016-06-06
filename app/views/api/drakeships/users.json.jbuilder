json.drakeship do
  json.requester do
    json.username @drakeship.requester.username
    json.id @drakeship.requester_id
  end

  json.recipient do
    json.username @drakeship.recipient.username
    json.id @drakeship.recipient_id
  end

  json.extract! @drakeship, :request_status, :relationship_type
end

json.user do
  json.extract! current_user, :id, :username
  json.drakeships current_user.drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end

  json.pendingDrakeships current_user.pending_drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end
end

json.drake do
  json.extract! @drake, :id, :username

  json.drakeships @drake.drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end

  json.pendingDrakeships @drake.pending_drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end
end
