class Location < ActiveRecord::Base
	validates :address, presence: true
	has_many :games
end
