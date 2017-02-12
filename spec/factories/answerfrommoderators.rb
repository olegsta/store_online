FactoryGirl.define do
  factory :answerfrommoderator do
    #email  { Faker::Internet.email }
    content  { Faker::Pokemon.name }
    name  { Faker::Name.name }
  end
end