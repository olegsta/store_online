# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'shop'


set :repo_url, 'git@github.com:olegprin/shop.git'

set :deploy_to, '/home/deploy/shop'


set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.3.0'

set :passenger_restart_with_touch, true
#set :rbenv_path, '/usr/local/rbenv'
# in case you want to set ruby version from the file:
# set :rbenv_ruby, File.read('.ruby-version').strip

set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all # default value



#set :linked_files, %w{public/sitemaps/sitemap.xml, config/database.yml config/secrets.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/image}
set :linked_files, %w{config/database.yml config/secrets.yml}



 



namespace :deploy do
  
  desc "Seed the database."
  task :sitemap_create do
    on roles(:app) do
      within "#{current_path}" do
        with rails_env: :production do
          execute :rake, "sitemap:generate"
        end
      end
    end
  end

  desc "Symlinks  files for Sitemap."
  task :symlink_config do
    on roles(:app) do
      execute "ln -nfs #{current_path}/public/sitemaps/sitemap.xml #{current_path}/public/sitemap.xml"
      #execute "ln -nfs #{current_path}/config/unicorn_init.sh /etc/init.d/unicorn_#{fetch(:application)}"
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'
end

