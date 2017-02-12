json.array!(@products) do |product|
  json.extract! product, :id, :title, :description, :uploaded_file, :price
  json.url product_url(product, format: :json)
end
