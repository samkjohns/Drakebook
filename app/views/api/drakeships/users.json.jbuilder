json.drakeship @drakeship do
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

json.user @user do
  json.extract! :id, :username
  json.drakeships @user.drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end
end

json.user @drake do
  json.extract! :id, :username
  json.drakeships @drake.drakeships do |drake|
    json.extract! drake, :id, :username, :profile_photo_path
  end
end
