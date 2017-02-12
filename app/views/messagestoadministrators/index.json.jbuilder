json.array!(@messagestoadministrators) do |messagestoadministrator|
  json.extract! messagestoadministrator, :id, :name, :user_id, :telephone, :email, :message
  json.url messagestoadministrator_url(messagestoadministrator, format: :json)
end
