# json.requester @drakeship.requester.username
# json.recipient @drakeship.recipient.username

json.requester do
  json.username @drakeship.requester.username
  json.id @drakeship.requester_id
end

json.recipient do
  json.username @drakeship.recipient.username
  json.id @drakeship.recipient_id
end

json.extract! @drakeship, :request_status, :relationship_type
