document.addEventListener("DOMContentLoaded",function(){
 
  
    function findMinCoins(S, n,  N)
    {
        // T[i] stores minimum number of coins needed to get total of i
        let T=new Array(N+1);
        T[0] = 0;    // 0 coins are needed to get total of i
     
        for (let i = 1; i <= N; i++)
        {
            // initialize minimum number of coins needed to infinity
            T[i] = Number.MAX_VALUE;
            let res = Number.MAX_VALUE;
     
            // do for each coin
            for (let c = 0; c < n; c++)
            {
                // check if index doesn't become negative by including
                // current coin c
                if (i - S[c] >= 0)
                    res = T[i - S[c]];
     
                // if total can be reached by including current coin c,
                // update minimum number of coins needed T[i]
                if (res != Number.MAX_VALUE)
                    T[i] = Math.min(T[i], res + 1);
            }
        }
     
        // T[N] stores the minimum number of coins needed to get total of N
        return T[N];
    }

function main(S){
    // n coins of given denominations
    let n = S.length;
 
    // Total Change required
    let N = 139;
    let ans=document.getElementById("ans");
    let coins = findMinCoins(S, n, N);
 
    if (coins != Number.MAX_VALUE)
    ans.innerHTML="<br> Minimum number of coins required to get desired change from input "+document.getElementById("input").value+" is = <b>"+ coins+"</b>";
}
function input(){
    let select;
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         select=JSON.parse(this.response);
      }
    };
    xhttp.open("GET", "input/coin_change.txt", false);
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
      t=document.createTextNode("Coins = "+JSON.stringify(select[i]));
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