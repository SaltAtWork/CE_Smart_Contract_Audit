/**
 *Submitted for verification at BscScan.com on 2021-04-24
*/

// SPDX-License-Identifier: MIT 
pragma solidity 0.8.3;

contract BNBFlow {
	using SafeMath for uint256;

	uint256 constant public INVEST_MIN_AMOUNT = 0.05 ether;
	uint256[] public REFERRAL_PERCENTS = [40, 20, 10];
	uint256 public constant MARKETING_FEE = 30;
	uint256 public constant MARKETING2_FEE = 30;
	uint256 constant public PROJECT_FEE = 30;
	uint256 constant public FUND_FEE = 30;
	uint256 constant public PERCENT_STEP = 1;
	uint256 constant public PERCENTS_DIVIDER = 1000;
	uint256 constant public CONTRACT_BALANCE_STEP = 100 ether; // Every 100 BNB 0.1% aditional.
	uint256 constant public TIME_STEP = 1 days; // 1 days

	uint256 public totalStaked;
	uint256 public totalRefBonus;
	
	uint256 public startUNIX;
	address payable public fundAds;
    address payable public mktAds;
	address payable public mkt2Ads;
    address payable public prjAds;
	
    struct Plan {
        uint256 time;
        uint256 percent;
    }

    Plan[] internal plans;

	struct Deposit {
        uint8 plan;
		uint256 percent;
		uint256 amount;
		uint256 profit;
		uint256 start;
		uint256 finish;
	}

	struct User {
		Deposit[] deposits;
		uint256 checkpoint;
		uint256 checkpointH;
		address referrer;
		uint256[3] levels;
		uint256 bonus;
		uint256 totalBonus;
		uint256 holdBonus;
	}

	mapping (address => User) internal users;



	event Newbie(address user);
	event NewDeposit(address indexed user, uint8 plan, uint256 percent, uint256 amount, uint256 profit, uint256 start, uint256 finish);
	event Sendtorein(address indexed user, uint256 amount);
	event Withdrawn(address indexed user, uint256 amount);
	event RefBonus(address indexed referrer, address indexed referral, uint256 indexed level, uint256 amount);
	event FeePayed(address indexed user, uint256 totalAmount);

	constructor(address payable fundAddr,address payable mktAddr,address payable mkt2Addr, uint256 startDate) {
		require(!isContract(mktAddr) && !isContract(mkt2Addr) && !isContract(fundAddr));
		require(startDate > 0);
		fundAds = fundAddr;
        mktAds = mktAddr;
		mkt2Ads = mkt2Addr;
        prjAds = payable(msg.sender);
		startUNIX = startDate;

        plans.push(Plan(200, 25));
        
	}
	
	function FeePayout(uint256 amt) internal{
    uint256 mktFee = amt.mul(MARKETING_FEE).div(PERCENTS_DIVIDER);
	uint256 mkt2Fee = amt.mul(MARKETING2_FEE).div(PERCENTS_DIVIDER);
    uint256 prjFee = amt.mul(PROJECT_FEE).div(PERCENTS_DIVIDER);
    uint256 fundFee = amt.mul(FUND_FEE).div(PERCENTS_DIVIDER);
    mktAds.transfer(mktFee);
	mkt2Ads.transfer(mkt2Fee);
    prjAds.transfer(prjFee);
    fundAds.transfer(fundFee);
    emit FeePayed(msg.sender, (mktFee.add(prjFee)).add(fundFee.add(mkt2Fee)));
}

	function invest(address referrer, uint8 plan) public payable {
	    require(block.timestamp >= startUNIX, "Not Launch");
		require(msg.value >= INVEST_MIN_AMOUNT);
        require(plan < 1, "Invalid plan");

        FeePayout(msg.value);

		User storage user = users[msg.sender];
		if (user.referrer == address(0)) {
			if (users[referrer].deposits.length > 0 && referrer != msg.sender) {
				user.referrer = referrer;
			}

			address upline = user.referrer;
			for (uint256 i = 0; i < 3; i++) {
				if (upline != address(0)) {
					users[upline].levels[i] = users[upline].levels[i].add(1);
					upline = users[upline].referrer;
				} else break;
			}
		}
		
		uint256 refsamount;
		if (user.referrer != address(0)) {
			address upline = user.referrer;
			for (uint256 i = 0; i < 3; i++) {
				if (upline != address(0)) {
					uint256 amount = msg.value.mul(REFERRAL_PERCENTS[i]).div(PERCENTS_DIVIDER);
					users[upline].bonus = users[upline].bonus.add(amount);
					users[upline].totalBonus = users[upline].totalBonus.add(amount);
					emit RefBonus(upline, msg.sender, i, amount);
					upline = users[upline].referrer;
				} else{
				    uint256 amount = msg.value.mul(REFERRAL_PERCENTS[i]).div(PERCENTS_DIVIDER);
				    refsamount = refsamount.add(amount);
				}
			}
			if (refsamount > 0){
            mktAds.transfer(refsamount.div(4));
			mkt2Ads.transfer(refsamount.div(4));
            fundAds.transfer(refsamount.div(4));
            prjAds.transfer(refsamount.div(4));
			}

		}else{
		    uint256 refsbkp = 70;
		    uint256 amount = msg.value.mul(refsbkp).div(PERCENTS_DIVIDER);
            mktAds.transfer(amount.div(4));
			mkt2Ads.transfer(amount.div(4));
            fundAds.transfer(amount.div(4));
            prjAds.transfer(amount.div(4));
		}

		if (user.deposits.length == 0) {
			user.checkpoint = block.timestamp;
			user.checkpointH = block.timestamp;
			emit Newbie(msg.sender);
		}

		(uint256 percent, uint256 profit, uint256 finish) = getResult(plan, msg.value);
		user.deposits.push(Deposit(plan, percent, msg.value, profit, block.timestamp, finish));

		totalStaked = totalStaked.add(msg.value);
		emit NewDeposit(msg.sender, plan, percent, msg.value, profit, block.timestamp, finish);
	}

	function withdraw() public {
		User storage user = users[msg.sender];

		uint256 totalAmount = getUserDividends(msg.sender); 

		uint256 referralBonus = getUserReferralBonus(msg.sender);
		if (referralBonus > 0) {
			user.bonus = 0;
			totalAmount = totalAmount.add(referralBonus);
		}

		require(totalAmount > 0, "User has no dividends");

		uint256 contractBalance = address(this).balance;
		if (contractBalance < totalAmount) {
			totalAmount = contractBalance;
		}

		user.checkpoint = block.timestamp;
		user.checkpointH = block.timestamp;

		payable(msg.sender).transfer(totalAmount.sub(totalAmount.mul(25).div(100)));
        users[msg.sender].holdBonus = users[msg.sender].holdBonus.add(totalAmount.mul(25).div(100));

		emit Withdrawn(msg.sender, totalAmount);

	}

	function sendrein() public {
		User storage user = users[msg.sender];

		uint256 totalAmount = getUserDividends(msg.sender);

		uint256 referralBonus = getUserReferralBonus(msg.sender);
		if (referralBonus > 0) {
			user.bonus = 0;
			totalAmount = totalAmount.add(referralBonus);
		}

		require(totalAmount > 0, "User has no dividends");
		user.checkpoint = block.timestamp;

        users[msg.sender].holdBonus = users[msg.sender].holdBonus.add(totalAmount);

		emit Sendtorein(msg.sender, totalAmount);
	}

	function reInvest(uint8 plan) public {
        require(plan < 1, "Invalid plan");
        uint256 amount = users[msg.sender].holdBonus;

        User storage user = users[msg.sender];

        (uint256 percent, uint256 profit, uint256 finish) = getResult(plan, amount);
		user.deposits.push(Deposit(plan, percent, amount, profit, block.timestamp, finish));

        totalStaked = totalStaked.add(amount);

		emit NewDeposit(msg.sender, plan, percent, amount, profit, block.timestamp, finish);
        user.holdBonus = 0;
    }

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}
	
	function getContractBalanceRate() public view returns (uint256) {
        uint256 contractBalance = address(this).balance;
        uint256 contractBalancePercent = contractBalance.div(CONTRACT_BALANCE_STEP);

            return contractBalancePercent;

    }
	
	function getUserHoldRate(address userAddress) public view returns (uint256) {
        User storage user = users[userAddress];
        uint256 timeMultiplier;
        if (isActive(userAddress)) {
            timeMultiplier = block.timestamp.sub(user.checkpointH).div(TIME_STEP).mul(2);
            return timeMultiplier;
        } else {
            timeMultiplier = 0;
            return timeMultiplier;
        }
    }
    
	function getPlanInfo(uint8 plan) public view returns(uint256 time, uint256 percent) {
		time = plans[plan].time;
		percent = plans[plan].percent;
	}

	function getPercent(uint8 plan) public view returns (uint256) {
	    uint256 CR = getContractBalanceRate();
	    uint256 HR = getUserHoldRate(msg.sender);
		if (block.timestamp > startUNIX) {
			return plans[plan].percent.add(PERCENT_STEP.mul(block.timestamp.sub(startUNIX)).div(TIME_STEP)).add(CR).add(HR);
		} else {
			return plans[plan].percent;
		}
    }

	function getResult(uint8 plan, uint256 deposit) public view returns (uint256 percent, uint256 profit, uint256 finish) {
		percent = getPercent(plan);

		profit = deposit.mul(percent).div(PERCENTS_DIVIDER).mul(plans[plan].time);
		finish = block.timestamp.add(plans[plan].time.mul(TIME_STEP));
	}

	function getUserDividends(address userAddress) public view returns (uint256) {
		User storage user = users[userAddress];
		uint256 totalAmount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
			if (user.checkpoint < user.deposits[i].finish) {
			    uint256 share = user.deposits[i].amount.mul(user.deposits[i].percent).div(PERCENTS_DIVIDER); 
			 
					uint256 from = user.deposits[i].start > user.checkpoint ? user.deposits[i].start : user.checkpoint;
					uint256 to = user.deposits[i].finish < block.timestamp ? user.deposits[i].finish : block.timestamp;
					if (from < to) {
						totalAmount = totalAmount.add(share.mul(to.sub(from)).div(TIME_STEP));
					}
			}
		}

		return totalAmount;
	}

	function getUserCheckpoint(address userAddress) public view returns(uint256) {
		return users[userAddress].checkpoint;
	}

	function getUserCheckpointH(address userAddress) public view returns(uint256) {
		return users[userAddress].checkpointH;
	}

	function getUserholdBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].holdBonus;
	}

	function getUserReferrer(address userAddress) public view returns(address) {
		return users[userAddress].referrer;
	}

	function getUserDownlineCount(address userAddress) public view returns(uint256, uint256, uint256) {
		return (users[userAddress].levels[0], users[userAddress].levels[1], users[userAddress].levels[2]);
	}

	function getUserReferralBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].bonus;
	}

	function getUserReferralTotalBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus;
	}

	function getUserReferralWithdrawn(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus.sub(users[userAddress].bonus);
	}

	function getUserAvailable(address userAddress) public view returns(uint256) {
		return getUserReferralBonus(userAddress).add(getUserDividends(userAddress));
	}

	function getUserAmountOfDeposits(address userAddress) public view returns(uint256) {
		return users[userAddress].deposits.length;
	}

	function getUserTotalDeposits(address userAddress) public view returns(uint256 amount) {
		for (uint256 i = 0; i < users[userAddress].deposits.length; i++) {
			amount = amount.add(users[userAddress].deposits[i].amount);
		}
	}

	function getUserDepositInfo(address userAddress, uint256 index) public view returns(uint8 plan, uint256 percent, uint256 amount, uint256 profit, uint256 start, uint256 finish) {
	    User storage user = users[userAddress];

		plan = user.deposits[index].plan;
		percent = (user.deposits[index].percent);
		amount = user.deposits[index].amount;
		profit = ((user.deposits[index].amount).mul(percent).div(PERCENTS_DIVIDER)).mul(((user.deposits[index].finish).sub(user.deposits[index].start)).div(TIME_STEP));
		start = user.deposits[index].start;
		finish = user.deposits[index].finish;
	}

     function isActive(address userAddress) public view returns (bool) {
        User storage user = users[userAddress];
        return (user.deposits.length > 0);
    }


	function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
}

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }
}