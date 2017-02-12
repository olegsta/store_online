json.array!(@answerfrommoderators) do |answerfrommoderator|
  json.extract! answerfrommoderator, :id, :user_id, :send_message, :name, :content
  json.url answerfrommoderator_url(answerfrommoderator, format: :json)
end
