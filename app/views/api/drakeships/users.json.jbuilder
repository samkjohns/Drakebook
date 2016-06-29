json.drakeship do
  json.requester do
    json.username @drakeship.requester.username
    json.id @drakeship.requester_id
    json.profile_photo_url asset_path(@drakeship.requester.profile_photo.url)
  end

  json.recipient do
    json.username @drakeship.recipient.username
    json.id @drakeship.recipient_id
    json.profile_photo_url asset_path(@drakeship.recipient.profile_photo.url)
  end

  json.extract! @drakeship, :request_status, :relationship_type
end

json.user do
  json.extract! current_user, :id, :username
  json.profile_photo_url asset_path(current_user.profile_photo.url)

  json.drakeships current_user.drakeships do |drake|
    json.extract! drake, :id, :username
    json.profile_photo_url asset_path(drake.profile_photo.url)
  end

  json.pendingDrakeships(
    Drakeship.where(
      "(requester_id = #{current_user.id} OR recipient_id = #{current_user.id}) AND request_status = 'pending'"
    )
  ) do |drakeship|
    json.requester do
      json.id drakeship.requester.id
      json.username drakeship.requester.username
      json.profile_photo_url asset_path(drakeship.requester.profile_photo.url)
    end

    json.recipient do
      json.id drakeship.recipient.id
      json.username drakeship.recipient.username
      json.profile_photo_url asset_path(drakeship.recipient.profile_photo.url)
    end
  end
end

json.drake do
  json.extract! @drake, :id, :username
  json.profile_photo_url asset_path(@drake.profile_photo.url)
  json.cover_photo_url asset_path(@drake.cover_photo.url)

  json.drakeships @drake.drakeships do |drake|
    json.extract! drake, :id, :username
    json.profile_photo_url asset_path(drake.profile_photo.url)
  end

  json.pendingDrakeships(
    Drakeship.where(
      "(requester_id = #{@drake.id} OR recipient_id = #{@drake.id}) AND request_status = 'pending'"
    )
  ) do |drakeship|
    json.requester do
      json.id drakeship.requester.id
      json.username drakeship.requester.username
      json.profile_photo_url asset_path(drakeship.requester.profile_photo.url)
    end

    json.recipient do
      json.id drakeship.recipient.id
      json.username drakeship.recipient.username
      json.profile_photo_url asset_path(drakeship.recipient.profile_photo.url)
    end
  end
end
