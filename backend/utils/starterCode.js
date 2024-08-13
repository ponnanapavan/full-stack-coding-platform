const starterCode= {
    'Max-Element': `
     
    // implemented function

    const nums=[[1,2,3,4],[1,4,-1,7],[9.1,11,6]]
    const output=[4,7,11]
    let ans=[];
    for(let i=0;i<nums.length;i++)
   {
      let res=maxelement(nums[i]);
      if(res === output[i])
      ans.push(true);
      else
      ans.push(false);
    }
       console.log(ans);
  
  `
  };
  export default starterCode;