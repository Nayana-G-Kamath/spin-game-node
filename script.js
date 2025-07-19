//1. collect some amount of money to deposite from the user
//2. collect the number of lines to bid on
//3. collect bed amout
//4. spin the slot machine
//5. check idf the user has won
//6. give user their winnings
//7. restart the game again





//7. restart the game again



//promt variable creation
const prompt = require("prompt-sync")();
//1. collect some amount of money to deposite from the user
const deposite = () => {
  while (true) {
    const depositeAmount = prompt("enter deposite amount: ");
    const numberDepositeAmount = parseFloat(depositeAmount); //this will convert string to float & if user enters letters then sets NaN
    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("Invalid Amount please try again");
    } else {
      return numberDepositeAmount;
    }
  }
};

const balance = deposite();
//2. collect the number of lines to bid on
const getLines = () => {
  while (true) {
    const lines = prompt("enter number of lines to bid on: ");
    const numberOfLines = parseInt(lines); //this will convert string to float & if user enters letters then sets NaN
    if (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines <=0) {
      console.log("Invalid number of lines please try again");
    } else {
      return numberOfLines;
    }
  }
};




//3. collect betting amout
const getBid = (balance,totalLines) => {
  while (true) {
    const biddingAmount = prompt("enter bidding amount: ");
    const numberbiddingAmount = parseInt(biddingAmount); //this will convert string to float & if user enters letters then sets NaN
    if (isNaN(biddingAmount) || numberbiddingAmount <=0 || numberbiddingAmount*totalLines>balance) {
      console.log("Invalid amount please try again");
    } else {
      return numberbiddingAmount;
    }
  }
};



//4. spin the slot machine

  //define 3*3 matrix
NUM_COLS=3;
Num_ROWS=3;

//here is to tell that how many times the alphabet is likely appear A<B<C<D
const SPIN_COUNT={
  "A": 2,//"symbol" : count 
  "B":4,
  "C":6,
  "D":8
}

//here is to tell that how different reward is calculate ,,,since A is rare we assign more rewars to that
const SPIN_REWARDS={
  "A": 4, //"symbol" : count 
  "B":3,
  "C":2,
  "D":1
}

//CONVER OBJECTS TO ARRAY[A,A,B,B,B,C,C,C,C...........]

const spin=(SPIN_COUNT)=>{
  //this is convert object to array...here converted to 2D array
  const entryArray=Object.entries(SPIN_COUNT);

  //enpty array to store [A,A,B,B,B,C,C,C,C...........]
  const symbols=[];

  for(let i=0; i<entryArray.length; i++)
  {
    const symbol=entryArray[i][0];
    const count=entryArray[i][1];

    for(let j=0; j<count; j++)
    {
      symbols.push(symbol);
    }
  }

  // >>>this is the alternative to the previous loops ..using of for loop
// for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
//   for (let i = 0; i < count; i++) {
//     symbols.push(symbol);
//   }
// }



const reels=[];
for(let i=0; i<Num_ROWS; i++)
{
  reels.push([]); //appends each 
  let reelsSymbols=[...symbols] //by 
  for(let j=0; j<NUM_COLS; j++)
  {
    let randomIndex=Math.floor(Math.random()*reelsSymbols.length)

    let randomSymbol=reelsSymbols[randomIndex];
    reels[i].push(randomSymbol);
    reelsSymbols.splice(randomIndex,1);
  }
}

return reels;
}

//printing the reels
const printReels=(reels)=>{
  for(let i=0; i<Num_ROWS; i++)
  { 
    let rowString="";
    for(let j=0; j<NUM_COLS; j++)
    {
      rowString=rowString+reels[i][j];
      if(j!=Num_ROWS-1)
      {
        rowString +=" | "
      }
    }
    console.log(rowString);
  }
  
}



// console.log(spin(SPIN_COUNT))




//5. check if the user has won
//6. give user their winnings<both in one step>
const winnings=(totalLines,reels,bid)=>
{
   let winnings=0;
   for(let row=0; row<totalLines; row++)
   {
       const symbols=reels[row];
       let allCorrect=true;
       for(let symbol of symbols )
       {
        if(symbol!=symbols[0])
        {
          allCorrect=false;
          break
        }
       }

       if(allCorrect)
       {
        winnings=winnings+bid*SPIN_REWARDS[symbols[0]];
       }
   }

   return winnings;
}


//function calls
const totalLines=getLines();
bid=getBid(balance,totalLines);
reels=spin(SPIN_COUNT);
printReels(reels);
winAmount=winnings(totalLines,reels,bid)
console.log("you won: "+ winAmount.toString());
