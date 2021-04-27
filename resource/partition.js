document.addEventListener("DOMContentLoaded",function(){
  let dp=new Array(100);
  for(let i=0;i<100+1;i++)
  {
      dp[i]=new Array(100);
  } 
function findPartiion(arr,n)
{
	let sum = 0;
	let i, j;

	// Calculate sum of all elements
	for (i = 0; i < n; i++)
		sum += arr[i];

	if (sum % 2 != 0)
		return false;

    let part=new Array(sum/2 +1);
    for(let i=0;i<sum/2 +1;i++)
     part[i]=new Array(n+1);
    

	// initialize top row as true
	for (i = 0; i <= n; i++)
		part[0][i] = true;

	// initialize leftmost column,
	// except part[0][0], as 0
	for (i = 1; i <= sum / 2; i++)
		part[i][0] = false;

	// Fill the partition table in bottom up manner
	for (i = 1; i <= sum / 2; i++) {
		for (j = 1; j <= n; j++) {
			part[i][j] = part[i][j - 1];
			if (i >= arr[j - 1])
				part[i][j] = part[i][j]
							|| part[i - arr[j - 1]][j - 1];
		}
	}

	return part[sum / 2][n];
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
    if (findPartiion(arr, n) == true)
    ans.innerHTML="<br> <b>Can be divided into two subsets of equal Sum</b>"
	else
    ans.innerHTML="<br><b> Can not be divided into two subsets of equal Sum</b>"

}
function input(){
   
    let select;
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         select=JSON.parse(this.response);
      }
    };
    xhttp.open("GET", "input/partion_problem.txt", false);
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
      t=document.createTextNode("Numbers= "+JSON.stringify(select[i]));
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