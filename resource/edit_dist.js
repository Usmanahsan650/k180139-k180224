window.document.addEventListener("DOMContentLoaded",function(){


function editDistDP(str1, str2, m, n)
{
    // Create a table to store results of subproblems
    let dp=new Array(m+1);
    for(i=0;i<m+1;i++)
    {
        dp[i]=new Array(n+1);
    }
 
    // Fill d[][] in bottom up manner
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            // If first string is empty, only option is to
            // insert all characters of second string
            if (i == 0)
                dp[i][j] = j; // Min. operations = j
 
            // If second string is empty, only option is to
            // remove all characters of second string
            else if (j == 0)
                dp[i][j] = i; // Min. operations = i
 
            // If last characters are same, ignore last char
            // and recur for remaining string
            else if (str1[i - 1] == str2[j - 1])
                dp[i][j] = dp[i - 1][j - 1];
 
            // If the last character is different, consider
            // all possibilities and find the minimum
            else
                dp[i][j]
                    = 1
                      +     Math.min(dp[i][j - 1], // Insert
                            dp[i - 1][j], // Remove
                            dp[i - 1][j - 1]); // Replace
        }
    }
 
    return dp[m][n];
}
 
    function main(X,Y){
  let ans=document.getElementById("ans");
    ans.innerHTML="<br>Levenshtein Distance = <b>"+ editDistDP(X, Y, X.length, Y.length)+"</b>";


  }
  function input(){
   
    let select;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         select=JSON.parse(this.response);
      }
    };
    xhttp.open("GET", "input/edit_dist.txt", false);
    xhttp.send();
    let div,x,i,t;
    div=document.createElement("div");
    div.setAttribute("class","tab-content");
    for(i=0;i<10;i++)
    {
      x=document.createElement("div");
      x.style.border="2px solid black";
      x.style.fontWeight="bolder";
      x.style.overflow="scroll"
      x.style.color="blue"
      t=document.createTextNode("Name : Syed Usman Ahsan");
      x.appendChild(t);
      t=document.createElement("br");
      x.appendChild(t);
      t=document.createTextNode("str1 : "+select[i][0]);
      x.appendChild(t);
      t=document.createElement("br");
      x.appendChild(t);
      t=document.createTextNode("str2 : "+select[i][1]);
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