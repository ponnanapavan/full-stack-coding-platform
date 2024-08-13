const contestStarterCode={
    'string-palindrome':`
      
       //implemented function  

     const nums=["pavan","madam","racecar"];
     const outputs=[false,true,true];
     let ans=[]
     for(let i=0;i<nums.length;i++){
      let res=isPalindrome(nums[i]);
      if(res === outputs[i])
      ans.push(true);
      else
      ans.push(false);
     }
        console.log(ans);
    
    
    `,
    'First-Missing-Positive':`
    //implemented function

    const nums=[[1,0,3],[1,3,4],[1,3,4]];
    const outputs=[2,2,2];
    let ans=[]
    for(let i=0;i<nums.length;i++){
       let res=firstMissingPositive(nums[i]);
       if(res === outputs[i])
       ans.push(true);
       else
       ans.push(false);
    }
         console.log(ans);
    `
}

export default contestStarterCode