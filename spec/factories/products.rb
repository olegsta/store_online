require 'faker'

FactoryGirl.define do
  factory :product do
    price  { Faker::Number.number(10) }
    title  { Faker::Company.name}
    description  { Faker::Company.catch_phrase }
    uploaded_file {Faker::Avatar.image("my-own-slug", "50x50", "jpg")}
  end
end