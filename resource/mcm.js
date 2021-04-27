document.addEventListener("DOMContentLoaded",function(){
 
    let dp=new Array(100);
    for(let i=0;i<100+1;i++)
    {
        dp[i]=new Array(100);
    } 
  
// Function for matrix chain multiplication 
function mcm( p, i, j) 
{ 
    if (i == j)  
    { 
        return 0; 
    } 
    if (dp[i][j] != -1)  
    { 
        return dp[i][j]; 
    } 
    dp[i][j] =Number.MAX_VALUE; 
    for (let k = i; k < j; k++)  
    { 
        dp[i][j] = Math.min( 
            dp[i][j], mcm(p, i, k) 
                     + mcm(p, k + 1, j) 
                       + p[i - 1] * p[k] * p[j]); 
    } 
    return dp[i][j]; 
} 
function MatrixChainOrder( p,n) 
{ 
    let i = 1, j = n - 1; 
    return mcm(p, i, j); 
} 

function main(arr){
    // let arr= [ 1, 2, 3, 4,4,5,6,7,3,8,4,7,5,4,3,4,6 ]; 
    let n =arr.length; 
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<100;j++)
        dp[i][j]=-1;
    }
    let ans=document.getElementById("ans");
    ans.innerHTML="<br> Minimum number of multiplications is <b>" + MatrixChainOrder(arr, n)+"</b>";
}
function input(){
    //   let select= new Array(10);
    //   let i;
    //   for(i=0;i<10;i++){
    //       select[i]=new Array(2);
    //   }
      //1
    //   select[0][0]="ASEDYESMANUSMANSAHUAANANSNAEDDA"
    //   select[0][1]="DSEAYESMAYUSDDNSDDHUDDNAESNAEADA"
    let select;
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         select=JSON.parse(this.response);
      }
    };
    xhttp.open("GET", "input/mcm_input.txt", false);
    xhttp.send();
    let div,x,i,t;
    div=document.createElement("div");
    div.setAttribute("class","tab-content");
    for(i=0;i<10;i++)
    {
      x=document.createElement("div");
      x.style.border="2px solid black";
      x.style.overflow="scroll"
      x.style.fontWeight="bolder";
      x.style.color="blue"
      t=document.createTextNode("P= "+JSON.stringify(select[i]));
      x.appendChild(t);
      t=document.createElement("br");
      x.appendChild(t);
      x.setAttribute("id","input"+(i+1));
      if(i>0)
      x.setAttribute("class","container tab-pane ")
      else
      x.setAttribute("class","container tab-pane active ")
      div.appendChild(x);
    }
    div.style.paddingBottom="10px"
    document.getElementById("body").appendChild(div);
     let form=document.createElement("form");
     form.style.marginTop="10px"
     form.setAttribute("id","inform");
      let label=document.createElement("label");
      label.textContent="Enter your choice :  "
      label.setAttribute("for","input");
      let input=document.createElement("input");
      input.setAttribute("id","input")
      input.setAttribute("type","number");
      input.setAttribute("min","1");
      input.setAttribute("max","10");
      input.setAttribute("required","required")
      form.appendChild(label);
      form.appendChild(input);
      let sub=document.createElement("input")
      sub.setAttribute("type","submit");
      form.appendChild(sub);
      form.setAttribute("class","container")
      document.querySelector("#body").appendChild(form);
      let ans=document.createElement("div");
      ans.setAttribute("id","ans");
      document.getElementById("body").appendChild(ans);
      ans.setAttribute("class","container")
      document.getElementById("inform").addEventListener("submit",function(event){
       event.preventDefault();
       let x=document.getElementById("input").value;
       main(select[x-1]);
     })
      console.log(JSON.stringify(select))
  }

  input();

})