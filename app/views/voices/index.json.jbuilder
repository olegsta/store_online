json.array!(@voices) do |voice|
  json.extract! voice, :id
  json.url voice_url(voice, format: :json)
end
