class League < ActiveRecord::Base
  belongs_to :user
  has_many :days
  has_many :teams
  
end
