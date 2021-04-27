const knapsack = (val,wt,n,W = 224) => {
    let k = [];

    for(let i=0; i<=n; i++){
        k[i] = [];
    }

    for(let i=0; i<=n; i++){
        for(let w=0; w<=W; w++){
            if(i==0 || w==0)
                k[i][w] = 0;
            
            else if(wt[i-1] <= w)
                k[i][w] = Math.max(val[i-1]+k[i-1][w-wt[i-1]], k[i-1][w]);
            
            else   
                k[i][w] = k[i-1][w];
        }
    }

    return k[n][W];
};

const generateInput = () => {
    let select;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            select = JSON.parse(this.responseText);
          }
    };
    xmlhttp.open("GET","input/json_knapsack.txt",false);
    xmlhttp.send();

    return select;
};

const showOutput = button_id => {
    let x = document.getElementById(button_id).nextElementSibling;

    if(x.style.display === "none")
        x.style.display = "block";
    else
        x.style.display = "none";
};

const displayInput = () => {
    let div, html = ``;

    div = document.querySelectorAll(".algo");
    for(let i=0; i<div.length; i++){
        html = `0/1 Knapsack`;
        div[i].innerHTML = html;
    }

    let inputs = ['.input1','.input2','.input3','.input4','.input5','.input6','.input7','.input8','.input9','.input10'];
    let data_set = generateInput(), res, k = 0;

    inputs.forEach((input,index) => {
        div = document.querySelector(input);

        res = knapsack(data_set.values[k],data_set.weights[k],data_set.values[k].length);
        html = `<h3>Input ${index+1}</h3> <br>
                <p><em>no. of items = ${data_set.weights[index].length}</em></p>
                <p><em>W = 224</em></p>`;

        html += `<div class="table-responsive"> <table class="table table-bordered"> <tbody> <tr> <td> <strong>Weights</strong> </td>`;
            for(let i=0; i<data_set.values[k].length; i++){
                html += `<td>${data_set.weights[k][i]}</td>`;
            }
            html += `</tr> <tr> <td> <strong>Values</strong> </td>`;

            for(let i=0; i<data_set.values[k].length; i++){
                html += `<td>${data_set.values[k][i]}</td>`;
            }
            html += `</tr> </tbody> </table> </div>`;

        html += `<br> <button id="button${index+1}"  onclick = "showOutput(this.id)">Show Output</button>
                 <h4 id="output${index+1}" style="display:none;">Knapsack Value is : ${res}</h4>`;

        div.innerHTML = html;
        ++k;
    });
};

displayInput();
