window.document.addEventListener("DOMContentLoaded",function(){
function superSeq(X, Y,m,n)
{
    let dp=new Array(m+1);
    console.log(n)
    let i,j;
    for(i=0;i<m+1;i++)
    {
        console.log(m)
        dp[i]=new Array(n+1);
    }
	// Fill table in bottom up manner
	for (i = 0; i <= m; i++) {
		for (j = 0; j <= n; j++) {
			// Below steps follow above recurrence
			if (!i)
				dp[i][j] = j;
			else if (!j)
				dp[i][j] = i;
			else if (X[i - 1] == Y[j - 1])
				dp[i][j] = 1 + dp[i - 1][j - 1];
			else
				dp[i][j]
					= 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
		}
	}

	return dp[m][n];
}
    function main(X,Y){
 let ans=document.getElementById("ans");
    ans.innerHTML="<br>Length of the shortest supersequence for input"+document.getElementById("input").value+" is <b>"+ superSeq(X, Y, X.length, Y.length)+"</br>";


  }
  function input(){
    let select;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         select=JSON.parse(this.response);
      }
    };
    xhttp.open("GET", "input/scs.txt", false);
    xhttp.send();
    let div,x,i,t;
    div=document.createElement("div");
    div.setAttribute("class","tab-content");

    for(i=0;i<10;i++)
    {
      x=document.createElement("div");
      x.style.border="2px solid black";
      x.style.fontWeight="bolder";
      x.style.color="blue"
      x.style.overflow="scroll"
      t=document.createTextNode("Name : Syed Usman Ahsan");
      x.appendChild(t);
      t=document.createElement("br");
      x.appendChild(t);
      t=document.createTextNode("Str1 : "+select[i][0]);
      x.appendChild(t);
      t=document.createElement("br");
      x.appendChild(t);
      t=document.createTextNode("Str2 : "+select[i][1]);
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
       main(select[x-1][0],select[x-1][1]);
     })
      console.log(JSON.stringify(select))
  }

  input();
})