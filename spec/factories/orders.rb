FactoryGirl.define do
  factory :order do
    email  { Faker::Internet.email }
    address  { Faker::Pokemon.name }
    name  { Faker::Name.name }
    pay_type "Check"
  end
end