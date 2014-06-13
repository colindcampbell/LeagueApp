require 'spec_helper'

describe League do 
	before do
		@league = League.new(name:"Summer2014", start_date: Date.today, end_date: Date.today, description:"A very short league")
	end
	subject{@league}

	it {should belong_to(:user)}
	it {should have_many(:days)}
	it {should have_many(:league_teams)}
	it {should have_many(:games).through(:days)}
	it {should have_many(:teams).through(:league_teams)}

	describe "without a name" do
		before{@league.name=""}
		it {should_not be_valid}
	end

	describe "without a start date" do
		before{@league.start_date=nil}
		it {should_not be_valid}
	end

	describe "without an end date" do
		before{@league.end_date=nil}
		it {should_not be_valid}
	end

	describe "without a unique name" do
    before do
      @league.save
      @league2 = @league.dup
      @league2.name = "Summer2014"
    end
    it "should not be valid" do
      expect(@league2).to_not be_valid
    end
  end

end






