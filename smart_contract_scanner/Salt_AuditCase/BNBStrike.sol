/**
 *Submitted for verification at BscScan.com on 2021-05-05
*/

pragma solidity 0.5.8;

contract BNBSTRIKE {
	using SafeMath for uint256;

	uint256 constant public INVEST_MIN_AMOUNT = 0.05 ether;
	uint256 constant public PROJECT_FEE = 65;
	uint256 constant public DEVELOPER_FEE = 10;
	uint256 constant public MARKETING_FEE = 30;
	uint256 constant public PERCENT_STEP = 5;
	uint256 constant public PERCENTS_DIVIDER = 1000;
	uint256 constant public TIME_STEP = 1 days;
	
	uint256 constant public MAX_HOLD_PERCENT = 20;
	
	uint256[] public REFERRAL_PERCENTS_LEVEL_1 = [30, 20, 10];
	uint256[] public REFERRAL_PERCENTS_LEVEL_2 = [30, 20, 10, 5];
	uint256[] public REFERRAL_PERCENTS_LEVEL_3 = [30, 20, 10, 5, 5];
	uint256[] public REFERRAL_PERCENTS_LEVEL_4 = [30, 20, 10, 5, 5, 5];
	uint256[] public REFERRAL_PERCENTS_LEVEL_5 = [30, 20, 10, 5, 5, 5, 5];
	uint256[] public REFERRAL_PERCENTS_LEVEL_6 = [30, 20, 10, 5, 5, 5, 5, 5];
	
	
	uint256 public round = 0;
	uint256 public INVESTORS_POOL = 0;
	uint256 public participants = 0;
	
	uint256 public POOL_START_TIME;
	
	
    uint256 public totalStaked;
	uint256 public totalRefBonus;


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
		uint256 holdBonusCheckpoint;
		address payable referrer;
		uint256 referrals;
		uint256 totalBonus;
		uint256 refRewards;
		uint256 turnover;
		uint256 poolRewards;
	}

	mapping (address => User) internal users;
	
	mapping(uint256 => mapping(address => uint256)) public poolParticipants; // round => address => amount of investment
    mapping(uint256 => mapping(uint256 => address)) public participantAdresses; // round => id => address

	uint256 public startUNIX;
	address payable private commissionWallet;
	address payable private developerWallet;
	address payable public marketingWallet;

	event Newbie(address user);
	event NewDeposit(address indexed user, uint8 plan, uint256 percent, uint256 amount, uint256 profit, uint256 start, uint256 finish);
	event Withdrawn(address indexed user, uint256 amount);
	event RefBonus(address indexed referrer, address indexed referral, uint256 indexed level, uint256 amount);

	constructor(address payable wallet, address payable _developer, address payable _marketing) public {
		require(!isContract(wallet));
		commissionWallet = wallet;
		developerWallet = _developer;
		marketingWallet = _marketing;
		startUNIX = block.timestamp.add(18 hours);
		POOL_START_TIME = block.timestamp;

        plans.push(Plan(20, 60)); // 6% per day for 20 days
        plans.push(Plan(30, 50)); // 5% per day for 30 days
        plans.push(Plan(40, 40)); // 4% per day for 40 days
        plans.push(Plan(30, 30)); // 3-7% per day for 30 days (random)
        plans.push(Plan(30, 20)); // 2-9% per day for 30 days (random)
        plans.push(Plan(20, 80)); // 8-12% per day for 20 days (random)
	}


function invest(address payable referrer,uint8 plan) public payable {
        _invest(referrer, plan, msg.sender, msg.value, 0);
           
    }


	function _invest(address payable referrer, uint8 plan, address payable sender, uint256 value, uint256 extraProfit) private {
		require(value >= INVEST_MIN_AMOUNT);
        require(plan < 6, "Invalid plan");
        require(startUNIX < block.timestamp, "contract hasn`t started yet");

		uint256 fee = value.mul(PROJECT_FEE).div(PERCENTS_DIVIDER);
		commissionWallet.transfer(fee);
		uint256 developerFee = value.mul(DEVELOPER_FEE).div(PERCENTS_DIVIDER);
		developerWallet.transfer(developerFee);
		uint256 marketingAmount = value.mul(MARKETING_FEE).div(PERCENTS_DIVIDER);
		marketingWallet.transfer(marketingAmount);
		
		
		User storage user = users[sender];

		if (user.referrer == address(0)) {
			if (users[referrer].deposits.length > 0 && referrer != sender) {
				user.referrer = referrer;
			}

			address upline = user.referrer;
			for (uint256 i = 0; i < 8; i++) { // count 8 levels
				if (upline != address(0)) {
					users[upline].referrals = users[upline].referrals.add(1);
					upline = users[upline].referrer;
				} else break;
			}
		}

		if (user.referrer != address(0)) {
			address payable upline = user.referrer;
			uint256[] memory REFERRAL_PERCENTS = getReferralPercents(upline);
			for (uint256 i = 0; i < 8; i++) {  // count 8 levels
				if (upline != address(0)) {
				    if(REFERRAL_PERCENTS.length > i) {
    					uint256 amount = value.mul(REFERRAL_PERCENTS[i]).div(PERCENTS_DIVIDER);
    					
    					users[upline].refRewards = users[upline].refRewards.add(amount);
				    }
				    
					users[upline].turnover = users[upline].turnover.add(value);
					
					upline = users[upline].referrer;
				} else break;
			}

		}

		if (user.deposits.length == 0) {
			user.checkpoint = block.timestamp;
			user.holdBonusCheckpoint = block.timestamp;
			emit Newbie(sender);
		}

		(uint256 percent, uint256 profit, uint256 finish) = getResult(plan, value);
		
		percent = percent.add(extraProfit);
		
		user.deposits.push(Deposit(plan, percent, value, profit, block.timestamp, finish));

		totalStaked = totalStaked.add(value);
		
		getInPool(sender,value);
		
		emit NewDeposit(sender, plan, percent, value, profit, block.timestamp, finish);
	}

	function withdraw() public {
		User storage user = users[msg.sender];

		uint256 totalAmount = getUserDividends(msg.sender);

		require(totalAmount > 0, "User has no dividends");

		uint256 contractBalance = address(this).balance;
		if (contractBalance < totalAmount) {
			totalAmount = contractBalance;
		}

		user.checkpoint = block.timestamp;
		user.holdBonusCheckpoint = block.timestamp;

		msg.sender.transfer(totalAmount);
		
		user.poolRewards = 0;

		emit Withdrawn(msg.sender, totalAmount);

	}
	
	function withdrawAndReinvest(uint256 reinvestmentPercent, uint8 plan, address payable referrer) public {
	    require(reinvestmentPercent >=50, "Min. reinvestment must be 50%");
	    require(reinvestmentPercent <=100, "Max. reinvestment must be 100%");
	    
	    User storage user = users[msg.sender];
	    
	    uint256 totalAmount = getUserDividends(msg.sender);

		require(totalAmount > 0, "User has no dividends");
		
		uint256 reinvestment = totalAmount.mul(reinvestmentPercent).div(100);
		totalAmount = totalAmount.sub(reinvestment);
		
		uint256 extraProfit = getExtraProfit();
		
		
		_invest(referrer, plan, msg.sender, reinvestment, extraProfit);
		
		
		user.checkpoint = block.timestamp;
		user.poolRewards = 0;
		
		if(totalAmount > 0){
		    msg.sender.transfer(totalAmount);
		}
		
		emit Withdrawn(msg.sender, totalAmount);
	}
	
	function withdrawRef() public {
	    User storage user = users[msg.sender];
	    require(user.refRewards > 0 , 'user doesnt have referral rewards');
	    
	    msg.sender.transfer(user.refRewards);
	    
	    
	    
	    emit Withdrawn(msg.sender, user.refRewards);
	    
	   
	    user.totalBonus = user.totalBonus.add(user.refRewards);
	    user.refRewards = 0;
	}
	function getExtraProfit() public view returns(uint256) {
	     uint256 timeMultiplier = block.timestamp.sub(startUNIX).div(TIME_STEP).mul(3); // +0.3% per day
	     
	     return timeMultiplier.add(5); 
	}
	
	function getReferralPercents(address userAddress) public view returns(uint256[] memory) {
	     User storage user = users[userAddress];
	     
	     if((user.turnover >= 0 ether)&&(user.turnover <= 49.99 ether)){
	         return REFERRAL_PERCENTS_LEVEL_1;
	     }
	     if((user.turnover >= 50 ether)&&(user.turnover <= 99.99 ether)){
	         return REFERRAL_PERCENTS_LEVEL_2;
	     }
	     if((user.turnover >= 100 ether)&&(user.turnover <= 499.99 ether)){
	         return REFERRAL_PERCENTS_LEVEL_3;
	     }
	     if((user.turnover >= 500 ether)&&(user.turnover <= 999.99 ether)){
	         return REFERRAL_PERCENTS_LEVEL_4;
	     }
	     if((user.turnover >= 1000 ether)&&(user.turnover <= 1499.99 ether)){
	         return REFERRAL_PERCENTS_LEVEL_5;
	     }
	     if(user.turnover >= 1500 ether){
	         return REFERRAL_PERCENTS_LEVEL_6;
	     }
	}

	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}

	function getPlanInfo(uint8 plan) public view returns(uint256 time, uint256 percent) {
		time = plans[plan].time;
		percent = plans[plan].percent;
	}

	function getPercent(uint8 plan) public view returns (uint256) {
	    
		if(plan < 3){
			 return plans[plan].percent.add(PERCENT_STEP.mul(block.timestamp.sub(startUNIX)).div(TIME_STEP));
		} else {
		    uint256 random = getRandomPercent(plan);
		    return plans[plan].percent.add(random).add(PERCENT_STEP.mul(block.timestamp.sub(startUNIX)).div(TIME_STEP));
		}
    }
    
    function getRandomPercent(uint8 plan) private view returns(uint256) {
        uint256 mod;
        
        if(plan == 3){
            mod = 40; // (7% - 3%) * 10
        }
        if(plan == 4){
            mod = 70; // (9% - 2%) * 10
        }
        if(plan == 5){
            mod = 40; // (12% - 8%) * 10
        }
        
        
        bytes32 _blockhash = blockhash(block.number-1);
        
        
        uint256 random =  uint256(keccak256(abi.encode(_blockhash,block.timestamp,block.difficulty))).mod(100); // random number 0...99
        uint256 rand = random.mod(mod);
        
        
        return rand;
    }

	function getResult(uint8 plan, uint256 deposit) public view returns (uint256 percent, uint256 profit, uint256 finish) {
		percent = getPercent(plan);

	
		profit = deposit.mul(percent).div(PERCENTS_DIVIDER).mul(plans[plan].time);
	

		finish = block.timestamp.add(plans[plan].time.mul(TIME_STEP));
	}
	
	 function getUserPercentRate(address userAddress) public view returns (uint) {
        User storage user = users[userAddress];

        uint256 timeMultiplier = block.timestamp.sub(user.holdBonusCheckpoint).div(TIME_STEP).mul(2); // +0.2% per day
            if (timeMultiplier > MAX_HOLD_PERCENT) {
                timeMultiplier = MAX_HOLD_PERCENT;
            }

         return timeMultiplier;
    }

    function getInPool(address userAddress, uint256 amount) private {
        
        if(poolParticipants[round][userAddress] == 0) {
            participantAdresses[round][participants] = userAddress;
            participants = participants.add(1);
        }
        
        poolParticipants[round][userAddress] = poolParticipants[round][userAddress].add(amount);
        
        INVESTORS_POOL = INVESTORS_POOL.add(amount.mul(2).div(100)); // 2%
        
    }
    
    function giveAwayPool() public {
        
        require(block.timestamp > POOL_START_TIME.add(24 hours), ' to give away pool is possible once a day');
        
        (address TOP_1, address TOP_2, address TOP_3, address TOP_4, address TOP_5 ) = getTopAtPool();
        
        users[TOP_1].poolRewards = users[TOP_1].poolRewards.add(INVESTORS_POOL.mul(350).div(1000)); // 35%
        users[TOP_2].poolRewards = users[TOP_2].poolRewards.add(INVESTORS_POOL.mul(250).div(1000)); // 25%
        users[TOP_3].poolRewards = users[TOP_3].poolRewards.add(INVESTORS_POOL.mul(200).div(1000)); // 20%
        users[TOP_4].poolRewards = users[TOP_4].poolRewards.add(INVESTORS_POOL.mul(125).div(1000)); // 12.5%
        users[TOP_5].poolRewards = users[TOP_5].poolRewards.add(INVESTORS_POOL.mul(75).div(1000)); //7.5%
        
        // reset the pool
        
        INVESTORS_POOL = 0;
        round = round.add(1);
        participants = 0;
        
        POOL_START_TIME = block.timestamp;
        
        
        
    }
    
    function sort(uint[] memory data, address[] memory addresses) internal pure returns (address[] memory) {
        quickSort(data, addresses, int(0), int(data.length - 1));
        return addresses;
    }
    
    function quickSort(uint[] memory arr,address[] memory addresses , int left, int right) pure internal {
        int i = left;
        int j = right;
        if (i == j) return;
        uint pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)] < pivot) i++;
            while (pivot < arr[uint(j)]) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                (addresses[uint(i)], addresses[uint(j)]) = (addresses[uint(j)], addresses[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, addresses, left, j);
        if (i < right)
            quickSort(arr, addresses, i, right);
}
    

	function getTopAtPool() public view returns(address,address,address,address,address){
		uint256[] memory amounts = new uint256[](participants);
        address[] memory addresses = new address[](participants);
        
        for(uint256 i = 0; i < participants; i++){
            amounts[i] = poolParticipants[round][participantAdresses[round][i]];
            addresses[i] = participantAdresses[round][i];
        }
        
        addresses = sort(amounts,addresses);
        uint256 len = addresses.length;
        
        address TOP_1 = addresses[len-1];
        address TOP_2 = addresses[len-2];
        address TOP_3 = addresses[len-3];
        address TOP_4 = addresses[len-4];
        address TOP_5 = addresses[len-5];

		return(TOP_1, TOP_2, TOP_3, TOP_4, TOP_5);
	}
   
    
    
	function getUserDividends(address userAddress) public view returns (uint256) {
		User storage user = users[userAddress];

		uint256 totalAmount;
		
		uint256 holdBonus = getUserPercentRate(userAddress);

		for (uint256 i = 0; i < user.deposits.length; i++) {
			if (user.checkpoint < user.deposits[i].finish) {
				if (user.deposits[i].plan < 5) {
					uint256 share = user.deposits[i].amount.mul(user.deposits[i].percent.add(holdBonus)).div(PERCENTS_DIVIDER);
					uint256 from = user.deposits[i].start > user.checkpoint ? user.deposits[i].start : user.checkpoint;
					uint256 to = user.deposits[i].finish < block.timestamp ? user.deposits[i].finish : block.timestamp;
					if (from < to) {
						totalAmount = totalAmount.add(share.mul(to.sub(from)).div(TIME_STEP));
					}
				} else if (block.timestamp > user.deposits[i].finish) {
					totalAmount = totalAmount.add(user.deposits[i].profit);
				}
			}
		}

		return totalAmount.add(user.poolRewards);
	}

	function getUserCheckpoint(address userAddress) public view returns(uint256) {
		return users[userAddress].checkpoint;
	}
    
	function getUserReferrer(address userAddress) public view returns(address) {
		return users[userAddress].referrer;
	}
	
	function getUserTurnover(address userAddress) public view returns(uint256){
	    return users[userAddress].turnover;
	}

	function getUserDownlineCount(address userAddress) public view returns(uint256) {
		return (users[userAddress].referrals);
	}

	function getUserReferralTotalBonus(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus;
	}

	function getUserReferralWithdrawn(address userAddress) public view returns(uint256) {
		return users[userAddress].totalBonus;
	}
	
	function getUserRefRewards(address userAddress) public view returns(uint256) {
	    return users[userAddress].refRewards;
	}

	function getUserAvailable(address userAddress) public view returns(uint256) {
		return getUserDividends(userAddress);
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
		percent = user.deposits[index].percent;
		amount = user.deposits[index].amount;
		profit = user.deposits[index].profit;
		start = user.deposits[index].start;
		finish = user.deposits[index].finish;
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
    
     function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}