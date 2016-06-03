json.extract! drakeship, :requester_id, :recipient_id, :request_status, :relationship_type
json.requester drakeship.requester.username
json.recipient drakeship.recipient.username
