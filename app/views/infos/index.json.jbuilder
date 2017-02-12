json.array!(@infos) do |info|
  json.extract! info, :id, :image_id, :name, :city, :user_id, :telephone
  json.url info_url(info, format: :json)
end
