require 'spec_helper'

describe Day do

	before do
		@league = League.create(name:"Summer2014", start_date: Date.today, end_date: Date.today)
		@day = Day.new(date: Date.today, league: @league)
	end
	subject{@day}

	it{should respond_to(:date)}
	it{should belong_to(:league)}
	it{should have_many(:games)}
	

	# it "should not allow a duplicate date" do
	# 	before do
	# 		@day.save
	# 		@day2 = @day.dup
	# 		@day2.date = Date.today
	# 	end
	# 	it "should not be valid" do
	# 		expect(@day2).to_not be_valid
	# 	end
	# end




end  