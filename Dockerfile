FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /shop_internet
WORKDIR /shop_internet
ADD Gemfile /shop_internet/Gemfile
ADD Gemfile.lock /shop_internet/Gemfile.lock
RUN bundle install
ADD . /shop_internet
