const rodCut = (price,n) => {
    let T = [];

    for(let i=0; i<=n; i++){
        T[i] = 0;
    }

    for(let i=1; i<=n; i++){
        for(let j=1; j<=i; j++){
            T[i] = Math.max(T[i], price[j-1]+T[i-j]);
        }
    }

    return T[n];
};

const generateInput = () => {
    let select;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            select = JSON.parse(this.responseText);
          }
    };
    xmlhttp.open("GET","input/json_rodCut.txt",false);
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
        html = `Rod Cutting`;
        div[i].innerHTML = html;
    }

    let inputs = ['.input1','.input2','.input3','.input4','.input5','.input6','.input7','.input8','.input9','.input10'];
    let data_set = generateInput(), res, k = 0;

    inputs.forEach((input,index) => {
        div = document.querySelector(input);

        res = rodCut(data_set.prices[k],data_set.prices[k].length);

        html = `<h3>Input ${index+1}</h3> <br>
                <p><em>Rod Length = ${data_set.prices[k].length}</em></p>`;

        html += `<div class="table-responsive"> <table class="table table-bordered"> <tbody> <tr> <td> <strong>Length</strong> </td>`;
            for(let i=0; i<data_set.prices[k].length; i++){
                html += `<td>${i+1}</td>`;
            }
            html += `</tr> <tr> <td> <strong>Price</strong> </td>`;

            for(let i=0; i<data_set.prices[k].length; i++){
                html += `<td>${data_set.prices[k][i]}</td>`;
            }
            html += `</tr> </tbody> </table> </div>`;

        html += `<br> <button id="button${index+1}"  onclick = "showOutput(this.id)">Show Output</button>
                <h4 id="output${index+1}" style="display:none;">Profit is : ${res}</h4>`;

        div.innerHTML = html;
        ++k;
    });
};

displayInput();