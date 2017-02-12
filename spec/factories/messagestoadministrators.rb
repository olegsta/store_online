FactoryGirl.define do
  factory :messagestoadministrator do
    email  { Faker::Internet.email }
    message  { Faker::Pokemon.name }
    name  { Faker::Name.name }
  end
end